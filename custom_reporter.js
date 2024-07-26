// custom_reporter.js

var mocha = require('mocha')
var fs = require('fs')

var events = mocha.Runner.constants;

function custom_reporter(runner, options) {

	var reportFile = "report.txt"

	runner.once(events.EVENT_RUN_BEGIN, () => {
		console.log('test run started')
		fs.writeFileSync(reportFile, 'test run started' + '\n')
	})

	runner.once(events.EVENT_RUN_END, () => {
		var runUrl = getRunUrl(options.reporterOptions.dataFile)
		console.log('Cypress report: ' + runUrl)
		fs.appendFileSync(reportFile, 'Cypress report: ' + runUrl + '\n')

		console.log('test run finished')
		fs.appendFileSync(reportFile, 'test run finished' + '\n')
	})

	runner.on(events.EVENT_TEST_PASS, (test) => {
		console.log('passed: ' + test.fullTitle())
		fs.appendFileSync(reportFile, 'passed:' + test.fullTitle() + '\n')
	})

	runner.on(events.EVENT_TEST_FAIL, (test) => {
		console.log('failed: ' + test.fullTitle())
		fs.appendFileSync('failed: ' + test.fullTitle() + '\n')
	})
}

function getRunUrl(filename) {
	var contents = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r' })
	var data = JSON.parse(contents)
	console.log(data)
	return data.runUrl;
}

module.exports = custom_reporter
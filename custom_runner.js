// custom_runner.js

var cypress = require('cypress')
var fs = require('fs')

var options = { 
	record: true, 
	key: process.env.CYPRESS_RECORD_KEY, 
	config: { video: false },
	reporter: 'custom_reporter.js', 
	reporterOptions: { dataFile: 'runUrl.json'},
	spec: './cypress/e2e/**/*.cy.js'
}

cypress.run(options)
	.then((results)=>{
		console.log('runUrl: ' + results.runUrl)
		
		// save the runUrl to a file so we can read it later
		fs.writeFileSync(
			options.reporterOptions.dataFile, 
			JSON.stringify({runUrl: results.runUrl})
		)
	})
	.catch((err) => {
		console.error(err)
	})
const fs = require('fs')

function save(data) {
	const dataString = JSON.stringify(data)
	return fs.writeFileSync('./content/content.json', dataString)
}

function load() {
	const fileBuffer = fs.readFileSync('./content/content.json', 'utf-8')
	return JSON.parse(fileBuffer)
}

module.exports = {
	save,
	load
}

const fs = require('fs')

function save(nameFile, data) {
	const dataString = JSON.stringify(data)
	return fs.writeFileSync(`./content/${nameFile}.json`, dataString)
}

function load(nameFile) {
	const fileBuffer = fs.readFileSync(`./content/${nameFile}.json`, 'utf-8')
	return JSON.parse(fileBuffer)
}

module.exports = {
	save,
	load
}

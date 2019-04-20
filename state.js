const fs = require('fs')

let contentName = "content"

function defineName(name) {
	contentName = name
}

function save(data) {
	const dataString = JSON.stringify(data)
	return fs.writeFileSync(`./content/${contentName}.json`, dataString)
}

function load() {
	const fileBuffer = fs.readFileSync(`./content/${contentName}.json`, 'utf-8')
	return JSON.parse(fileBuffer)
}

module.exports = {
	defineName,
	save,
	load
}

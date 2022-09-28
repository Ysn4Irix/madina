const parser = require('fast-xml-parser').j2xParser
const he = require('he')

module.exports = (json, name) => {
	let options = {
		attributeNamePrefix: '@',
		textNodeName: '$',
		ignoreAttributes: false,
		tagValueProcessor: a =>
			he.encode(a.toString(), { useNamedReferences: false })
	}
	const jsparser = new parser(options)
	json = name === 'city' ? { city: json } : { district: json }
	let xml = jsparser.parse(json)

	return `<?xml version="1.0" encoding="utf-8"?> ${
		name === 'city'
			? `<cities>${xml}</cities>`
			: `<districts>${xml}</districts>`
	}`
}

'use strict';


const ftp = require("basic-ftp")
const fs = require("fs")
const connParams = {
	host: "localhost",
	user: "serkan",
	password: "1234",
	secure: false
}


module.exports.ftpupload = async (event, context, callback) => {
	const client = new ftp.Client()
	try {
		await client.access(connParams)
		console.log(await client.list())
		await client.upload(fs.createReadStream(".gitignore"), "gitignore")
	} catch (err) {
		console.log(err)
	}
	client.close()
};


module.exports.ftpdownload = async (event, context, callback) => {
	const client = new ftp.Client()
	try {
		await client.access(connParams)
		console.log(await client.list())
		await client.download(fs.createWriteStream("downloaded-README.md"), "README.md")
	} catch (err) {
		console.log(err)
	}
	client.close()
};
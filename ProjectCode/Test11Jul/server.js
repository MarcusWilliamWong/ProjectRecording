const http = require("http");
const fs = require("fs");

http.creatServer((request, response) => {
	if (request.url=="/img/puydesancy.jpg") {
		fs.readfile("./img/")
	}

})
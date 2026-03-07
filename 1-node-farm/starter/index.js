import * as fs from "node:fs";
import * as http from "node:http";
import * as url from "node:url";

//===============//
//----- LOG -----//
//===============//
// const hello = "Bonjour le monde!";
// console.log(hello); // this gets logged to the terminal

//====================================//
//----- READ FILES (synchronous) -----//
//====================================//
// const textInput = fs.readFileSync("./txt/input.txt", {
// 	encoding: "utf-8",
// });
// console.log(textInput);

//=====================================//
//----- WRITE FILES (synchronous) -----//
//=====================================//
// const textOut = `What do we really know about the avocado?\n${textInput}\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file has been written");

//===================================//
//----- READ/WRITE ASYNCHRONOUS -----//
//===================================//
// fs.readFile("./txt/start.txt", { encoding: "utf-8" }, (err, data1) => {
// 	if (err) return console.log(err);

// 	fs.readFile(`./txt/${data1}.txt`, { encoding: "utf-8" }, (err, data2) => {
// 		if (err) return console.log(err);

// 		console.log(data2);
// 		fs.readFile("./txt/append.txt", { encoding: "utf-8" }, (err, data3) => {
// 			if (err) return console.log(err);

// 			console.log(data3);

// 			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, { encoding: "utf-8" }, (err) => {
// 				if (err) return console.log(err);
// 				console.log("file written");
// 			});
// 		});
// 	});
// });
// console.log("this returns first");

//==================//
//----- SERVER -----//
//==================//
const server = http.createServer((req, res) => {
	const path = req.url;

	if (path === "/") res.end("This is the Home page.");
	else if (path === "/about") res.end("This is the About page.");
	else if (path === "/product") res.end("This is the Product page.");
	else {
		// headers must come bfore ending the response
		res.writeHead(404, {
			"content-type": "text/html",
			"custom-header": "Bonjour du serveur!",
		});
		res.end("<h1>Page not found</h1><h2>Bonjour du serveur!</h2>");
	}
});

server.listen(8000, "localhost", () => {
	console.log("Listening to requests on port 8000");
});

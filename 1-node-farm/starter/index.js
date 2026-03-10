import * as fs from "node:fs";
import * as http from "node:http";
import { default as slugify } from "slugify";
import { default as useTemplate } from "./modules/useTemplate.js";

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
const __dirname = import.meta.dirname;
// It's okay that these functions are synchronous (blocking). They're executed only once and then the data is cached.
const templates = {
	overview: fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8"),
	product: fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8"),
	productCard: fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8"),
};
const dataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const data = JSON.parse(dataJSON);
const slugs = data.map((item) =>
	slugify(item.productName, {
		lower: true,
	}),
);
const server = http.createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;
	const prodID = url.searchParams.get("id");

	// home page
	if (pathname === "/") {
		res.end("This is the Home page.");
	}
	// overview page
	else if (pathname === "/overview") {
		const cardsMarkup = data.map((item) => useTemplate(templates.productCard, item)).join("");
		const markup = templates.overview.replaceAll("{{PRODUCT_CARDS}}", cardsMarkup);

		res.writeHead(200, {
			"content-type": "text/html",
		});
		res.end(markup);
	}
	// product page
	else if (pathname === "/product") {
		const prodData = data.find((item) => item.id == prodID);
		const markup = useTemplate(templates.product, prodData);

		res.writeHead(200, {
			"content-type": "text/html",
		});
		res.end(markup);
	}
	// API
	else if (pathname === "/api") {
		res.writeHead(200, {
			"content-type": "application/json",
		});
		res.end(dataJSON);
	}
	// page not found
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

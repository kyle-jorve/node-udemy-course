import { default as EventEmitter } from "node:events";
import * as http from "node:http";

class Sales extends EventEmitter {
	constructor() {
		super();
	}
}

const myEmitter = new Sales();

myEmitter.on("sale", () => console.log("New sale!"));
myEmitter.on("sale", ({ customerName }) => console.log(`Customer Name: ${customerName}`));
myEmitter.on("sale", ({ stockQty, purchaseQty }) =>
	console.log(`There are now ${stockQty - purchaseQty} items left in stock.`),
);
myEmitter.emit("sale", {
	customerName: "Pendrake",
	stockQty: 9,
	purchaseQty: 2,
});

//=====================================//

const server = http.createServer();

server.on("request", (req, res) => {
	console.log("Request received");
	res.end("Request received");
});
server.on("request", (req, res) => {
	console.log("Another request 😄");
});
server.on("close", () => console.log("server closed"));
server.listen(8000, "localhost", () => console.log("Listening to requests..."));

import * as fs from "node:fs";
import * as http from "node:http";

const server = http.createServer();

server.on("request", (req, res) => {
	// Solution 1 (no stream)
	// The problem here is that the file being loaded (test-file.txt) is huge, and we are forcing Node to load the entire thing in memory before it sends that data.
	/*
	fs.readFile("test-file.txt", (err, data) => {
		if (err) return console.log(err);
		res.end(data);
	});
	*/

	// Solution 2 (stream)
	// The problem here is that the data from test-file.txt is received much faster than it can be written. This creates what is called "back pressure."
	/*
	const readable = fs.createReadStream("test-file.txt");

	readable.on("data", (chonk) => res.write(chonk));
	readable.on("end", () => res.end());
	readable.on("error", (err) => {
		console.log(err);
		res.statusCode = 500;
		res.end("File not found");
	});
	*/

	// Solution 3 (piping the output, releasing back pressure)
	const readable = fs.createReadStream("test-file.txt");

	readable.pipe(res); // [readable source].pipe([writeable destination])
});

server.listen(8000, "localhost", () => console.log("Listening to requests..."));

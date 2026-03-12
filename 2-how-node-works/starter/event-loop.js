import * as fs from "node:fs";
import * as crypto from "node:crypto";

const start = Date.now();

// process.env.UV_THREADPOOL_SIZE = 1; // this will cause the number of available threads to shrink to 1, which forces the below password encryptions to take place one after another instead of simultaneously

setTimeout(() => console.log("Timer 1 done"), 0);
setImmediate(() => console.log("Immediate 1 done"));

fs.readFile("test-file.txt", () => {
	// the order in which some of these logs appear is unexpected
	console.log("I/O finished");
	console.log("-------------------");
	setTimeout(() => console.log("Timer 2 done"), 0);
	setTimeout(() => console.log("Timer 3 done"), 3000);
	setImmediate(() => console.log("Immediate 2 done"));
	process.nextTick(() => console.log("process.nextTick"));
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
});

console.log("This is top-level code");

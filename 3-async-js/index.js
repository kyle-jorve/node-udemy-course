const fs = require("node:fs");
const superagent = require("superagent");

//----- callback hell -----//
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
	console.log(`breed: ${data}`);

	superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
		if (err) return console.log(err.message);

		console.log(res.body.message);

		fs.writeFile("dog-img.txt", res.body.message, (err) => console.log("random dog image saved to file"));
	});
});
*/

//----- promises -----//
function readFilePromise(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("The file could not be found 😢");
			resolve(data);
		});
	});
}

function writeFilePromise(fileName, body) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, body, (err) => {
			if (err) reject("The file could not be saved 😢");
			resolve("Success!");
		});
	});
}

// chain promises instead of nesting callback functions endlessly
/*
readFilePromise(`${__dirname}/dog.txt`)
	.then((res) => {
		console.log(`breed: ${res}`);
		return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);
		return writeFilePromise("dog-img.txt", res.body.message);
	})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => console.log(err));
*/

//----- async/await -----//
async function getDocPic() {
	try {
		const data = await readFilePromise(`${__dirname}/dog.txt`);
		console.log(`breed: ${data}`);

		const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		const all = await Promise.all([res1, res2, res3]);
		const images = all.map((item) => item.body.message);

		console.log(images);

		const write = await writeFilePromise("dog-img.txt", images.join("\n"));
		console.log(write);
	} catch (err) {
		console.log(err);
		throw err;
	}
	return "🥴";
}

(async () => {
	try {
		console.log("this is before the function call");
		const pic = await getDocPic();
		console.log(pic);
		console.log("this is after the function call");
	} catch (err) {
		console.log("ERROR! 💥");
	}
})();

/*
console.log("this is before the function call");
getDocPic()
	.then((pic) => {
		console.log(pic);
		console.log("this is after the function call");
	})
	.catch(() => console.log("ERROR! 💥"));
*/

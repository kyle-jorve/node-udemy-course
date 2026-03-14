const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 8000;

app.use(express.json());

// app.get("/", (req, res) => {
// 	res
// 		/*.status(200) status 200 is the default*/
// 		.json({
// 			message: "Bonjour du serveur!",
// 			app: "Natours",
// 		});
// });

// app.post("/", (req, res) => {
// 	res.send(`I'll allow it`);
// });

const toursFile = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFile));

app.get("/api/v1/tours", (req, res) => {
	res.json({
		status: "Success",
		results: tours.length,
		data: {
			tours,
		},
	});
});

app.post("/api/v1/tours", (req, res) => {
	// console.log(req.body);
	// res.send("Bon");

	const newID = tours[tours.length - 1].id + 1;
	const incomingData = {
		...req.body,
	};
	delete incomingData.id;
	const newTour = {
		id: newID,
		...incomingData,
	};

	tours.push(newTour);

	fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
		res.status(201) // 201 = "created"
			.json({
				status: "Success",
				data: {
					tour: newTour,
				},
			});
	});
});

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

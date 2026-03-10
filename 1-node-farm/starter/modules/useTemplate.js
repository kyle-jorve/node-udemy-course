export default function useTemplate(template, data) {
	const placeholders = [
		{
			temp: "IMAGE",
			key: "image",
		},
		{
			temp: "PRODUCT_NAME",
			key: "productName",
		},
		{
			temp: "NOT_ORGANIC",
			key: "organic",
		},
		{
			temp: "QUANTITY",
			key: "quantity",
		},
		{
			temp: "PRICE",
			key: "price",
		},
		{
			temp: "ID",
			key: "id",
		},
		{
			temp: "FROM",
			key: "from",
		},
		{
			temp: "NUTRIENTS",
			key: "nutrients",
		},
		{
			temp: "DESCRIPTION",
			key: "description",
		},
	];
	const output = (() => {
		let returnVal = template;

		placeholders.forEach((ph) => {
			const replace = `{{${ph.temp}}}`;

			if (ph.key === "organic") {
				if (!data[ph.key]) returnVal = returnVal.replaceAll(replace, "not-organic");
				return;
			}
			returnVal = returnVal.replaceAll(replace, data[ph.key]);
		});
		return returnVal;
	})();

	return output;
}

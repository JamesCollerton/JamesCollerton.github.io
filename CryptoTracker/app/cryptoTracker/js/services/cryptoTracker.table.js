function TableService() {

	function getTableData($http, addRow) {

		$http.get("https://api.cryptonator.com/api/ticker/btc-usd").then(function(response) {

			alert("In Service")
			console.log(response)

			var data = response.data.ticker
			var purchasePrice = 1

			var row = {
				"currency" : data.base,
				"value" : data.price,
				"purchasePrice" : 1,
				"gainAbsolute" : data.price - purchasePrice,
				"gainPercentage" : data.price / purchasePrice,
				"twentyFourHourVolatility" : (data.price + data.change) / data.price
			}

			addRow(row)

		});

	}

	return {
		"getTableData": getTableData
	}
}
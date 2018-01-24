function TableService() {

	function getTableData($http) {

		$http.get("https://api.cryptonator.com/api/ticker/btc-usd").then(function(response) {

			alert("In Service")
			console.log(response)

			var data = response.data.ticker

			var row = {
				"currency" : data.base,
				"purchasePrice" : 1,
				"gainAbsolute" : data.price - purchasePrice,
				"gainPercentage" : data.price / purchasePrice,
				"twentyFourHourVolatility" : data.price / change
			}

		});

	}

	return {
		"getTableData": getTableData
	}
}
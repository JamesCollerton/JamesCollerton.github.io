function TableService() {

	function getTableData($http) {

		$http.get("https://api.cryptonator.com/api/ticker/btc-usd").then(function(response) {

			alert("In Service")
			console.log(response)

		});

	}

	return {
		"getTableData": getTableData
	}
}
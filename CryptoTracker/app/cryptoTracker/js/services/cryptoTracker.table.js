function TableService() {

	function getTableData(Sscope, $http) {

		$http.get("https://api.cryptonator.com/api/ticker/btc-usd").then(function(response) {

			alert("In Service")
			console.log(response)

		});

	}

	return {
		"createTable": createTable
	}
}
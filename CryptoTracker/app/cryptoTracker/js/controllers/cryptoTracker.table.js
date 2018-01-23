/*
 * @name TableDetailController
 * @description This holds the controller for the table of values.
 *
 */

/*
	@class Moods
	@description This is a closure containing all of the functions that
	we want to use for the moods.
*/

function Table() {

	function createTable(Sscope, $http) {

		$http.get("https://api.cryptonator.com/api/ticker/btc-usd").then(function(response) {

			alert(response);

		});

		alert("Creating Table")
	}

	return {
		"createTable": createTable
	}
}

function TableDetailController($scope, $http) {

	var table = Table()
	table.createTable($scope, $http);

}
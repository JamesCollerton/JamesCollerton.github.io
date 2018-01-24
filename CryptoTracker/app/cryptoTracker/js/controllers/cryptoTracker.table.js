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

	function createTable($scope, $http) {

		$scope.rows = []

		function addRow(row) {
			$scope.rows.push(row)
			console.log(row)
		}

		var tableService = TableService();
		tableService.getTableData($http, addRow);

	}

	return {
		"createTable": createTable
	}
}

function TableDetailController($scope, $http) {

	var table = Table()
	table.createTable($scope, $http);

}
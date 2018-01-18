/*
	@name cryptoTrackerTable
	@description This holds all of the angular directives around the header
	for the page.
 */

/*
	@ngdoc directive
	@description This is used to initialise the header for the page.
 */
angular.module('cryptoTrackerPanelApp').component('panelDetail', {
  templateUrl: 'CryptoTracker/app/cryptoTracker/html/cryptoTracker.panel.html',
  controller: TableDetailController,
  bindings: {
	 table: '='
  }
});
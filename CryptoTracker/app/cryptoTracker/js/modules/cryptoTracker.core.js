/*
	@name cryptoTrackerCore

	@description This holds all of the initialisation of the modules used in
	the webpage.
 */

 /*
	@ngdoc directive
	@description This is an overarching module for all of the contained modules in
	the app.
 */
angular.module('cryptoTrackerApp', ['cryptoTrackerHeaderApp',
									'cryptoTrackerTableApp',
									'cryptoTrackerPanelApp'])

/*
	@ngdoc directive
	@description This is used to initialise the header for the page.
 */
angular.module('cryptoTrackerHeaderApp', []).controller('HeaderCtrl', function MainCtrl() {
  this.header = {
	name: 'Crypto Tracker',
	description: 'Crypto Decrypted'
  };
});

/*
	@ngdoc directive
	@description This is used to initialise the table for the app.
 */
angular.module('cryptoTrackerPanelApp', []).controller('PanelCtrl', function MainCtrl() {
  this.panel = {
	title: 'Crypto Tracker',
	contents: 'CryptoTracker/app/cryptoTracker/html/cryptoTracker.table.html'
  };
});

/*
	@ngdoc directive
	@description This is used to initialise the table for the app.
 */
angular.module('cryptoTrackerTableApp', []).controller('TableCtrl', function MainCtrl() {

});
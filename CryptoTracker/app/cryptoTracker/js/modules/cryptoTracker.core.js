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
angular.module('cryptoTrackerApp', [])

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
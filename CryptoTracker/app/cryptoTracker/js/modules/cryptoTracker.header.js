/*
	@name intelligentShuffleHeader
	@description This holds all of the angular directives around the header
	for the page.
 */

/*
	@ngdoc directive
	@description This is used to initialise the header for the page.
 */
angular.module('cryptoTrackerHeaderApp').component('headerDetail', {
  templateUrl: 'CryptoTracker/app/cryptoTracker/html/cryptoTracker.header.html',
  controller: HeaderDetailController,
  bindings: {
    header: '='
  }
});
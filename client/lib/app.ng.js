var modulesToLoad = [
	'angular-meteor',
	'ui.router',
	'ngMaterial'
];

angular.module('WhatToDoApp', modulesToLoad);

function onReady() {
	angular.bootstrap(document, ['WhatToDoApp']);
}

if (Meteor.isCordova)
	angular.element(document).on('deviceready', onReady);
else
	angular.element(document).ready(onReady);

angular.module('WhatToDoApp').controller('AppController', function($mdSidenav) {

	this.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

});
var modulesToLoad = [
	'angular-meteor',
	'ui.router',
	'ngMaterial',
	'accounts.ui',
	'ngMessages'
];

angular.module('WhatToDoApp', modulesToLoad);

function onReady() {
	angular.bootstrap(document, ['WhatToDoApp']);
}

if (Meteor.isCordova)
	angular.element(document).on('deviceready', onReady);
else
	angular.element(document).ready(onReady);

'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
  
angular.module('app')
  .filter('escape', function() {
    return window.escape;
  });
  
angular.module('app')
  .filter('encodeUri', function() {
    return $window.encodeURIComponent;
  });
 
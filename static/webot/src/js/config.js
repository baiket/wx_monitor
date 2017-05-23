// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);
  
	
app.factory('HttpInterceptor', ['$q','$rootScope', HttpInterceptor]);
app.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push(HttpInterceptor);
    }
]);

function HttpInterceptor($q,$rootScope) {
    return {
        request: function(config) {
            return config;
        },
        requestError: function(err) {
            console.log('requestError', err);
            return $q.reject(err);
        },
        response: function(resp) {
            if(!!resp.data.auth) {
                if(resp.data.auth.is_active) {
					if(!resp.data.auth.is_staff) {
						window.location = '/src/deny.html';
					}
                    $rootScope.auth = resp.data.auth
//                  console.log( $rootScope.auth)
                } else {
                   console.log(resp.msg, resp.traceback);
                   window.location = '/accounts/login/';
                };

            };
            return resp;
        },
        responseError: function(err) {
            console.log('responseError', err);
            if(-1 === err.status) {
                // 远程服务器无响应
                console.log('responseError', '远程服务器无响应');
            } else if(0 === err.status) {
                console.log('responseError', '无法连接到远程服务器');
            } else {
                console.log('responseError', err.status, err);
            };
            return $q.reject(err);
        }
    };
};
'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/apps/subnet_search');
          }
          
          $stateProvider
              
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.subnet_search', {
                  url: '/subnet_search',
                  templateUrl: 'tpl/apps_subnet_search.html?'+Math.random(),
                  resolve: load( ['smart-table','lokijs','toaster','js/app/subnet/subnet_search.js?'+Math.random(),'moment'] )
              })
              .state('apps.subnet_add', {
                  url: '/subnet_add',
                  templateUrl: 'tpl/apps_subnet_add.html?'+Math.random(),
                  resolve: load( ['smart-table','lokijs','toaster','ngTagsInput','ui.select',
                  				'angular-multi-select','js/app/subnet/subnet_add.js?'+Math.random(),'moment'])
              })
              .state('apps.dimission', {
                  url: '/dimission',
                  templateUrl: 'tpl/apps_dimission.html',
                  resolve: load( ['smart-table','lokijs','toaster','js/app/dimission/dimission.js','moment'] )
              })

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );

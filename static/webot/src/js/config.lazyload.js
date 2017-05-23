// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   '../libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   '../libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   '../libs/jquery/flot/jquery.flot.js',
                          '../libs/jquery/flot/jquery.flot.pie.js', 
                          '../libs/jquery/flot/jquery.flot.resize.js',
                          '../libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          '../libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
                          '../libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
      moment:         [   '../libs/jquery/moment/moment.js'],
      screenfull:     [   '../libs/jquery/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   '../libs/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   '../libs/jquery/html5sortable/jquery.sortable.js'],
      nestable:       [   '../libs/jquery/nestable/jquery.nestable.js',
                          '../libs/jquery/nestable/jquery.nestable.css'],
      filestyle:      [   '../libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   '../libs/jquery/bootstrap-slider/bootstrap-slider.js',
                          '../libs/jquery/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   '../libs/jquery/chosen/chosen.jquery.min.js',
                          '../libs/jquery/chosen/bootstrap-chosen.css'],
      TouchSpin:      [   '../libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          '../libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   '../libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          '../libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   '../libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   '../libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          '../libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
      footable:       [   '../libs/jquery/footable/v3/js/footable.min.js',
                          '../libs/jquery/footable/v3/css/footable.bootstrap.min.css'],
      fullcalendar:   [   '../libs/jquery/moment/moment.js',
                          '../libs/jquery/fullcalendar/dist/fullcalendar.min.js',
                          '../libs/jquery/fullcalendar/dist/fullcalendar.css',
                          '../libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   '../libs/jquery/moment/moment.js',
                          '../libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
                          '../libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput:      [   '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'],
      lokijs:		  [   '../libs/jquery/lokijs/lokijs.min.js']
//   				 '../libs/jquery/lokijs/i18n/es.js',
//				      '../libs/jquery/lokijs/mods/toggle-checked-state-on-label-click.js',
//				      '../libs/jquery/lokijs/mods/toggle-open-state-nodes-checked-state-leafs-on-label-click.js',
//				      '../libs/jquery/lokijs/mods/toggle-open-state-on-label-click.js'
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ui.select',
          files: [
              '../libs/angular/angular-ui-select/dist/select.min.js',
              '../libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              '../libs/angular/angularjs-toaster/toaster.js',
              '../libs/angular/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'xeditable',
          files: [
              '../libs/angular/angular-xeditable/dist/js/xeditable.min.js',
              '../libs/angular/angular-xeditable/dist/css/xeditable.css',
     			
          ]
      },
      {
          name: 'smart-table',
          files: [
              '../libs/angular/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'ngTagsInput',
          files: [
         	  '../libs/angular/angular-xeditable/dist/js/ng-tags-input.min.js',		
              '../libs/angular/angular-xeditable/dist/css/ng-tags-input.min.css',
              '../libs/angular/angular-xeditable/dist/css/ng-tags-input.bootstrap.min.css'
          ]
      },
      {
          name: 'checklist-model',
          files: [
        		'../libs/angular/angular-xeditable/dist/js/checklist-model.js',
          ]
      },
      {
          name: 'angular-multi-select',
          files: [
        		
        		'../libs/angular/angular-multi-select/angular-multi-select.min.css',
        		'../libs/angular/angular-multi-select/angular-multi-select.min.js',
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;

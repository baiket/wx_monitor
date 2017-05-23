app.controller('subnet_add_ctrl', ['$scope', '$filter','$modal', '$http','toaster',
	function($scope, $filter,$modal, $http,toaster){
	$scope.get_subnet_custom=function(){
		$http.post('../api/get_subnet_custom/').then(function (resp) {
			$scope.rowCollection=resp.data.data.subnets_custom
	    	$scope.subnets_custom = [].concat($scope.rowCollection);
		});
	}
	$http.post('../api/get_location/').then(function (resp) {
		$scope.location_list=resp.data.data.location_list
	});
	$http.post('../api/get_isp/').then(function (resp) {
			$scope.isp_list=resp.data.data.isp_list
	});
	
	$scope.get_subnet_custom()
	$scope.pages=[10,20,50]
	
	$scope.addCustomSubnet = function(size){
	    var modalInstance = $modal.open({
	        templateUrl: 'tpl/modal.subnet.html',
	        controller: 'SubnetModalServiceCtrl',
	        size: size,
	        resolve: {
	        	location_list:function() {
                    return $scope.location_list;
               	},
               	isp_list:function() {
                    return $scope.isp_list;
               	},
	        }
      });
      
   modalInstance.result.then(function (result) {
   	    
      	$http.post('../api/subent_add_preview/',{result:result}).then(function (resp) {
      		console.log(resp.data.status)
      		if(resp.data.status == 'error') {
      			toaster.pop('error', '错误', resp.data.message);
      			return
      		}
  		      var modalInstance = $modal.open({
	            templateUrl: 'tpl/modal.preview.html',// + new Date().getTime()
	            controller: 'PreviewModalInstanceCtrl',
	            resolve: {
	                data: function() {
	                    return resp.data.data;
	                }
	            }
	        });
	        modalInstance.result.then(function() {
	            $scope.get_subnet_custom()
	        }, function() {
	        });
      	//$scope.get_subnet_custom() 
       // $scope.selected = selectedItem;
      }, function () {
       // $log.info('Modal dismissed at: ' + new Date());
      });
	});
}
	  
   
    //删除单条记录
    $scope.removeItem = function(rid) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/modal.delete.html',// + new Date().getTime()
            controller: 'DelModalInstanceCtrl',
            resolve: {
                rid: function() {
                    return rid;
                }
            }
        });
        modalInstance.result.then(function(datas) {
            $scope.get_subnet_custom()
        }, function() {
//          console.log('dismissed at: ' + new Date());
        });
    }

}]);

app.controller('SubnetModalServiceCtrl', ['$scope', '$http','$modalInstance','toaster','location_list','isp_list',
  function($scope, $http,$modalInstance,toaster,location_list,isp_list) {
	var result = $scope.result = {};//必须两层的申明才能打印出来；不知道why
	$scope.result.location_list=location_list
	$scope.result.isp_list=isp_list
	 // 更换国家的时候清空大区
	$scope.$watch('result.country', function(country) {
	    result.area = null;
	});
  	$scope.$watch('result.area', function(area) {
	    result.region = null;
	});
	$scope.$watch('result.region', function(region) {
	    result.city = null;
	});
	$scope.$watch('result.city', function(city) {
	    result.county = null;
	});
    $scope.ok = function () {
    	//console.log($scope.result)
    	var res = {};
    	res["subnet"]=$scope.result.subnet;
    	res["country"]=$scope.result.country.label;
    	res["area"]=$scope.result.area.label;
    	res["region"]=$scope.result.region.label;
    	if ($scope.result.city)
    		res["city"]=$scope.result.city.label
    	else
    		res["city"]="";
    	if ($scope.result.county)
    		res["county"]=$scope.result.county.label
    	else
    		res["county"]="";
    	res["isp"]=$scope.result.isp.name;
    	$modalInstance.close(res);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
      
    };
  }
  ]);
  
 app.controller('PreviewModalInstanceCtrl', ['$scope', 'toaster', '$modalInstance', '$http', 'data',
    function($scope, toaster, $modalInstance, $http, data) {
    	console.log(data)
    	$scope.subnets_preview=data.subnets_preview
    	$scope.subnets_result=data.subnets_result
        $scope.ok = function() {
              $http.post('../api/subent_add/',{data:data.subnet_data})
                .success(function(response) {
                    if(response.data.status == 'success') {
                    	toaster.pop('success', '提示', response.data.message);
                        $modalInstance.close();
                    } else {
                        toaster.pop('error', '错误', response.data.message);
                    }
                })
                .error(function(e) {
                    //console.log(response.msg, response.traceback);
                    //tip.pop();
                });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

app.controller('DelModalInstanceCtrl', ['$scope', 'toaster', '$modalInstance', '$http', 'rid',
    function($scope, toaster, $modalInstance, $http, rid) {
        $scope.ok = function() {
              $http.post('../api/subent_del/',{rid:rid})
                .success(function(response) {
                    if(response.data.status == 'success') {
                        toaster.pop('success', '提示', response.data.message);
                        $modalInstance.close();
                    } else {
                        toaster.pop('error', '错误', response.data.message);
                    }
                })
                .error(function(e) {
                    //console.log(response.msg, response.traceback);
                    //tip.pop();
                });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);
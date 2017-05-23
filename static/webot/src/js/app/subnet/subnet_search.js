app.controller('subnet_search_ctrl', ['$scope', '$filter','$modal', '$http','toaster',
	function($scope, $filter,$modal, $http,toaster){
		$scope.issearch = true
		$scope.get_subnet_search=function(subnet){
			$http.post('../api/subnet_search/',{subnet:subnet}).then(function (resp) {
				results = resp.data.datas
				if(results.status=="success"){
					$scope.subnets_taobao=results.data.subnets_taobao
					$scope.subnets_custom=results.data.subnets_custom
				}else{
					toaster.pop('error', '错误', results.msg);
					$scope.subnets_taobao=[]
					$scope.subnets_custom=[]
				}
			});
		}
		$scope.subnet_search=function(subnet){
			$scope.issearch = false
			$scope.get_subnet_search(subnet)
    	};
}]);



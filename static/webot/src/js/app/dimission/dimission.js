app.controller('dimissionCtrl', ['$scope', '$filter','$modal', '$http',
	function($scope, $filter,$modal, $http){
	$scope.rowCollection=[]
	$http.get($scope.baseUrl+'office_user_dimission/').then(function (resp) {
	  	$scope.users =$filter('orderBy')(resp.data.datas, 'username') 
	  	if($scope.users.length==0){
		  		return
		 }
	  	angular.forEach($scope.users, function(user) {
	      user.selected=false
	    });
	    $scope.users[0].selected=true
	    $scope.user = $scope.users[0]
	    $http.get($scope.baseUrl+'user/?oid='+$scope.users[0].id).then(function (resp) {
		    $scope.rowCollection =  resp.data.datas
		    angular.forEach($scope.rowCollection, function(row) {
			      row.check=false;
			});
		    $scope.permissions = [].concat($scope.rowCollection); //克隆，为了显示和过滤排序，rowCollection是显示，Permission是实际操作
		});
	});
	  
	$scope.selectUser = function(user){//先取false再对特定的选中
		$scope.user = user
		$http.get($scope.baseUrl+'user/?oid='+user.id).then(function (resp) {
		    $scope.rowCollection =  resp.data.datas
		    angular.forEach($scope.rowCollection, function(row) {
			      row.check=false;
			});
		});
		angular.forEach($scope.users, function(user) {
	    	user.selected=false
	    });
	    user.selected=true
	}
//	$scope.itemsByPage=10;//设置单页显示的列表数
	$scope.pages=[10,20,50,100]
	$scope.$watch("permissions", function() {//监控数据变化
        count=0
      	angular.forEach($scope.permissions, function(row) {
	       if(row.check){//不能为NAN
           		count++;
        	}
	    });
        $scope.checkAll=(count==$scope.permissions.length);
	    if($scope.checkAll&&count==0){//默认为false（每值的情况下）
	    	$scope.checkAll=false
	    }
    }, true);
    
	$scope.selectAll=function(){
		angular.forEach($scope.permissions, function(row) {
	      row.check=$scope.checkAll;
	    });
    }
	//---------------------添加时的弹窗--------------
	$scope.sp_items = new Array()
    $scope.pp_items = new Array()
 	$http.get($scope.baseUrl+'servicePool/').then(function (resp) {
	  	var resp_data =$filter('orderBy')(resp.data.datas, 'name') 
	  	var temp = new Array()
	  	angular.forEach(resp_data, function(item) {//预处理
	     	strs=item.code.split('-')
	     	if(strs.length!=2){
	     		resp_data.removeObj(item)
	     	}else{
	     		if(!temp.hasOwnProperty(strs[0])){
	     			temp[strs[0]]={text:strs[0],children:[]}
	     		}
	     		temp[strs[0]]['children'].push(item)
	     	}
	    });
	   for(var item in temp){
	   	   $scope.sp_items.push(temp[item])
	   }
    });
    $http.get($scope.baseUrl+'permission/').then(function (resp) {
	  	var temp = new Array()
	  	angular.forEach(resp.data.datas, function(item) {//预处理
	     	pf_id=item.platform.id
	     	if(!temp.hasOwnProperty(pf_id)){
	     		temp[pf_id]={text:item.platform.name,children:[]}
	     	}
	     	//delete(item['platform'])//不要platform数据，重构json
	     	temp[pf_id]['children'].push(item)
	    });
	   for(var item in temp){
	   	   $scope.pp_items.push(temp[item])
	   }
    });
    
     //删除单条记录
    $scope.removeItem = function(id) {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/modal.delete.html',// + new Date().getTime()
            controller: 'DelModalDimissionCtrl',
            resolve: {
                upId: function() {
                    return [id];
                }
            }
        });
        modalInstance.result.then(function(datas) {
            $scope.selectUser($scope.user)
        }, function() {
//          console.log('dismissed at: ' + new Date());
        });
    }
    
    $scope.deleteSelect = function() {
    	var up_ids=new Array()
    	angular.forEach($scope.rowCollection, function(row) {
	      if(row.check){
	      	up_ids.push(row.id)
	      }
	    });
        var modalInstance = $modal.open({
            templateUrl: 'tpl/modal.delete.html',// + new Date().getTime()
            controller: 'DelModalDimissionCtrl',
            resolve: {
                upId: function() {
                    return up_ids;
                }
            }
        });
        modalInstance.result.then(function(datas) {
            $scope.selectUser($scope.user)
        }, function() {
//          console.log('dismissed at: ' + new Date());
        });
    }
}]);

app.controller('DelModalDimissionCtrl', ['$scope', 'toaster', '$modalInstance', '$http', 'upId',
    function($scope, toaster, $modalInstance, $http, upId) {
        $scope.ok = function() {
              $http.post('/user_del/',{upId:upId})
                .success(function(response) {
                    if(response.datas.status == 'success') {
                        toaster.pop('success', '提示', response.datas.message);
                        $modalInstance.close();
                    } else {
                        toaster.pop('error', '错误', response.datas.message);
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
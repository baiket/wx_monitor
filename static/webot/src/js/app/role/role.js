app.controller('RoleCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',
	function($scope, $filter, $http, editableOptions, editableThemes){
	$scope.perm_ids=[]
	$http.get($scope.baseUrl+'permission/').then(function (resp) {
	    $scope.permissions = resp.data;
  	});
	$http.get($scope.baseUrl+'role/').then(function (resp) {
	    $scope.roles = $filter('orderBy')(resp.data, 'name');
		angular.forEach($scope.roles, function(role) {
		    perm_ids=[]
	      	angular.forEach(role.permission, function(perm) {
		      	perm_ids.push(perm.id);
	      	});
	      	role.permissions=perm_ids
	    });
	    // set default permission
	    $scope.role = $scope.roles[0];
	    $scope.roles[0].selected = true;
  	});

 $scope.createRole = function(){
    var role = {
      content: 'New role',
      date: Date.now()
    };
    $scope.roles.push(role);
    $scope.selectRole(role);
  }

  $scope.deleteRole = function(role){
    $scope.roles.splice($scope.roles.indexOf(role), 1);
    if(role.selected){
      $scope.role = $scope.roles[0];
      $scope.roles.length && ($scope.roles[0].selected = true);
    }
  }

  $scope.selectRole = function(role){
    angular.forEach($scope.roles, function(role) {
      role.selected = false;
    });
    $scope.role = role;
    $scope.role.selected = true;
  }

	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';

	$scope.showPermissions = function(permissions) {
		 if(!permissions){
		 	return
		 }
	    //console.log(perm_ids)
	    //$scope.perm_ids=perm_ids
		 var selected = [];
		 angular.forEach($scope.permissions, function(permission) {
		 if (permissions.indexOf(permission.id) >= 0) {
	      	selected.push(permission.name);
	    }
	    });
	 	return selected.length ? selected.join(', ') : 'Not set';
	};
	$scope.saveRole = function(data) {
		console.log(data)
	  //$scope.user not updated yet
	//    angular.extend(data, {id: id});
	  // return $http.post('api/saveUser', data);
	};
	
}]);
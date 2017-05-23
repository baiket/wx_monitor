app.controller('userPermCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',
	function($scope, $filter, $http, editableOptions, editableThemes){
	$http.get($scope.baseUrl+'role/').then(function (resp) {
	    $scope.roles = resp.data;
  	});
  	$http.get($scope.baseUrl+'user_simple/').then(function (resp) {
	    $scope.users = resp.data;
	    $scope.all_users=[]
	    angular.forEach($scope.users, function(user) {
	      $scope.all_users.push(user.name)
	    });
  	});
  //  $http.get('js/app/permission/permissions.json').then(function (resp) {
	$http.get($scope.baseUrl+'permission/').then(function (resp) {
	    $scope.permissions =  $filter('orderBy')(resp.data, 'name');
	    // set default permission
	    $scope.permission = $scope.permissions[0];
	    $scope.permissions[0].selected = true;
  	});

	  $scope.createPermission = function(){
	    var permission = {
	      content: 'New permission',
	      date: Date.now()
	    };
	    $scope.permissions.push(permission);
	    $scope.selectPermission(permission);
	  }
	
	  $scope.deletePermission = function(permission){
	    $scope.permissions.splice($scope.permissions.indexOf(permission), 1);
	    if(permission.selected){
	      $scope.permission = $scope.permissions[0];
	      $scope.permissions.length && ($scope.permissions[0].selected = true);
	    }
	  }
	
	  $scope.selectPermission = function(permission){
	    angular.forEach($scope.permissions, function(permission) {
	      permission.selected = false;
	    });
	    $scope.permission = permission;
	    $scope.permission.selected = true;
	  }

	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';

	$scope.showRoles = function(roles) {
		 if(!roles){
		 	return
		 }
		 var selected = [];
		 angular.forEach($scope.roles, function(role) {
		 if (roles.indexOf(role.id) >= 0) {
	      	selected.push(role.name);
	    }
	    });
	 	return selected.length ? selected.join(', ') : 'Not set';
	};
	$scope.showUsers = function(users) {
		if(!users){
		 	return
		 }
	  var selected = [];
	  angular.forEach($scope.users, function(user) { 
	  if(users.indexOf(user.name) >= 0) {
	    selected.push(user.name);
	  }
	});
//	$scope.permission.usernames=selected
	 return selected.length ? selected.join(', ') : 'Not set';
	};
	
	$scope.savePermission = function(data) {
		console.log(data)
	  //$scope.user not updated yet
	//    angular.extend(data, {id: id});
	  // return $http.post('api/saveUser', data);
	};
	
  $scope.loadTags = function($query) {
//  return $http.get('/tags?query=' + query);
	return  $filter("filter")($scope.all_users,$query)//能列出非显示用户的列表
    //return ['antai','bushu','tianya','fenghua','sranya','trehua','weanya','scghua','olnya''dlhua','banya','teghua']
  };
  
}]);



appModule.controller("loginSignupController", function ($scope, brandService, adminService, outletService) {

    //default user role in login 
    $scope.login = {
        userRole:"Outlet"
    }

    // login handler 
    $scope.loginHandler = function (email, password, userRole = "Outlet") {
        if (userRole === "Outlet") {
            outletService
                .login(email, password)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        else if (userRole === "Brand") {
            brandService
                .login(email, password)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        else {
            adminService
                .login(email, password)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    // signup handler 

    $scope.signupHandler = function (name,email,password,userRole = "Outlet") {
        if(userRole === "Outlet"){
            outletService
            .signup(name,email,password)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
        else if(userRole === "Brand"){
            brandService
            .signup(name,email,password)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
        else{
            adminService
            .signup(name,email,password,"admin")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    // active path handlers
    $scope.activePath = 'login';

    $scope.onActivePath = function (path) {
        return $scope.activePath === path;
    }

    $scope.setActivePath = function (path) {
        $scope.activePath = path;
    }
    // get active css class 
    $scope.getActiveCssClass = function (path) {
        var cssClass = $scope.onActivePath(path)?"fw-bold h3 text-decoration-underline text-white":"text-secondary";
        return cssClass;
    }
})
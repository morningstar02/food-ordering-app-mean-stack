


appModule.controller("brandsController", function ($scope, brandData, brandService, NgTableParams, allOutlets, utility, outletService, allCustomers, permission) {
    $scope.brandData = brandData;

    $scope.allCustomers = allCustomers;

    $scope.allOutlets = new NgTableParams({}, {
        dataset: allOutlets
    })

    $scope.allOutlets = allOutlets;

    $scope.allowEdit = function () {
        $scope.isEditClicked = true;
    }

    $scope.disableEdit = function () {
        $scope.isEditClicked = false;
    }

    $scope.updatePassword = function (currentPassword, newPassword) {
        if (currentPassword === newPassword) {
            return alert("new password and current password must be different");
        }
        brandService
            .updatePassword(currentPassword, newPassword)
            .then(function (data) {
                alert(data.message);
                $scope.isEditClicked = false;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // editing outlets 
    $scope.makeEditable = function (index) {
        $scope.editElementIndex = index;
    }

    $scope.disableEditing = function () {
        $scope.editElementIndex = -1;
    }

    $scope.updateOutlet = function (outlet) {
        return brandService
            .editOutlet(outlet)
            .then(function (data) {
                $scope.editElementIndex = -1;
                return data.message;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // permissions 
    $scope.getPermissions = function (role) {
        return utility.getPermissions(role);
    }

    $scope.updatePermissions = function (outletId, permissions) {
        var updatePermissionDebounce = utility.debounce(2000, function () {
            outletService
                .editPermissions({
                    outletId: outletId,
                    permissions: permissions
                })
        })
        updatePermissionDebounce();
    }

    $scope.sendInstruction = function (title, content) {
        brandService
            .sendInstructionsToOutlets(title, content)
    }

    $scope.isAuthorized = function (requiredPermissionId, allowedRoles) {
        var userData = brandData;
        if (!userData) {
            return false;
        }
        var userPermissions = userData.permissions;
        var role = localStorage.getItem("role");
        return permission.isAuthorized(userPermissions, requiredPermissionId, allowedRoles, role);
    }
})
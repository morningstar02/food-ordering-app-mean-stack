

appModule
    .factory("orderService", function ($http, brandService, outletService) {
        return {
            placeOrder: function (customer, outletData, brandData) {
                console.log(outletData, brandData);
                return $http.post("http://localhost:8080/orders/placeOrder", {
                    customer: customer,
                    brand: {
                        id: brandData.id,
                        name: brandData.name
                    },
                    outlet: {
                        id: outletData._id,
                        name: outletData.name
                    }
                })
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getAllOrders: function (status) {
                var brand;
                var brandData = brandService.getServiceData().brandData;
                var outletData = outletService.getServiceData().outletData;
                if (brandData) {
                    brand = {
                        id: brandData.id,
                        name: brandData.name
                    };
                }
                if (outletData) {
                    brand = outletData.brand;
                }
                var queryParam = {
                    page: 1,
                    limit: 9
                };
                if (status) {
                    queryParam["status"] = status;
                }
                if (brand) {
                    queryParam["brandId"] = brand.id;
                    queryParam["brandName"] = brand.name;
                }
                return $http
                    .get("http://localhost:8080/orders/getAllOrders", {
                        params: queryParam
                    })
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            changeStatus: function (status,orderId) {
                return $http.put("http://localhost:8080/orders/changeStatus",{
                    status:status,
                    orderId:orderId
                })
                .then(function (res) {
                    return res.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        }
    })
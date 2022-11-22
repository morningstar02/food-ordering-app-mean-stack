var express = require("express");

var router = express.Router();

var passport = require("passport");

var ordersController = require("../controllers/orders.controller");

router.get("/getAllOrders", passport.authenticate("jwt", { session: false }), ordersController.getAllOrders);

router.post("/placeOrder",passport.authenticate("jwt",{session:false}),ordersController.placeOrder);

router.put("/changeStatus",passport.authenticate("jwt",{session:false}),ordersController.changeStatus);

router.put("/edit",passport.authenticate("jwt",{session:false}),ordersController.editOrder);

module.exports = router;
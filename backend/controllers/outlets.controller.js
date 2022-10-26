var outlets = require("../models/outlets.model");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var throwError = require("../utils/errors");

require("dotenv").config("./.env");

exports.registerOutlet = function (req, res, next) {
    try {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        if (req.role !== "superadmin" && req.role !== "admin") {
            throwError("Access Denied!",401);
        }
        outlets.findOne({
            email: email
        })
            .then(function (outletData) {
                if (outletData) {
                    throwError("outlet email already exist",403);
                }
                return bcrypt.genSalt(12);
            })
            .then(function (salt) {
                return bcrypt.hash(password, salt);
            })
            .then(function (hashedPassword) {
                var newOutlet = new outlets({
                    name: name,
                    email: email,
                    password: hashedPassword
                });
                return newOutlet.save();
            })
            .then(function (outletData) {
                return res.status(201).json({
                    message: "outlet registered successfully",
                    outletData: outletData
                })
            })
            .catch(function (error) {
                var statusCode = error.cause ? error.cause.statusCode : 500;
                return res.status(statusCode).json({
                    message: error.message
                })
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.loginOutlet = function (req, res, next) {
    try {
        var email = req.body.email;
        var password = req.body.password;

        outlets.findOne({
            email: email
        })
            .then(function (outletData) {
                if (!outletData) {
                    throwError("outlet doesn't exist",404);
                }
                return outletData;
            })
            .then(function (outletData) {
                return bcrypt.compare(password, outletData.password);
            })
            .then(function (result) {
                if (!result) {
                    throwError("unauthorised!",401);
                }
                return jwt.sign({
                    email: email
                }, process.env.AUTH_SECRET, {
                    expiresIn: "15h"
                })
            })
            .then(function (jwtToken) {
                return res.status(200).json({
                    message: "outlet logged in successfully",
                    token: jwtToken
                });
            })
            .catch(function (error) {
                var statusCode = error.cause ? error.cause.statusCode : 500;
                return res.status(statusCode).json({
                    message: error.message
                })
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
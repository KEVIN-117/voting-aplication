"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvs = void 0;
var dotenv_1 = require("dotenv");
var loadEnvs = function () {
    dotenv_1.default.config();
};
exports.loadEnvs = loadEnvs;

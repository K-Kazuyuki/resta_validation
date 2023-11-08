"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const testcase_1 = require("./testcase");
console.log("start script");
let count = 0;
// testcaseを回す
testcase_1.TESTCASE.forEach((tc) => {
    if ((0, validation_1.validateRequestJson)(JSON.stringify(tc)).isValid !== tc.expected) {
        console.error("testcase" + count + "failed: validateRequestJson");
        console.error((0, validation_1.validateRequestJson)(JSON.stringify(tc)).message);
    }
    else {
        console.log("testcase" + count + "passed");
    }
    count++;
});

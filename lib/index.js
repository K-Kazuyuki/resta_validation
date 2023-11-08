"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const validation_1 = require("./validation");
const testcase_1 = require("./testcase");
console.log("start script");
const Ajv = require("ajv");
const postFormatSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        title: { type: "string" },
        images: { type: "array" },
        description: { type: "string" },
        tags: { type: "array" },
        formatBlocks: { type: "array" },
    },
    required: [
        "userId",
        "title",
        "images",
        "description",
        "tags",
        "formatBlocks",
    ],
};
const formatBlocksSchema = {
    type: "object",
    properties: {
        type: { type: "string" },
        content: { type: "array" },
    },
    required: ["type", "content"],
};
const request = {
    body: {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: ["block1", "block2"],
    },
};
const ajv = new Ajv();
// format_validation.jsonを読み込む
const fs = require("fs");
const json = fs.readFileSync("./format_validation.json", "utf8");
const formatValidationFormat = {
    type: "object",
    properties: {
        accept_func: { type: "array" },
    },
    required: ["accept_func"],
};
const formatValidation = JSON.parse(json);
if (!ajv.validate(formatValidationFormat, formatValidation)) {
    console.error("format_validation.json is invalid");
    process.exit(1);
}
const funcRegex = /^.*\(.*\)$/;
let count = 0;
// testcaseを回す
testcase_1.TESTCASE.forEach((tc) => {
    if ((0, validation_1.validateRequestJson)(JSON.stringify(tc)).isValid !== tc.expected) {
        console.error("testcase" + count + "failed: validateRequestJson");
        console.error((0, validation_1.validateRequestJson)(JSON.stringify(tc)).message);
        (0, node_process_1.exit)(0);
    }
    else {
        console.log("testcase" + count + "passed");
    }
    count++;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TESTCASE = exports.validatorTest = void 0;
const validator_1 = require("./validator");
const validatorTest = () => {
    console.log("start validatorTest");
    let count = 0;
    exports.TESTCASE.forEach((tc) => {
        if ((0, validator_1.validateRequestJson)(JSON.stringify(tc)).isValid !== tc.expected) {
            console.error("testcase" + count + "failed: validateRequestJson");
            console.error((0, validator_1.validateRequestJson)(JSON.stringify(tc)).message);
        }
        else {
            console.log("testcase" + count + "passed");
        }
        count++;
    });
    console.log("end validatorTest");
};
exports.validatorTest = validatorTest;
exports.TESTCASE = [
    {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: [
            {
                url: "https://example.com",
                formats: [
                    {
                        cssSelector: "h1",
                        changes: [
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                        ],
                    },
                ],
            },
        ],
        expected: true,
    },
    {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: [
            {
                url: "https://example.com",
                formats: [
                    {
                        cssSelector: "h1",
                        changes: [
                            {
                                cssKey: "color",
                                cssValue: "scale (1,2)",
                            },
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                        ],
                    },
                ],
            },
        ],
        expected: true,
    },
    {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: [
            {
                url: "https://example.com",
                formats: [
                    {
                        cssSelector: "h1",
                        changes: [
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                            {
                                cssKey: "color",
                                cssValue: "scale(1.2,scaleX(0.1))",
                            },
                        ],
                    },
                ],
            },
        ],
        expected: true,
    },
    {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: [
            {
                url: "https://example.com",
                formats: [
                    {
                        cssSelector: "h1",
                        changes: [
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                            {
                                cssKey: "color",
                                cssValue: "scale(1.2) + hoge()",
                            },
                        ],
                    },
                ],
            },
        ],
        expected: false,
    },
    {
        userId: "123",
        title: "title",
        images: ["image1", "image2"],
        description: "description",
        tags: ["tag1", "tag2"],
        formatBlocks: [
            {
                url: "https://example.com",
                formats: [
                    {
                        cssSelector: "h1",
                        changes: [
                            {
                                cssKey: "color",
                                cssValue: "red",
                            },
                            {
                                cssKey: "color",
                                cssValue: "scale(1.2, hoge())",
                            },
                        ],
                    },
                ],
            },
        ],
        expected: false,
    },
];

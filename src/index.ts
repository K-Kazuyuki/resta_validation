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

const jsonParsed = JSON.parse(JSON.stringify(request.body));
const ajv = new Ajv();

const valid = ajv.validate(postFormatSchema, jsonParsed);

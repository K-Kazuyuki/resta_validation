import { accept_funcs } from "./accept_funcs";

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
const Ajv = require("ajv");
const ajv = new Ajv();

export const validateRequestJson = (requestJson: string): ValidationResult => {
  const parsedJson = JSON.parse(requestJson);
  const valid = ajv.validate(postFormatSchema, parsedJson);
  if (!valid) {
    return {
      isValid: false,
      message: ajv.errors || "unknown error(validateRequestJson)",
    };
  }
  return validateFormatBlocks(parsedJson.formatBlocks);
};

const validateFormatBlocks = (formatBlocks: any): ValidationResult => {
  // formatBlocksが配列であるかどうかをチェックする
  if (!checkIsArray(formatBlocks).isValid) {
    return {
      isValid: false,
      message: `formatBlocks is not array`,
    };
  }
  // formatsが配列であるかどうかをチェックする
  for (const formatBlock of formatBlocks) {
    if (!checkIsArray(formatBlock.formats).isValid) {
      return {
        isValid: false,
        message: `formatBlocks is not array`,
      };
    }
    // changesが配列であるかどうかをチェックする
    for (const format of formatBlock.formats) {
      if (!checkIsArray(format.changes).isValid) {
        return checkIsArray(format.changes);
      }
      for (const change of format.changes) {
        // 文字列中の関数名をすべて取得して配列にする
        for (const func of change.cssValue.match(/.\(.*\)/g) || []) {
          // 関数名を取得する
          const funcName = func.split("(")[0];
          // 関数名が受け入れられているかどうかをチェックする
          if (accept_funcs.includes(funcName)) {
            continue;
          } else {
            return {
              isValid: false,
              message: `css function name ${funcName} is not accepted`,
            };
          }
        }
      }
    }
  }
  return { isValid: true, message: "" };
};

const checkIsArray = (checkProp: any): ValidationResult => {
  if (!Array.isArray(checkProp)) {
    return {
      isValid: false,
      message: "formatBlocks is not array",
    };
  }
  return { isValid: true, message: "" };
};

export type ValidationResult = {
  isValid: boolean;
  message: string;
};

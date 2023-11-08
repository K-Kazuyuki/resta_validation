"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormatBlocks = void 0;
const accept_funcs_1 = require("./accept_funcs");
const validateFormatBlocks = (formatBlocks) => {
    // formatBlocksが配列であるかどうかをチェックする
    if (!checkIsArray(formatBlocks).isValid) {
        return checkIsArray(formatBlocks);
    }
    // formatsが配列であるかどうかをチェックする
    for (const formatBlock of formatBlocks) {
        if (!checkIsArray(formatBlock.formats).isValid) {
            return checkIsArray(formatBlock.formats);
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
                    if (accept_funcs_1.accept_funcs.includes(funcName)) {
                        continue;
                    }
                    else {
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
exports.validateFormatBlocks = validateFormatBlocks;
const checkIsArray = (checkProp) => {
    if (!Array.isArray(checkProp)) {
        return {
            isValid: false,
            message: "formatBlocks is not array",
        };
    }
    return { isValid: true, message: "" };
};

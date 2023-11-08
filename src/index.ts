import { validateRequestJson } from "./validation";
import { TESTCASE } from "./testcase";

console.log("start script");

let count = 0;
// testcaseを回す
TESTCASE.forEach((tc) => {
  if (validateRequestJson(JSON.stringify(tc)).isValid !== tc.expected) {
    console.error("testcase" + count + "failed: validateRequestJson");
    console.error(validateRequestJson(JSON.stringify(tc)).message);
  } else {
    console.log("testcase" + count + "passed");
  }
  count++;
});

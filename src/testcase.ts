import { validateRequestJson } from "./validator";
export const validatorTest = () => {
  console.log("start validatorTest");
  let count = 0;
  TESTCASE.forEach((tc) => {
    if (validateRequestJson(JSON.stringify(tc)).isValid !== tc.expected) {
      console.error("testcase" + count + "failed: validateRequestJson");
      console.error(validateRequestJson(JSON.stringify(tc)).message);
    } else {
      console.log("testcase" + count + "passed");
    }
    count++;
  });
  console.log("end validatorTest");
};

export const TESTCASE = [
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

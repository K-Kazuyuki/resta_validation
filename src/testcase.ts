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
];

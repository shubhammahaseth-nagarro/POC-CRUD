export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["babel-jest", { configFile: "./babel.config.js" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"], // <-- remove ".js" here
  transformIgnorePatterns: ["/node_modules/(?!(@tanstack/react-query)/)"],
  setupFilesAfterEnv: ["./setupTests.js"],
};

module.exports = {
    parser: "@typescript-eslint/parser", // Parser cho TypeScript
    extends: [
      "eslint:recommended", // Quy tắc mặc định của ESLint
      "plugin:@typescript-eslint/recommended", // Quy tắc khuyến nghị cho TypeScript
    ],
    parserOptions: {
      ecmaVersion: 2020, // Hỗ trợ ES2020
      sourceType: "module", // Sử dụng module
    },
    rules: {
      "no-var": "off", // Vô hiệu hóa quy tắc no-var nếu bạn thực sự cần
    },
  };
  
export const authSchemas = {
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "admin@test.com"
      },
      password: {
        type: "string",
        format: "password",
        example: "123456"
      }
    }
  },
  LoginResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true
      },
      message: {
        type: "string",
        example: "Login successful"
      },
      data: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        }
      }
    }
  }
};

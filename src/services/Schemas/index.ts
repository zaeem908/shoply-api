export const loginSchema = {
    type: 'object',
    required: ["email","password"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        minLength:8
      }
    }
  }
  export const signupSchema = {
    type: 'object',
    required: ["name","email","password"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      name: {
        type: "string"
      },
      password: {
        type: "string",
        minLength:8
      }
    }
  }
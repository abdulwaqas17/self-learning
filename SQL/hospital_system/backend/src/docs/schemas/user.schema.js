export const userSchemas = {
  CreateAdminOrStaffUser: {
    type: "object",
    required: ["name", "email", "password", "role"],
    properties: {
      name: { type: "string", example: "Ali Khan" },
      email: { type: "string", example: "ali@test.com" },
      password: { type: "string", example: "123456" },
      role: {
        type: "string",
        enum: ["ADMIN", "STAFF"]
      }
    }
  },

  CreateDoctorUser: {
    type: "object",
    required: [
      "name",
      "email",
      "password",
      "role",
      "department_id",
      "hospital_id",
      "specialization"
    ],
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      role: {
        type: "string",
        enum: ["DOCTOR"]
      },
      department_id: { type: "integer", example: 2 },
      hospital_id: { type: "integer", example: 1 },
      specialization: { type: "string", example: "Cardiologist" }
    }
  },

  UserResponse: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      email: { type: "string" },
      role: { type: "string" }
    }
  },

  DoctorUserResponse: {
    allOf: [
      { $ref: "#/components/schemas/UserResponse" },
      {
        type: "object",
        properties: {
          specialization: { type: "string" },
          department_id: { type: "integer" },
          hospital_id: { type: "integer" }
        }
      }
    ]
  }
};

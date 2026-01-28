import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patient.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});


app.use(globalErrorHandler);

export default app;
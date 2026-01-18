import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);

export default app;
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/AuthRoutes.js';
import uploadRoutes from './src/routes/UploadRoutes.js';

const app = express();
app.use(express.json());

// Middleware
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/uploads", uploadRoutes);

// Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: err.message });
// });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

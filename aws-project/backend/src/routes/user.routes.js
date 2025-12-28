import express from "express";
import { createUser } from "../controllers/create-user.js";
import { upload } from "../middlewares/upload.middleware.js";
import { getUsers } from "../controllers/get-users.js";
import { deleteUser } from "../controllers/delete-user.js";
import { updateUser } from "../controllers/update-user.js";  

const router = express.Router();

router.post("/add", upload.single("image"), createUser);
router.get("/get", getUsers);
router.delete("/delete/:user_id", deleteUser);
router.put("/update/:user_id",upload.single("image"),updateUser);

export default router;

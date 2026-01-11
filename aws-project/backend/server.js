import app from "./src/app.js";
import dotenv from "dotenv";


dotenv.config();



app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});

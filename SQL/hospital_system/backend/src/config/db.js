import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

try {
  const connection = await db.getConnection();
  console.log("✅ MySQL Database Connected Successfully");
  connection.release();
} catch (error) {
  console.error("❌ MySQL Connection Failed");
  console.error(error.message);
  process.exit(1); // server band
}

export default db;

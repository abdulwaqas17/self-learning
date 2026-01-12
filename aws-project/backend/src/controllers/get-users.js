import { dynamoDB } from "../config/aws.js";
import { redisClient } from "../config/redis.js";

export const getUsers = async (req, res) => {
  try {
    // 1️⃣ Check Redis first
    // const cachedUsers = await redisClient.get("users");

    // if (cachedUsers) {
    //   console.log("⚡ Data from Redis");
    //   return res.status(200).json({
    //     source: "redis",
    //     users: JSON.parse(cachedUsers),
    //   });
    // }

    // 2️⃣ If not in Redis → fetch from DynamoDB
    console.log("🐢 Data from DynamoDB");

    const data = await dynamoDB
      .scan({
        TableName: "users",
      })
      .promise();

    // 3️⃣ Save to Redis (cache for 60 seconds)
    // const redisVar = await redisClient.setEx(
    //   "users",
    //   60, // seconds
    //   JSON.stringify(data.Items)
    // );

    // console.log("==================redisVar==================");
    // console.log(redisVar);
    // console.log(cachedUsers);

    console.log("==================redisVar==================");

    res.status(200).json({
      source: "dynamodb",
      users: data.Items,
    });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

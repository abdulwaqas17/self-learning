import { dynamoDB } from "../config/aws.js";

export const getUsers = async (req, res) => {
  try {
    const params = {
      TableName: "users",
    };

    const data = await dynamoDB.scan(params).promise(); 

    console.log("data ===========>",data);  
    

    res.status(200).json({
      message: "Users fetched successfully",
      users: data.Items,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

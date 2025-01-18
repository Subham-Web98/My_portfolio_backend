import mongoose from "mongoose";

const connectionDataBase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `Database connection established DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Database Connection error is - : ${error}`);
    process.exit(1);
  }
};
export  {connectionDataBase};
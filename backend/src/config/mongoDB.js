import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default mongoDB;
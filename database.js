import mongoose from "mongoose";

const connectDatabase = (uri) => {
 
  try {
    mongoose
      .connect(uri)
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export default connectDatabase;

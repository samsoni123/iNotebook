const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://sonisam333:V8khoQQ5WGYvHJKq@cluster.p4lfemn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log(error);
  }
};
conn();
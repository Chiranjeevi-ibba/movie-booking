const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/user-routes.js");
const adminRouter = require("./routes/admin-routes.js");
const movieRouter = require("./routes/movie-routes.js");
const bookingsRouter = require("./routes/booking-routes.js");
const cors = require("cors");

dotenv.config();
const app = express();
// const port = 5000;
// const connectionString =
//   "mongodb://localhost:27017/Movies_db";

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// mongoose
//   .connect(connectionString)
//   .then((res) => console.log("Connected to db successfully"))
//   .catch((ex) => console.log(ex));
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const corsOptions = {
  exposedHeaders: ["x-auth-token", "Authorization"],
};
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://chiranjeeviibba:${process.env.MONGODB_PASSWORD}@cluster0.sgaqpjg.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));

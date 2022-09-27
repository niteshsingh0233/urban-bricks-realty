const express = require("express");
const cors = require(`cors`);

const app = express();

app.use(express.json());

app.use(cors());

const adminRouter = require(`./routes/admin/admin`);
app.use("/api/admin", adminRouter);

const userRouter = require(`./routes/user/user`);
app.use("/api/user", userRouter);

// const termsRouter = require(`./routes/terms`);
// app.use("/api/terms", termsRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log("server started on port 4000");
});

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.routes");
const port = config.get("port");
const app = express();
app.use(express.json());

app.use("/api", indexRouter);

async function start() {
  try {
    await mongoose.connect(config.get("dbAtlasUrl"))
      .then(() => console.log("Connected atlas Mongodb"));
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

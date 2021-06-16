const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/board", require("./routes/board.routes"));
app.use("/api/list", require("./routes/list.routes"));
app.use("/api/card", require("./routes/card.routes"));
app.use("/api/comments", require("./routes/comments.routes"));
app.use("/api/activity", require("./routes/activity.routes"));

const PORT = config.get("port") || 4000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
start();

const express = require("express");
const app = express();
const cors = require("cors");
//to use dotenv variables
require("dotenv").config();
const db = require("./config/dbConfig");
console.log("registerroute");
const port = process.env.PORT || 5000;
app.use(cors());
//then only destructure of json in backend
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
app.use("/api/users", usersRoute);

const busesRoute = require("./routes/busRoute");
app.use("/api/admin", busesRoute);

const bookingsRoute = require("./routes/bookingsRoute");
app.use("/api/bookings", bookingsRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`node server listening on port ${port}`);
});
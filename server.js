const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// setting connection to mangooes in local or on server 
mongoose.connect(process.env.MONGODB_ATLAS_URI || "mongodb://localhost/workout",
 { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
  useFindAndModify: false });

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on link http://localhost:${PORT}`);
});
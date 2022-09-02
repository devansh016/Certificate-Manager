const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const organizationRoutes = require("./routes/organizationRoutes");
app.use("/organization", organizationRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/event", eventRoutes);

const templateRoutes = require("./routes/templateRoutes");
app.use("/template", templateRoutes);

const certificateRoutes = require("./routes/certificateRoutes");
app.use("/certificate", certificateRoutes);

// Database Connection
const connection = require("./utils/database");
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", function () {
    console.log("Database Connected successfully");
})

// Starting App
app.listen(port, function(){
    console.log("App is running at port " + port);
})
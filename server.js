const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

app.use(require("morgan")("dev")); // Morgan to log requests on server console
app.use(cors()); // for cross-domain requests

// mongodb connected
env.config(); // environment variable or you can say constants
const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 8000;
mongoose
    .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log(`Connected to MongoDB...`))
    .catch((error) => console.log("MongoDB Error:\n", error));

// Import Routes
const usersRouter = require("./routes/users");

// Routes
// body parser for pass json data
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", usersRouter);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

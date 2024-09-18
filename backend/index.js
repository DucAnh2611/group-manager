const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const AuthRouter = require("./controller/auth");
const CategoryRouter = require("./controller/category");
const MemberRouter = require("./controller/member");
const HistoryRouter = require("./controller/history");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_HOST.split(" "),
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    })
);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.use("/auth", AuthRouter);
app.use("/category", CategoryRouter);
app.use("/member", MemberRouter);
app.use("/history", HistoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

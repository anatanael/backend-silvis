const express = require("express");
const cors = require("cors");

const whatsappRoutes = require("./routes/whatsapp.routes");

const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/whatsapp", whatsappRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;

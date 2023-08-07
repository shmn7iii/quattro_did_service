import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import didRouter from "./routes/did/index.js";
import vcRouter from "./routes/vc/index.js";
import vpRouter from "./routes/vp/index.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/did", didRouter);
app.use("/vc", vcRouter);
app.use("/vp", vpRouter);

export default app;

import express from "express";
import { appRoute } from "./index";
const app = express();

const port = process.env.PORT || "13000";

app.use(express.json());
app.listen(port, () => console.log(`server is listening on ${port}`));

app.use(appRoute);
export default app;

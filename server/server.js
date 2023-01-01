import express from "express";
import cors from "cors";

import router from "./router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(7000, () => console.log(`I am live on 7000.`));

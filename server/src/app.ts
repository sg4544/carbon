import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import { signupRouter } from "./components/userRoutes//signup";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./components/userRoutes/current-user";
import { signinRouter } from "./components/userRoutes//signin";
import { signoutRouter } from "./components/userRoutes/signout";
import { createFootprintRouter } from "./components/footprintRoutes/creat-footprint";
import { myFootprintsRouter } from "./components/footprintRoutes/myfootprints";
import { getFootprintRouter } from "./components/footprintRoutes/getfootprint";
const app = express();

app.use(cors());
app.use(json());

// trust the ingress-nginx proxy

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    signed: false, // don't encrypt as we are using jwts are already tamper resistant
  })
);

app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(createFootprintRouter);
app.use(myFootprintsRouter);
app.use(getFootprintRouter);

app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

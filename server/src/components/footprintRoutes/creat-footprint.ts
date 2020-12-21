import { Router, Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { validateBody } from "../../middlewares/json-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { Footprint } from "../../models/footprint";

const createFootprintRouter = Router();
const footprint = require("./footprint.schema.json");

createFootprintRouter.post(
  "/api/footprints/create-footprint",
  currentUser,
  requireAuth,
  validateBody(footprint),
  async (req: Request, res: Response) => {
    const {
      energy,
      publicTransport,
      secondary,
      car,
      motobike,
      flight,
      country,
      household,
      from,
      to,
    } = req.body;

    const footprint = Footprint.build({
      creator: req.currentUser!.id,
      energy,
      publicTransport,
      secondary,
      car,
      motobike,
      flight,
      country,
      household,
      from,
      to,
    });
    footprint.save();
    res.send(footprint);
  }
);

export { createFootprintRouter };

import { Router, Request, Response } from "express";
import { currentUser } from "../../middlewares/current-user";
import { validateBody } from "../../middlewares/json-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { Footprint } from "../../models/footprint";

const myFootprintsRouter = Router();

myFootprintsRouter.get(
  "/api/footprints/myfootprints",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const footprintList = await Footprint.find({
      creator: req.currentUser!.id,
    });
    res.send(footprintList);
  }
);

export { myFootprintsRouter };

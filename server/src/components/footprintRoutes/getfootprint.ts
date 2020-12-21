import { Router, Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { currentUser } from "../../middlewares/current-user";
import { validateBody } from "../../middlewares/json-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { Footprint } from "../../models/footprint";

const getFootprintRouter = Router();

getFootprintRouter.get(
  "/api/footprints/myfootprints/:footprintId",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { footprintId } = req.params;
    const footprint = await Footprint.findById(footprintId); //mongoose already sends not found error
    if (footprint!.creator != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(footprint);
  }
);

export { getFootprintRouter };

import { VolunteerOfferDocument } from "../models/volunteerOffer";
import { userDocToPublicUser } from "./userDocToPublicUser";
import { TaskDocument } from "../models/task";
import { UserDocument } from "../models/user";

export const formatOfferDoc = (offer: VolunteerOfferDocument) => {
  const parsedOffer = offer.toObject();

  const task = parsedOffer.task as TaskDocument;
  return {
    ...parsedOffer,
    volunteer: userDocToPublicUser(parsedOffer.volunteer as UserDocument),
    task: {
      ...task,
      creator: userDocToPublicUser(task.creator as UserDocument),
      onBehalfOf: userDocToPublicUser(task.onBehalfOf as UserDocument),
    },
  };
};

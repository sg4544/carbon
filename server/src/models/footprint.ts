import mongoose, { Schema, Model, Document } from "mongoose";
import { applyIdTransform } from "../util/formatDocId";

// describes the attributes needed to construct a footprint
interface FootprintAttributes {
  creator: string;
  energy: number;
  publicTransport: number;
  secondary: number;
  car: number;
  motobike: number;
  flight: number;
  country: string;
  household: number;
  from: Date;
  to: Date;
}

// describes the properties that a footprint document has
interface FootprintDocument extends Document {
  creator: string;
  energy: number;
  publicTransport: number;
  secondary: number;
  car: number;
  motobike: number;
  flight: number;
  country: string;
  household: number;
  from: Date;
  to: Date;
  createdAt: Date;
  updateAt: Date;
}

// describes properties that a footprint Model has
interface FootprintModel extends Model<FootprintDocument> {
  build(attributes: FootprintAttributes): FootprintDocument;
}

const FootprintSchema: Schema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    energy: { type: Number, required: true },
    publicTransport: { type: Number, required: true },
    secondary: { type: Number, required: true },
    car: { type: Number, required: true },
    motobike: { type: Number, required: true },
    flight: { type: Number, required: true },
    country: { type: String, required: true },
    household: { type: Number, required: true },
    from: { type: mongoose.Schema.Types.Date, required: true },
    to: { type: mongoose.Schema.Types.Date, required: true },
  },
  {
    toObject: {
      transform(doc, ret) {
        return applyIdTransform(ret);
      },
      versionKey: false, // remove __v property
    },
    toJSON: {
      transform(doc, ret) {
        return applyIdTransform(ret);
      },
      versionKey: false, // remove __v property
    },
    timestamps: true,
  }
);

FootprintSchema.statics.build = (attributes: FootprintAttributes) => {
  return new Footprint(attributes);
};

const Footprint = mongoose.model<FootprintDocument, FootprintModel>(
  "Footprint",
  FootprintSchema
);

export { Footprint, FootprintAttributes };

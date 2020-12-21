import { IFlightFields } from "../Calculator/Calculator";
import { unitConvertor } from "./unitConvertor";

export const flightCarbonCal = (flight: IFlightFields) => {
  const values = flight.values;
  const units = flight.units;
  let mileage = values.mileage === "" ? 0 : parseFloat(values.mileage);
  if (units.mileage === "mi") {
    mileage = unitConvertor(mileage, "miToKm");
  }
  if (units.roundTrip === "return") {
    mileage = mileage * 2;
  }
  let carbonValue: number;
  if (mileage > 3000) {
    carbonValue = 0.0001731 * mileage - 0.02322;
    switch (units.class) {
      case "business":
        carbonValue *= 2;
        break;
      case "first":
        carbonValue *= 3;
        break;
      default:
        carbonValue;
    }
  }
  if (mileage < 3000) {
    if (mileage <= 1000) {
      carbonValue = 0.0001253 * mileage + 0.08365;
    } else {
      carbonValue = 0.0001528 * mileage + 0.05893;
    }
    switch (units.class) {
      case "business":
        carbonValue *= 1.3;
        break;
      case "first":
        carbonValue *= 2.5;
        break;
      default:
        carbonValue;
    }
  }
  return carbonValue;
};

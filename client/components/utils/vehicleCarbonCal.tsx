import { ICarFields } from "../Calculator/Calculator";
import { unitConvertor } from "./unitConvertor";

const carbonFactors = {
  //all the values are for km and l/100km, need to be converted for other units
  petrol: 0.00216802,
  diesel: 0.00254603,
  lpg: 0.00155537,
  cng: 0.00044327,
};
export const vehicleCarbonCal = (car: ICarFields) => {
  const values = car.values;
  const units = car.units;
  let mileage = values.mileage === "" ? 0 : parseFloat(values.mileage);
  let effeciency = values.efficiency === "" ? 0 : parseFloat(values.efficiency);
  let carbonValue: number;
  if (units.efficiency !== "g/km") {
    if (units.mileage === "mi") {
      mileage = unitConvertor(mileage, "miToKm");
    }
    if (units.efficiency === "mpg") {
      effeciency = unitConvertor(effeciency, "mpgToL/100km");
      effeciency = effeciency === Infinity ? 0 : effeciency; //mpg conversion correction
    }
    carbonValue = (mileage / 100) * effeciency * carbonFactors[units.fuel];
  } else {
    carbonValue = unitConvertor(mileage * effeciency, "gToTonnes");
  }
  return carbonValue;
};

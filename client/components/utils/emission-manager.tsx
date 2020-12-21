import { IFootprint } from "../Types/IFootprint";
import { DateManager } from "./date-manager";

interface IEmission {
  energy: number;
  publicTransport: number;
  secondary: number;
  car: number;
  motobike: number;
  flight: number;
}
export class EmissionManager {
  emissions: IEmission;
  household: number;
  from: Date;
  to: Date;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  creator: string;

  constructor(footprint: IFootprint) {
    ({
      household: this.household,
      from: this.from,
      to: this.to,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id,
      creator: this.creator,
      ...this.emissions
    } = footprint);
  }
  totalHousholdEmission() {
    return Object.values(this.emissions).reduce(
      (a: number, b: number) => a + b
    );
  }
  pesronEmission() {
    return this.totalHousholdEmission() / this.household;
  }
  annualPersonEmission() {
    const days = DateManager.toDays(new Date(this.from), new Date(this.to));
    return this.pesronEmission() / (days / 365);
  }
  daysPeriod() {
    return DateManager.toDays(new Date(this.from), new Date(this.to));
  }
  emissionObject() {
    return this.emissions;
  }
}

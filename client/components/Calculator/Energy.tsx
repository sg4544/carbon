import { withTranslation } from "next-i18next";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Grid, Message } from "semantic-ui-react";
import styled from "styled-components";
import ToolTip from "../Tooltip";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { calculateCarbon } from "../utils/calculateCarbon";
import { IEnergyFields } from "./Calculator";

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const carbonFactors = {
  gas: { kWh: 0.00018387, therms: 0.005388698, GBP: 0.00542 },
  oil: {
    kWh: 0.00024666,
    litres: 0.00254039,
    tonnes: 3.16532,
    gallons: 0.00961642,
  },
  coal: {
    kWh: 0.00034462,
    tonnes: 2.88326,
    "10kg": 0.0288326,
    "20kg": 0.0576652,
    "25kg": 0.0720815,
    "50kg": 0.144163,
  },
  lpg: {
    kWh: 0.00021448,
    litres: 0.00155537,
    therms: 0.00628579,
    gallons: 0.00588772,
  },
  propane: {
    litres: 0.00155537,
    gallons: 0.00588772,
  },
  wood: {
    tonnes: 0.07229731,
  },
};

interface IEnergyProps {
  carbonAmount: ICarbonAmount;
  energyFields: IEnergyFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setEnergyFields: (value: React.SetStateAction<IEnergyFields>) => void;
  t?: (text: string) => string;
}
const Energy = ({
  carbonAmount,
  setCarbonAmount,
  energyFields,
  setEnergyFields,
  t,
}: IEnergyProps) => {
  useEffect(() => {
    const values = energyFields.values;
    const units = energyFields.units;
    const carbonValues = Object.keys(values).map((value) => {
      if (value === "electric") {
        return calculateCarbon(values.electric, units.electric, 1000);
      } else {
        return calculateCarbon(
          values[value],
          carbonFactors[value][units[value]]
        );
      }
    });
    setCarbonAmount({
      ...carbonAmount,
      energy: carbonValues.reduce((a, b) => a + b, 0),
    });
  }, [energyFields]);
  return (
    <>
      <Title>{t("title")}</Title>
      <p>{t("note")}</p>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Input
            name="electric"
            value={energyFields.values.electric}
            onChange={(e) => {
              const field = e.target.name;
              const value = e.target.value;
              if (value.match(/^\d*\.?\d*$/) || value === "") {
                setEnergyFields((prevState) => ({
                  ...prevState,
                  values: { ...prevState.values, [field]: value },
                }));
              }
            }}
            placeholder="Electricity"
            label={t("electricity")}
          />
          <Form.Group grouped>
            <label>{t("other")}</label>
            <Form.Input
              name="gas"
              value={energyFields.values.gas}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder={t("gas")}
            />
            <Form.Input
              name="oil"
              value={energyFields.values.oil}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder={t("oil")}
            />
            <Form.Input
              name="coal"
              value={energyFields.values.coal}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder={t("coal")}
            />
            <Form.Input
              name="lpg"
              value={energyFields.values.lpg}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder="LPG"
            />
            <Form.Input
              name="propane"
              value={energyFields.values.propane}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder={t("propane")}
            />
            <Form.Input
              name="wood"
              value={energyFields.values.wood}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setEnergyFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              placeholder={t("wood")}
            />
          </Form.Group>
        </Grid.Column>
        <Grid.Column>
          <ToolTip
            label={"CO2 " + t("rate")}
            content={t("rateTooltip")}
            position="top right"
          />
          <Form.Input
            name="electric"
            value={energyFields.units.electric}
            onChange={(e) => {
              const value = e.target.value;
              const field = e.target.name;
              if (value.match(/^\d*\.?\d*$/) || value === "") {
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }
            }}
            placeholder="kgCO2e/kWh"
            style={{ marginTop: "5px" }}
          />
          <Form.Group grouped>
            <label>{t("unit")}</label>
            <Form.Select
              fluid
              options={[
                { key: "kWh", text: "kWh", value: "kWh" },
                { key: "therms", text: "Therms", value: "therms" },
                { key: "GBP", text: "GBP (£)", value: "GBP" },
              ]}
              name="gas"
              value={energyFields.units.gas}
              onChange={(e, data) => {
                const value = data.value as "kWh" | "therms" | "GBP";
                const field = data.name;
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
            <Form.Select
              fluid
              options={[
                { key: "kWh", text: "kWh", value: "kWh" },
                { key: "litres", text: "Litres", value: "litres" },
                { key: "tonnes", text: "Tonnes", value: "tonnes" },
                { key: "gallons", text: "US Gallons", value: "gallons" },
              ]}
              name="oil"
              value={energyFields.units.oil}
              onChange={(e, data) => {
                const value = data.value as
                  | "kWh"
                  | "litres"
                  | "tonnes"
                  | "gallons";
                const field = data.name;
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
            <Form.Select
              fluid
              options={[
                { key: "kWh", text: "kWh", value: "kWh" },
                { key: "tonnes", text: "Tonnes", value: "tonnes" },
                { key: "10kg", text: "x 10kg bags", value: "10kg" },
                { key: "20kg", text: "x 20kg bags", value: "20kg" },
                { key: "25kg", text: "x 25kg bags", value: "25kg" },
                { key: "50kg", text: "x 50kg bags", value: "50kg" },
              ]}
              name="coal"
              value={energyFields.units.coal}
              onChange={(e, data) => {
                const value = data.value as
                  | "kWh"
                  | "tonnes"
                  | "10kg"
                  | "20kg"
                  | "25kg"
                  | "50kg";
                const field = data.name;
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
            <Form.Select
              fluid
              options={[
                { key: "kWh", text: "kWh", value: "kWh" },
                { key: "litres", text: "Litres", value: "litres" },
                { key: "therms", text: "Therms", value: "therms" },
                { key: "gallons", text: "US Gallons", value: "gallons" },
              ]}
              name="lpg"
              value={energyFields.units.lpg}
              onChange={(e, data) => {
                const value = data.value as
                  | "kWh"
                  | "therms"
                  | "litres"
                  | "gallons";
                const field = data.name;
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
            <Form.Select
              fluid
              options={[
                { key: "litres", text: "Litres", value: "litres" },
                { key: "gallons", text: "US Gallons", value: "gallons" },
              ]}
              name="propane"
              value={energyFields.units.propane}
              onChange={(e, data) => {
                const value = data.value as "litres" | "gallons";
                const field = data.name;
                setEnergyFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
            <Form.Select
              fluid
              options={[{ key: "tonnes", text: "Tonnes", value: "tonnes" }]}
              name="wood"
              value={energyFields.units.wood}
            />
          </Form.Group>
        </Grid.Column>
      </Grid>
      <Message
        style={{ textAlign: "center" }}
        color="green"
        info
        header={t("messageHeader")}
        content={`${carbonAmount.energy.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

Energy.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("energy")(Energy);

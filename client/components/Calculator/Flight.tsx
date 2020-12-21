import { withTranslation } from "next-i18next";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, List, Message } from "semantic-ui-react";
import styled from "styled-components";
import ToolTip from "../Tooltip";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { flightCarbonCal } from "../utils/flightCarbonCal";
import { IFlightFields } from "./Calculator";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
interface IFlightProps {
  carbonAmount: ICarbonAmount;
  flightFields: IFlightFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setFlightFields: (value: React.SetStateAction<IFlightFields>) => void;
  flightList: IFlightFields[];
  setFlightList: (value: React.SetStateAction<IFlightFields[]>) => void;
  t?: (text: string) => string;
}
const Flight = ({
  carbonAmount,
  flightFields,
  setCarbonAmount,
  setFlightFields,
  flightList,
  setFlightList,
  t,
}: IFlightProps) => {
  useEffect(() => {
    const flightCarbonList = flightList.map((flight) => {
      return flightCarbonCal(flight);
    });
    setCarbonAmount({
      ...carbonAmount,
      flight: flightCarbonList.reduce((a, b) => a + b, 0),
    });
  }, [flightList]);
  const deleteFlight = (e: React.MouseEvent<HTMLLIElement>) => {
    const element = e.target as HTMLInputElement;
    const selectedFlightIndex = parseInt(element.getAttribute("flight-index"));
    const remianingFlights = flightList.filter(
      (flight) => flight.index !== selectedFlightIndex
    );
    setFlightList(
      remianingFlights.map((flight, index) => {
        return { ...flight, index: index };
      })
    );
  };
  return (
    <>
      <Title>{t("title")}</Title>
      <p>{t("note")}</p>
      <Form.Group inline>
        <Form.Radio
          name="roundTrip"
          checked={flightFields.units.roundTrip === "return"}
          label={t("return")}
          value="return"
          onChange={(e, data) => {
            const value = data.value as "return" | "oneway";
            const field = data.name;
            setFlightFields((prevState) => ({
              ...prevState,
              units: { ...prevState.units, [field]: value },
            }));
          }}
        />
        <Form.Radio
          label={t("oneway")}
          value="oneway"
          name="roundTrip"
          checked={flightFields.units.roundTrip === "oneway"}
          onChange={(e, data) => {
            const value = data.value as "return" | "oneway";
            const field = data.name;
            setFlightFields((prevState) => ({
              ...prevState,
              units: { ...prevState.units, [field]: value },
            }));
          }}
        />
      </Form.Group>
      <Form.Group widths="equal" style={{ marginTop: "15px" }}>
        <Form.Input
          label={
            <ToolTip content={t("distanceTooltip")} label={t("distance")} />
          }
          name="mileage"
          value={flightFields.values.mileage}
          onChange={(e) => {
            const field = e.target.name;
            const value = e.target.value;
            if (value.match(/^(?!0)\d+$/) || value === "") {
              setFlightFields((prevState) => ({
                ...prevState,
                values: { ...prevState.values, [field]: value },
              }));
            }
          }}
        />
        <Form.Dropdown
          label={t("unit")}
          fluid
          selection
          options={[
            { key: "mi", text: t("miles"), value: "mi" },
            { key: "km", text: t("km"), value: "km" },
          ]}
          value={flightFields.units.mileage}
          name="mileage"
          onChange={(e, data) => {
            const value = data.value as "mi" | "km";
            const field = data.name;
            setFlightFields((prevState) => ({
              ...prevState,
              units: { ...prevState.units, [field]: value },
            }));
          }}
        />
        <Form.Dropdown
          label={t("class")}
          fluid
          selection
          options={[
            { key: "economy", text: t("economy"), value: "economy" },
            { key: "business", text: t("business"), value: "business" },
            { key: "first", text: t("first"), value: "first" },
          ]}
          value={flightFields.units.class}
          name="class"
          onChange={(e, data) => {
            const value = data.value as "economy" | "business" | "first";
            const field = data.name;
            setFlightFields((prevState) => ({
              ...prevState,
              units: { ...prevState.units, [field]: value },
            }));
          }}
        />
      </Form.Group>
      <Button
        primary
        type="button"
        style={{ width: "100%", marginTop: "15px" }}
        disabled={flightFields.values.mileage === ""}
        onClick={() => {
          setFlightFields((prevState) => ({
            ...prevState,
            index: flightList.length,
          }));
          //setCarList((prevState) => [...new Set([...prevState, carFields])]); //remove duplicates
          setFlightList((prevState) => [...prevState, flightFields]);
        }}
      >
        {t("add")}
      </Button>
      <List>
        {flightList.map((flight, index) => {
          return (
            <List.Item key={index}>
              <List.Icon
                flight-index={index}
                name="close"
                color="red"
                inverted
                onClick={deleteFlight}
              />
              <List.Content>{`${flight.values.mileage} ${
                flight.units.mileage
              } ${t(flight.units.roundTrip)} ${t("flight")} ${t(
                flight.units.class
              )}`}</List.Content>
            </List.Item>
          );
        })}
      </List>
      <Message
        style={{ textAlign: "center" }}
        color="green"
        info
        header={t("messageHeader")}
        content={`${carbonAmount.flight.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

Flight.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("flight")(Flight);

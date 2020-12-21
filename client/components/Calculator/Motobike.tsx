import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Form, Grid, List, Message } from "semantic-ui-react";
import styled from "styled-components";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { vehicleCarbonCal } from "../utils/vehicleCarbonCal";
import { IMotobikeFields } from "./Calculator";
import { withTranslation } from "../../i18n";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

interface IMotobikeProps {
  carbonAmount: ICarbonAmount;
  motobikeFields: IMotobikeFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setMotobikeFields: (value: React.SetStateAction<IMotobikeFields>) => void;
  motobikeList: IMotobikeFields[];
  setMotobikeList: (value: React.SetStateAction<IMotobikeFields[]>) => void;
  t?: (text: string) => string;
}
const Motobike = ({
  carbonAmount,
  motobikeFields,
  setCarbonAmount,
  setMotobikeFields,
  motobikeList,
  setMotobikeList,
  t,
}: IMotobikeProps) => {
  useEffect(() => {
    const motobikeCarbonList = motobikeList.map((motobike) => {
      return vehicleCarbonCal(motobike);
    });
    setCarbonAmount({
      ...carbonAmount,
      motobike: motobikeCarbonList.reduce((a, b) => a + b, 0),
    });
  }, [motobikeList]);
  const [motobikeRadio, setMotobikeRadio] = useState("efficiency");
  const deleteMotobike = (e: React.MouseEvent<HTMLLIElement>) => {
    const element = e.target as HTMLInputElement;
    const selectedMotobikeIndex = parseInt(
      element.getAttribute("motobike-index")
    );
    const remianingMotobikes = motobikeList.filter(
      (motobike) => motobike.index !== selectedMotobikeIndex
    );
    setMotobikeList(
      remianingMotobikes.map((motobike, index) => {
        return { ...motobike, index: index };
      })
    );
  };
  return (
    <>
      <Title>{t("title")}</Title>
      <p>{t("note")}</p>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("mileage")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="mileage"
              value={motobikeFields.values.mileage}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setMotobikeFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "mi", text: t("miles"), value: "mi" },
                { key: "km", text: t("km"), value: "km" },
              ]}
              name="mileage"
              value={motobikeFields.units.mileage}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setMotobikeFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Group inline>
              <Form.Radio
                checked={motobikeRadio === "efficiency"}
                label={t("efficiency")}
                value="efficiency"
                onChange={(e, data) => {
                  const value = data.value as string;
                  setMotobikeRadio(value);
                }}
              />
              <Form.Radio
                label={t("type")}
                value="type"
                checked={motobikeRadio === "type"}
                onChange={(e, data) => {
                  const value = data.value as string;
                  setMotobikeRadio(value);
                }}
                disabled
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
        {motobikeRadio === "efficiency" && (
          <>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Input
                  name="efficiency"
                  value={motobikeFields.values.efficiency}
                  onChange={(e) => {
                    const field = e.target.name;
                    const value = e.target.value;
                    if (value.match(/^\d*\.?\d*$/) || value === "") {
                      setMotobikeFields((prevState) => ({
                        ...prevState,
                        values: { ...prevState.values, [field]: value },
                      }));
                    }
                  }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Form.Dropdown
                  options={[
                    { key: "g/km", text: "g/km", value: "g/km" },
                    { key: "L/100km", text: "L/100km", value: "L/100km" },
                    { key: "mpg", text: "mpg", value: "mpg" },
                  ]}
                  fluid
                  selection
                  name="efficiency"
                  value={motobikeFields.units.efficiency}
                  onChange={(e, data) => {
                    const value = data.value as "g/km" | "l/100km" | "mpg";
                    const field = data.name;
                    setMotobikeFields((prevState) => ({
                      ...prevState,
                      units: { ...prevState.units, [field]: value },
                    }));
                  }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Form.Dropdown
                  options={[
                    { key: "petrol", text: t("petrol"), value: "petrol" },
                    { key: "diesel", text: t("diesel"), value: "diesel" },
                    { key: "LPG", text: "LPG", value: "LPG" },
                    { key: "CNG", text: "CNG", value: "CNG" },
                  ]}
                  fluid
                  selection
                  name="fuel"
                  value={motobikeFields.units.fuel}
                  onChange={(e, data) => {
                    const value = data.value as
                      | "petrol"
                      | "diesel"
                      | "LPG"
                      | "CNG";
                    const field = data.name;
                    setMotobikeFields((prevState) => ({
                      ...prevState,
                      units: { ...prevState.units, [field]: value },
                    }));
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </>
        )}
      </Grid>
      {/*this part will be added later we need api for it*/}
      {motobikeRadio === "type" && (
        <>
          <Form.Dropdown
            options={[
              {
                key: "small",
                text: "Small motobike/mopped/scooter up to 125cc",
                value: "small",
              },
              {
                key: "medium",
                text: "Medium motobike over 125cc and up to 500cc",
                value: "medium",
              },
              {
                key: "large",
                text: "Large motobik eover 500cc",
                value: "large",
              },
            ]}
            fluid
            selection
            placeholder="Select type"
          />
        </>
      )}
      <Button
        type="button"
        primary
        style={{ marginTop: "15px", width: "100%" }}
        onClick={() => {
          setMotobikeFields((prevState) => ({
            ...prevState,
            index: motobikeList.length,
          }));
          setMotobikeList((prevState) => [...prevState, motobikeFields]);
        }}
        disabled={
          motobikeFields.values.mileage === "" ||
          motobikeFields.values.efficiency === ""
        }
      >
        {t("add")}
      </Button>
      <List>
        {motobikeList.map((motobike, index) => {
          return (
            <List.Item key={index}>
              <List.Icon
                motobike-index={index}
                name="close"
                color="red"
                inverted
                onClick={deleteMotobike}
              />
              <List.Content>{`${motobike.values.mileage} ${
                motobike.units.mileage
              } ${t(motobike.units.fuel)} ${motobike.values.efficiency} ${
                motobike.units.efficiency
              }`}</List.Content>
            </List.Item>
          );
        })}
      </List>
      <Message
        style={{ textAlign: "center" }}
        color="green"
        info
        header={t("messageHeader")}
        content={`${carbonAmount.motobike.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

Motobike.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("motobike")(Motobike);

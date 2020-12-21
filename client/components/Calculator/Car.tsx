import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Form, Grid, List, Message } from "semantic-ui-react";
import styled from "styled-components";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { vehicleCarbonCal } from "../utils/vehicleCarbonCal";
import { unitConvertor } from "../utils/unitConvertor";
import { ICarFields } from "./Calculator";
import { withTranslation } from "../../i18n";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

interface ICarProps {
  carbonAmount: ICarbonAmount;
  carFields: ICarFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setCarFields: (value: React.SetStateAction<ICarFields>) => void;
  carList: ICarFields[];
  setCarList: (value: React.SetStateAction<ICarFields[]>) => void;
  t?: (text: string) => string;
}

const Car = ({
  carbonAmount,
  carFields,
  setCarbonAmount,
  setCarFields,
  carList,
  setCarList,
  t,
}: ICarProps) => {
  useEffect(() => {
    const carCarbonList = carList.map((car) => {
      return vehicleCarbonCal(car);
    });
    setCarbonAmount({
      ...carbonAmount,
      car: carCarbonList.reduce((a, b) => a + b, 0),
    });
  }, [carList]);
  const [carRadio, setCarRadio] = useState("efficiency");
  const deleteCar = (e: React.MouseEvent<HTMLLIElement>) => {
    const element = e.target as HTMLInputElement;
    const selectedCarIndex = parseInt(element.getAttribute("car-index"));
    const remianingCars = carList.filter(
      (car) => car.index !== selectedCarIndex
    );
    setCarList(
      remianingCars.map((car, index) => {
        return { ...car, index: index };
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
              value={carFields.values.mileage}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setCarFields((prevState) => ({
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
              value={carFields.units.mileage}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setCarFields((prevState) => ({
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
                checked={carRadio === "efficiency"}
                label={t("efficiency")}
                value="efficiency"
                onChange={(e, data) => {
                  const value = data.value as string;
                  setCarRadio(value);
                }}
              />
              <Form.Radio
                disabled
                label={t("vehicle")}
                value="vehicle"
                checked={carRadio === "vehicle"}
                onChange={(e, data) => {
                  const value = data.value as string;
                  setCarRadio(value);
                }}
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
        {carRadio === "efficiency" && (
          <>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Input
                  name="efficiency"
                  value={carFields.values.efficiency}
                  onChange={(e) => {
                    const field = e.target.name;
                    const value = e.target.value;
                    if (value.match(/^\d*\.?\d*$/) || value === "") {
                      setCarFields((prevState) => ({
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
                  value={carFields.units.efficiency}
                  onChange={(e, data) => {
                    const value = data.value as "g/km" | "l/100km" | "mpg";
                    const field = data.name;
                    setCarFields((prevState) => ({
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
                  value={carFields.units.fuel}
                  onChange={(e, data) => {
                    const value = data.value as
                      | "petrol"
                      | "diesel"
                      | "LPG"
                      | "CNG";
                    const field = data.name;
                    setCarFields((prevState) => ({
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
      {carRadio === "vehicle" && (
        <>
          <Form.Dropdown
            options={[
              { key: "car", text: "EU car database", value: "car" },
              { key: "van", text: "Van database", value: "van" },
            ]}
            fluid
            selection
            value="car"
          />
          <Form.Dropdown
            options={[]}
            fluid
            selection
            placeholder="Select year of manufacture"
          />
          <Form.Dropdown
            options={[]}
            fluid
            selection
            placeholder="Select manufacturer"
          />
          <Form.Dropdown
            options={[]}
            fluid
            selection
            placeholder="Select model"
          />
          <Form.Dropdown
            options={[]}
            fluid
            selection
            placeholder="Select derivative"
          />
        </>
      )}
      <Button
        type="button"
        primary
        style={{ marginTop: "15px", width: "100%" }}
        onClick={() => {
          setCarFields((prevState) => ({
            ...prevState,
            index: carList.length,
          }));
          //setCarList((prevState) => [...new Set([...prevState, carFields])]); //remove duplicates
          setCarList((prevState) => [...prevState, carFields]);
        }}
        disabled={
          carFields.values.mileage === "" || carFields.values.efficiency === ""
        }
      >
        {t("add")}
      </Button>
      <List>
        {carList.map((car, index) => {
          return (
            <List.Item key={index}>
              <List.Icon
                car-index={index}
                name="close"
                color="red"
                inverted
                onClick={deleteCar}
              />
              <List.Content>{`${car.values.mileage} ${car.units.mileage} ${t(
                car.units.fuel
              )} ${car.values.efficiency} ${
                car.units.efficiency
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
        content={`${carbonAmount.car.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

Car.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("car")(Car);

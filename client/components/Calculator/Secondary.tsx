import { useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form, Grid, Message } from "semantic-ui-react";
import styled from "styled-components";
import { withTranslation } from "../../i18n";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { calculateCarbon } from "../utils/calculateCarbon";
import { ISecondaryFields } from "./Calculator";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const carbonFactors = {
  food: { week: 0.00087642 * 52, month: 0.00087642 * 12, year: 0.00087642 },
  pharmacy: { week: 0.0005065 * 52, month: 0.0005065 * 12, year: 0.0005065 },
  clothes: { week: 0.0003317 * 52, month: 0.0003317 * 12, year: 0.0003317 },
  paper: { week: 0.0006628 * 52, month: 0.0006628 * 12, year: 0.0006628 },
  computer: { week: 0.0006511 * 52, month: 0.0006511 * 12, year: 0.0006511 },
  tv: { week: 0.0003934 * 52, month: 0.0003934 * 12, year: 0.0003934 },
  motor: { week: 0.0007792 * 52, month: 0.0007792 * 12, year: 0.0007792 },
  furniture: { week: 0.0005037 * 52, month: 0.0005037 * 12, year: 0.0005037 },
  restaurants: { week: 0.0005141 * 52, month: 0.0005141 * 12, year: 0.0005141 },
  mobile: { week: 0.0006236 * 52, month: 0.0006236 * 12, year: 0.0006236 },
  banking: { week: 0.0001846 * 52, month: 0.0001846 * 12, year: 0.0001846 },
  insurance: { week: 0.0003108 * 52, month: 0.0003108 * 12, year: 0.0003108 },
  education: { week: 0.0002477 * 52, month: 0.0002477 * 12, year: 0.0002477 },
  recreational: {
    week: 0.0002879 * 52,
    month: 0.0002879 * 12,
    year: 0.0002879,
  },
};
interface ISecondaryProps {
  carbonAmount: ICarbonAmount;
  secondaryFields: ISecondaryFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setSecondaryFields: (value: React.SetStateAction<ISecondaryFields>) => void;
  t?: (text: string) => string;
}
const Secondary = ({
  carbonAmount,
  secondaryFields,
  setCarbonAmount,
  setSecondaryFields,
  t,
}: ISecondaryProps) => {
  useEffect(() => {
    const values = secondaryFields.values;
    const units = secondaryFields.units;
    const carbonValues = Object.keys(values).map((value) => {
      return calculateCarbon(values[value], carbonFactors[value][units[value]]);
    });
    setCarbonAmount({
      ...carbonAmount,
      secondary: carbonValues.reduce((a, b) => a + b, 0),
    });
  }, [secondaryFields]);
  return (
    <>
      <Title>{t("title")}</Title>
      <p>P{t("note")}</p>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("food")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="food"
              value={secondaryFields.values.food}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="food"
              value={secondaryFields.units.food}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("pharmacy")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="pharmacy"
              value={secondaryFields.values.pharmacy}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="pharmacy"
              value={secondaryFields.units.pharmacy}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("clothes")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="clothes"
              value={secondaryFields.values.clothes}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="clothes"
              value={secondaryFields.units.clothes}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("paper")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="paper"
              value={secondaryFields.values.paper}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="paper"
              value={secondaryFields.units.paper}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("computer")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="computer"
              value={secondaryFields.values.computer}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="computer"
              value={secondaryFields.units.computer}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("tv")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="tv"
              value={secondaryFields.values.tv}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="tv"
              value={secondaryFields.units.tv}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("motor")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="motor"
              value={secondaryFields.values.motor}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="motor"
              value={secondaryFields.units.motor}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("furniture")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="furniture"
              value={secondaryFields.values.furniture}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="furniture"
              value={secondaryFields.units.furniture}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("restaurants")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="restaurants"
              value={secondaryFields.values.restaurants}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="restaurants"
              value={secondaryFields.units.restaurants}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("telephone")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="mobile"
              value={secondaryFields.values.mobile}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="mobile"
              value={secondaryFields.units.mobile}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("banking")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="banking"
              value={secondaryFields.values.banking}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="banking"
              value={secondaryFields.units.banking}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("insurance")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="insurance"
              value={secondaryFields.values.insurance}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="insurance"
              value={secondaryFields.units.insurance}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("education")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="education"
              value={secondaryFields.values.education}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="education"
              value={secondaryFields.units.education}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label style={{ fontSize: "12px" }}>{t("recreational")}</label>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name="recreational"
              value={secondaryFields.values.recreational}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setSecondaryFields((prevState) => ({
                    ...prevState,
                    values: { ...prevState.values, [field]: value },
                  }));
                }
              }}
              icon="pound sign"
              iconPosition="left"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              fluid
              selection
              options={[
                { key: "week", text: t("week"), value: "week" },
                { key: "month", text: t("month"), value: "month" },
                { key: "year", text: t("annual"), value: "year" },
              ]}
              name="recreational"
              value={secondaryFields.units.recreational}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setSecondaryFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Message
        style={{ textAlign: "center" }}
        color="green"
        info
        header={t("messageHeader")}
        content={`${carbonAmount.secondary.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

Secondary.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("second")(Secondary);

import { useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form, Grid, Message } from "semantic-ui-react";
import styled from "styled-components";
import { withTranslation } from "../../i18n";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import { calculateCarbon } from "../utils/calculateCarbon";
import { IPublicTransportFields } from "./Calculator";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const carbonFactors = {
  bus: { km: 0.00010312, mi: 0.00016595 },
  coach: { km: 0.00002732, mi: 0.00004397 },
  localTrain: { km: 0.00003694, mi: 0.00005945 },
  longTrain: { km: 0.00000497, mi: 0.000008 },
  tram: { km: 0.00002991, mi: 0.00004813 },
  subway: { km: 0.0000275, mi: 0.00004426 },
  taxi: { km: 0.00014549, mi: 0.00023414 },
};

interface IPublicTransportProps {
  carbonAmount: ICarbonAmount;
  publicTransportFields: IPublicTransportFields;
  setCarbonAmount: (value: React.SetStateAction<ICarbonAmount>) => void;
  setPublicTransportFields: (
    value: React.SetStateAction<IPublicTransportFields>
  ) => void;
  t?: (text: string) => string;
}
const PublicTransport = ({
  carbonAmount,
  setCarbonAmount,
  publicTransportFields,
  setPublicTransportFields,
  t,
}: IPublicTransportProps) => {
  useEffect(() => {
    const values = publicTransportFields.values;
    const units = publicTransportFields.units;
    const carbonValues = Object.keys(values).map((value) => {
      return calculateCarbon(values[value], carbonFactors[value][units[value]]);
    });
    setCarbonAmount({
      ...carbonAmount,
      publicTransport: carbonValues.reduce((a, b) => a + b, 0),
    });
  }, [publicTransportFields]);
  return (
    <>
      <Title>{t("title")}</Title>
      <p>{t("note")}</p>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("bus")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="bus"
              value={publicTransportFields.values.bus}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="bus"
              value={publicTransportFields.units.bus}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("coach")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="coach"
              value={publicTransportFields.values.coach}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="coach"
              value={publicTransportFields.units.coach}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("localTrain")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="localTrain"
              value={publicTransportFields.values.localTrain}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="localTrain"
              value={publicTransportFields.units.localTrain}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("longTrain")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="longTrain"
              value={publicTransportFields.values.longTrain}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="longTrain"
              value={publicTransportFields.units.longTrain}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("tram")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="tram"
              value={publicTransportFields.values.tram}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="tram"
              value={publicTransportFields.units.tram}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("subway")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="subway"
              value={publicTransportFields.values.subway}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="subway"
              value={publicTransportFields.units.subway}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
                  ...prevState,
                  units: { ...prevState.units, [field]: value },
                }));
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <label>{t("taxi")}</label>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input
              name="taxi"
              value={publicTransportFields.values.taxi}
              onChange={(e) => {
                const field = e.target.name;
                const value = e.target.value;
                if (value.match(/^\d*\.?\d*$/) || value === "") {
                  setPublicTransportFields((prevState) => ({
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
              name="taxi"
              value={publicTransportFields.units.taxi}
              onChange={(e, data) => {
                const value = data.value as "mi" | "km";
                const field = data.name;
                setPublicTransportFields((prevState) => ({
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
        content={`${carbonAmount.publicTransport.toFixed(2)} ${t("message")}`}
      />
    </>
  );
};

PublicTransport.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("bus")(PublicTransport);

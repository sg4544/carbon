import { Button, Form, Grid } from "semantic-ui-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ToolTip from "../Tooltip";
import { IPeriodFields } from "./Calculator";
import ErrorMessage from "../ErrorMessage";
import { withTranslation } from "../../i18n";

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
const Counter = styled.div`
  font-size: 22px;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  width: 60px;
  text-align: center;
`;
interface IPeriodProps {
  setPeriodFields: (value: React.SetStateAction<IPeriodFields>) => void;
  periodFields: IPeriodFields;
  t?: (text: string) => string;
}
const Period = ({ periodFields, setPeriodFields, t }: IPeriodProps) => {
  return (
    <>
      <Title>{t("title")}</Title>
      <Form.Field>
        <Grid columns={2}>
          <Grid.Column width={1}>
            <ToolTip content={t("placeTooltip")} />
          </Grid.Column>
          <Grid.Column width={14}>
            <p>{t("place")}</p>
          </Grid.Column>
        </Grid>
      </Form.Field>
      <Form.Dropdown
        label={t("country")}
        placeholder="Select Country"
        fluid
        search
        selection
        options={[
          //other countries will be added later
          { text: "United Kingdom", key: "gb", value: "gb", flag: "gb" },
        ]}
        value={periodFields.country}
      />
      <Form.Field>
        <Grid columns={2}>
          <Grid.Column width={1}>
            <ToolTip content={t("householdTooltip")} />
          </Grid.Column>
          <Grid.Column width={14}>
            <p>{t("household")}</p>
          </Grid.Column>
        </Grid>
      </Form.Field>
      <Form.Group widths="3" style={{ justifyContent: "center" }}>
        <Button
          style={{
            display: "block",
            height: "45px",
            width: "45px",
            borderRadius: "50%",
          }}
          icon="plus"
          primary
          type="button"
          onClick={() => {
            periodFields.household < 10 &&
              setPeriodFields((prevState) => ({
                ...prevState,
                household: prevState.household + 1,
              }));
          }}
        />
        <Counter>{periodFields.household}</Counter>
        <Button
          primary
          type="button"
          style={{
            display: "block",
            height: "45px",
            width: "45px",
            borderRadius: "50%",
          }}
          icon="minus"
          onClick={() => {
            periodFields.household > 1 &&
              setPeriodFields((prevState) => ({
                ...prevState,
                household: prevState.household - 1,
              }));
          }}
        />
      </Form.Group>
      <Grid columns={2}>
        <Grid.Column width={1}>
          <ToolTip content={t("periodTooltip")} />
        </Grid.Column>
        <Grid.Column width={14}>
          <p>{t("period")}</p>
        </Grid.Column>
      </Grid>
      <Grid columns="equal" style={{ marginTop: "0px" }}>
        <Grid.Column>
          <Form.Input
            error={periodFields.from === ""}
            name="from"
            label={t("from")}
            type="date"
            style={{ height: "38px", fontSize: "0.8em" }}
            value={periodFields.from}
            max={periodFields.to}
            onChange={(e) => {
              const value = e.target.value;
              setPeriodFields((prevState) => ({
                ...prevState,
                from: value,
              }));
            }}
          />
          {periodFields.from === "" && (
            <ErrorMessage>From date is a required field</ErrorMessage>
          )}
        </Grid.Column>
        <Grid.Column>
          <Form.Input
            error={periodFields.to === ""}
            name="to"
            label={t("to")}
            type="date"
            style={{ height: "38px", fontSize: "0.8em" }}
            value={periodFields.to}
            min={periodFields.from}
            onChange={(e) => {
              const value = e.target.value;
              setPeriodFields((prevState) => ({
                ...prevState,
                to: value,
              }));
            }}
          />
          {periodFields.to === "" && (
            <ErrorMessage>To date is a required field</ErrorMessage>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

Period.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("details")(Period);

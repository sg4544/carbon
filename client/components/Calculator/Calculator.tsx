import { useState } from "react";
import { Button, Form, Icon, Tab, TabProps } from "semantic-ui-react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ICarbonAmount } from "../Types/ICarbonAmount";
import Car from "./Car";
import Energy from "./Energy";
import Flight from "./Flight";
import Motobike from "./Motobike";
import Period from "./Period";
import PublicTransport from "./PublicTransport";
import Secondary from "./Secondary";
import axios from "axios";
import { DateManager } from "../utils/date-manager";
import { useRouter } from "next/router";
import ErrorMessage from "../ErrorMessage";
import { withTranslation } from "../../i18n";

const Div = styled.div`
  max-width: 550px;
  margin: auto;
`;

const FormCard = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;
const FormBody = styled.div`
  padding: 15px;
`;
export interface IEnergyFields {
  values: {
    electric: string;
    gas: string;
    oil: string;
    coal: string;
    lpg: string;
    propane: string;
    wood: string;
  };
  units: {
    electric: string;
    gas: "kWh" | "therms" | "GBP";
    oil: "kWh" | "litres" | "tonnes" | "gallons";
    coal: "kWh" | "tonnes" | "10kg" | "20kg" | "25kg" | "50kg";
    lpg: "kWh" | "litres" | "therms" | "gallons";
    propane: "litres" | "gallons";
    wood: "tonnes";
  };
}

export interface IPublicTransportFields {
  values: {
    bus: string;
    coach: string;
    localTrain: string;
    longTrain: string;
    tram: string;
    subway: string;
    taxi: string;
  };
  units: {
    bus: "km" | "mi";
    coach: "km" | "mi";
    localTrain: "km" | "mi";
    longTrain: "km" | "mi";
    tram: "km" | "mi";
    subway: "km" | "mi";
    taxi: "km" | "mi";
  };
}

export interface ISecondaryFields {
  values: {
    food: string;
    pharmacy: string;
    clothes: string;
    paper: string;
    computer: string;
    tv: string;
    motor: string;
    furniture: string;
    restaurants: string;
    mobile: string;
    banking: string;
    insurance: string;
    education: string;
    recreational: string;
  };
  units: {
    food: "week" | "month" | "year";
    pharmacy: "week" | "month" | "year";
    clothes: "week" | "month" | "year";
    paper: "week" | "month" | "year";
    computer: "week" | "month" | "year";
    tv: "week" | "month" | "year";
    motor: "week" | "month" | "year";
    furniture: "week" | "month" | "year";
    restaurants: "week" | "month" | "year";
    mobile: "week" | "month" | "year";
    banking: "week" | "month" | "year";
    insurance: "week" | "month" | "year";
    education: "week" | "month" | "year";
    recreational: "week" | "month" | "year";
  };
}

export interface ICarFields {
  index: number;
  values: { mileage: string; efficiency: string };
  units: {
    mileage: "mi" | "km";
    efficiency: "mpg" | "l/100km" | "g/km";
    fuel: "petrol" | "diesel" | "lpg" | "cng";
  };
}
export interface IMotobikeFields {
  index: number;
  values: { mileage: string; efficiency: string };
  units: {
    mileage: "mi" | "km";
    efficiency: "mpg" | "l/100km" | "g/km";
    fuel: "petrol" | "diesel" | "lpg" | "cng";
  };
}

export interface IFlightFields {
  index: number;
  values: {
    mileage: string;
  };
  units: {
    mileage: "mi" | "km";
    class: "economy" | "business" | "first";
    roundTrip: "return" | "oneway";
  };
}
export interface IPeriodFields {
  country: string;
  household: number;
  from: string;
  to: string;
}

interface ICalculator {
  t: (text: string) => string;
}

const Calculator = ({ t }: ICalculator) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [periodFields, setPeriodFields] = useState<IPeriodFields>({
    country: "gb",
    household: 1,
    from: DateManager.addYear(new Date(), -1),
    to: DateManager.convertDate(new Date()),
  });
  const [carbonAmount, setCarbonAmount] = useState<ICarbonAmount>({
    energy: 0,
    publicTransport: 0,
    secondary: 0,
    car: 0,
    motobike: 0,
    flight: 0,
  });
  const [energyFields, setEnergyFields] = useState<IEnergyFields>({
    values: {
      electric: "",
      gas: "",
      oil: "",
      coal: "",
      lpg: "",
      propane: "",
      wood: "",
    },
    units: {
      electric: "0.2532",
      gas: "kWh",
      oil: "litres",
      coal: "tonnes",
      lpg: "litres",
      propane: "litres",
      wood: "tonnes",
    },
  });
  const [
    publicTransportFields,
    setPublicTransportFields,
  ] = useState<IPublicTransportFields>({
    values: {
      bus: "",
      coach: "",
      localTrain: "",
      longTrain: "",
      tram: "",
      subway: "",
      taxi: "",
    },
    units: {
      bus: "mi",
      coach: "mi",
      localTrain: "mi",
      longTrain: "mi",
      tram: "mi",
      subway: "mi",
      taxi: "mi",
    },
  });
  const [secondaryFields, setSecondaryFields] = useState<ISecondaryFields>({
    values: {
      food: "",
      pharmacy: "",
      clothes: "",
      paper: "",
      computer: "",
      tv: "",
      motor: "",
      furniture: "",
      restaurants: "",
      mobile: "",
      banking: "",
      insurance: "",
      education: "",
      recreational: "",
    },
    units: {
      food: "year",
      pharmacy: "year",
      clothes: "year",
      paper: "year",
      computer: "year",
      tv: "year",
      motor: "year",
      furniture: "year",
      restaurants: "year",
      mobile: "year",
      banking: "year",
      insurance: "year",
      education: "year",
      recreational: "year",
    },
  });
  const [carList, setCarList] = useState<ICarFields[]>([]);
  const [carFields, setCarFields] = useState<ICarFields>({
    index: 0,
    values: { mileage: "", efficiency: "" },
    units: {
      mileage: "mi",
      efficiency: "mpg",
      fuel: "petrol",
    },
  });
  const [motobikeList, setMotobikeList] = useState<IMotobikeFields[]>([]);
  const [motobikeFields, setMotobikeFields] = useState<IMotobikeFields>({
    index: 0,
    values: { mileage: "", efficiency: "" },
    units: {
      mileage: "mi",
      efficiency: "mpg",
      fuel: "petrol",
    },
  });
  const [flightList, setFlightList] = useState<IFlightFields[]>([]);
  const [flightFields, setFlightFields] = useState<IFlightFields>({
    index: 0,
    values: {
      mileage: "",
    },
    units: {
      mileage: "mi",
      class: "economy",
      roundTrip: "oneway",
    },
  });
  const panes = [
    {
      menuItem: t("details"),
      render: () => (
        <Tab.Pane attached={false}>
          <Period
            periodFields={periodFields}
            setPeriodFields={setPeriodFields}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("energy"),
      render: () => (
        <Tab.Pane attached={false}>
          <Energy
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            energyFields={energyFields}
            setEnergyFields={setEnergyFields}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("flights"),
      render: () => (
        <Tab.Pane attached={false}>
          <Flight
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            flightFields={flightFields}
            setFlightFields={setFlightFields}
            setFlightList={setFlightList}
            flightList={flightList}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("cars"),
      render: () => (
        <Tab.Pane attached={false}>
          <Car
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            carFields={carFields}
            setCarFields={setCarFields}
            setCarList={setCarList}
            carList={carList}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("motobikes"),
      render: () => (
        <Tab.Pane attached={false}>
          <Motobike
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            motobikeFields={motobikeFields}
            setMotobikeFields={setMotobikeFields}
            setMotobikeList={setMotobikeList}
            motobikeList={motobikeList}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("bus"),
      render: () => (
        <Tab.Pane attached={false}>
          <PublicTransport
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            setPublicTransportFields={setPublicTransportFields}
            publicTransportFields={publicTransportFields}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t("secondary"),
      render: () => (
        <Tab.Pane attached={false}>
          <Secondary
            carbonAmount={carbonAmount}
            setCarbonAmount={setCarbonAmount}
            setSecondaryFields={setSecondaryFields}
            secondaryFields={secondaryFields}
          />
        </Tab.Pane>
      ),
    },
  ];
  const onSubmit = async () => {
    if (activeIndex < panes.length - 1) {
      setActiveIndex((prevState) => prevState + 1);
    } else {
      const { data } = await axios.post("/api/footprints/create-footprint", {
        ...carbonAmount,
        ...periodFields,
      });
      router.push(`/myfootprints/${data.id}`);
    }
  };
  return (
    <Div>
      <FormCard>
        <FormBody>
          <Form onSubmit={onSubmit}>
            <Tab
              activeIndex={activeIndex}
              menu={{
                secondary: true,
                pointing: true,
                onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const index = panes.findIndex(
                    (pane) => pane.menuItem === e.target.innerText
                  );
                  setActiveIndex(index);
                },
                style: {
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                },
              }}
              panes={panes}
            />
            {periodFields.from === "" && activeIndex === panes.length - 1 && (
              <ErrorMessage>From date is a required field</ErrorMessage>
            )}
            {periodFields.to === "" && activeIndex === panes.length - 1 && (
              <ErrorMessage>To date is a required field</ErrorMessage>
            )}
            <div style={{ marginTop: "10px" }}>
              <Button
                primary
                type="button"
                onClick={() => {
                  activeIndex > 0 &&
                    setActiveIndex((prevState) => prevState - 1);
                }}
                disabled={activeIndex === 0}
              >
                <Icon name="angle double left" />
                {t("back")}
              </Button>
              <Button
                primary
                floated="right"
                type="submit"
                disabled={
                  activeIndex === panes.length - 1 &&
                  (periodFields.to === "" || periodFields.from === "")
                }
              >
                {activeIndex === panes.length - 1 ? t("submit") : t("next")}
                <Icon name="angle double right" />
              </Button>
            </div>
          </Form>
        </FormBody>
      </FormCard>
    </Div>
  );
};

Calculator.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("calculator")(Calculator);

import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { getRandomColor } from "../utils/randomColor";
import { IFootprint } from "../Types/IFootprint";
import { EmissionManager } from "../utils/emission-manager";
import { Header } from "semantic-ui-react";
import { withTranslation } from "next-i18next";

interface DoughnutChartProps {
  footprint: IFootprint;
  t: (text: string) => string;
}

const DoughnutChart = ({ footprint, t }: DoughnutChartProps) => {
  const emission = new EmissionManager(footprint);
  const colors = Object.keys(emission.emissionObject()).map(() => {
    return getRandomColor();
  });

  const labels = Object.keys(emission.emissionObject()).map((key) => {
    return t(key);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: Object.values(emission.emissionObject()),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  return (
    <>
      <Header as="h3" textAlign="center">
        {emission.pesronEmission().toFixed(2)} CO2e
      </Header>
      <Doughnut data={data} />
    </>
  );
};

DoughnutChart.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("chart")(DoughnutChart);

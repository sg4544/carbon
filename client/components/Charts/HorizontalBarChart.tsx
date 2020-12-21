import { HorizontalBar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { IFootprint } from "../Types/IFootprint";
import { EmissionManager } from "../utils/emission-manager";
import { getRandomColor } from "../utils/randomColor";
import { withTranslation } from "next-i18next";

interface HorizontalBarChartProps {
  footprint: IFootprint;
  t: (text: string) => string;
}

const HorizontalBarChart = ({ footprint, t }: HorizontalBarChartProps) => {
  const emission = new EmissionManager(footprint);
  let pesronEmission = emission.pesronEmission();
  pesronEmission = Math.round((pesronEmission + Number.EPSILON) * 100) / 100;
  const data = {
    labels: [t("footprint"), t("uk"), t("eu"), t("world"), t("target")],
    datasets: [
      {
        label: t("comparison"),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
        hoverBackgroundColor: getRandomColor(),
        hoverBorderColor: getRandomColor(),
        data: [pesronEmission, 6.5, 6.4, 5.0, 2, 0],
      },
    ],
  };
  return (
    <>
      <HorizontalBar data={data} />
    </>
  );
};

HorizontalBarChart.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("chart")(HorizontalBarChart);

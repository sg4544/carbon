import { Doughnut } from "react-chartjs-2";
import { HorizontalBar } from "react-chartjs-2";
import { Divider, Header, Segment } from "semantic-ui-react";
import DoughnutChart from "../Charts/DoughnutChart";
import HorizontalBarChart from "../Charts/HorizontalBarChart";
import { IFootprint } from "../Types/IFootprint";

interface IFootprintChartsProps {
  footprint: IFootprint;
}

const FootprintCharts = ({ footprint }: IFootprintChartsProps) => {
  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <Segment>
        <DoughnutChart footprint={footprint} />
        <Divider section />
        <HorizontalBarChart footprint={footprint} />
      </Segment>
    </div>
  );
};
export default FootprintCharts;

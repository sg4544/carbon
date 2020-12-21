import SVGIcon from "../Icons/SVGIcon";
import PageCard from "../PageCard";
import styled from "styled-components";

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Brand = () => {
  return (
    <PageCard isTextCentered>
      <SVGIcon name="footprint" width={100} fill={"grey"} />
      <Title>Carbon Footprint</Title>
    </PageCard>
  );
};

export default Brand;

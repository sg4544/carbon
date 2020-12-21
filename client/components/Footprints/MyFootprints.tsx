import { Router, useRouter } from "next/router";
import { List, Statistic, Button } from "semantic-ui-react";
import styled from "styled-components";
import { IFootprint } from "../Types/IFootprint";
import { DateManager } from "../utils/date-manager";
import { EmissionManager } from "../utils/emission-manager";

const Div = styled.div`
  max-width: 750px;
  margin: auto;
  border: 1px solid grey;
  border-radius: 7px;
  padding: 15px;
`;
interface IMyFootprintsProps {
  footprintList: IFootprint[];
}

const MyFootprints = ({ footprintList }: IMyFootprintsProps) => {
  const router = useRouter();
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Footprint History</h2>
      <Div>
        <List divided relaxed>
          {footprintList.map((footprint, index) => {
            const emission = new EmissionManager(footprint);
            return (
              <List.Item key={footprint.id}>
                <List.Icon>
                  <Statistic value={index + 1} size="tiny" />
                </List.Icon>
                <List.Content>
                  <List.Header>
                    <Statistic
                      color="red"
                      value={emission.annualPersonEmission().toFixed(2)}
                      label="mtu"
                      size="mini"
                    />
                  </List.Header>
                  <List.Description>
                    created at:{" "}
                    {DateManager.convertDate(new Date(footprint.createdAt))}
                  </List.Description>
                  <List.Description style={{ marginTop: "15px" }}>
                    Your footprint in {emission.daysPeriod()} days from{" "}
                    {DateManager.convertDate(new Date(footprint.from))} to{" "}
                    {DateManager.convertDate(new Date(footprint.to))} is{" "}
                    {emission.pesronEmission().toFixed(2)} mtu, which equates to{" "}
                    {emission.annualPersonEmission().toFixed(2)} metric tons per
                    year.
                  </List.Description>
                </List.Content>
                <Button
                  primary
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    marginBottom: "5px",
                  }}
                  onClick={() => {
                    router.push(`/myfootprints/${footprint.id}`);
                  }}
                >
                  Details
                </Button>
              </List.Item>
            );
          })}
        </List>
      </Div>
    </>
  );
};

export default MyFootprints;

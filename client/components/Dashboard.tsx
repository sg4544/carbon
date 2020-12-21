import { Icon, Segment, Grid, Header } from "semantic-ui-react";
import styled from "styled-components";
import Avatar from "react-avatar";
import { useAuthContext } from "./context/AuthContext";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const Div = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 15px;
`;

interface IDashBoardProps {
  t: (text: string) => void;
}

const Dashboard = ({ t }: IDashBoardProps) => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  return (
    <Div>
      <Grid columns="equal">
        <Grid.Row centered style={{ marginBottom: "5vh" }}>
          <div>
            <Avatar
              name={currentUser.name}
              size="80"
              round="50%"
              textSizeRatio={1.55}
            />
            <h4>
              {t("welcome")} {currentUser.name}
            </h4>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            <Segment
              textAlign="center"
              style={{ backgroundColor: "#75ad75", cursor: "pointer" }}
              onClick={() => {
                router.push("/calculator");
              }}
            >
              <Header icon>
                <Icon name="calculator" />
                {t("calculator")}
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            <Segment
              textAlign="center"
              style={{ backgroundColor: "#7b7bc7", cursor: "pointer" }}
              onClick={() => {
                router.push("/myfootprints");
              }}
            >
              <Header icon>
                <Icon name="history" />
                {t("history")}
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            <Segment textAlign="center" style={{ backgroundColor: "#e0c490" }}>
              <Header icon>
                <Icon name="user" />
                {t("profile")}
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column
            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            <Segment textAlign="center" style={{ backgroundColor: "#dcbebe" }}>
              <Header icon>
                <Icon name="setting" />
                {t("settings")}
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Div>
  );
};

Dashboard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("dashboard")(Dashboard);

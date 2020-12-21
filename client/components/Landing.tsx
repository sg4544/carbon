import { Card, Button, Image } from "semantic-ui-react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingPage = () => (
  <Div>
    <div style={{ maxWidth: "500px", padding: "10px" }}>
      <Card style={{ width: "100%" }}>
        <Image
          src={`https://images.unsplash.com/photo-1589987599292-aacb9c4d357c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header as="h3" textAlign="center" style={{ margin: "20px" }}>
            Welcome
          </Card.Header>
          <Card.Description style={{ margin: "20px" }} textAlign="center">
            We are happy to see you again!
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <a href="/signin">
            <Button color="grey" style={{ width: "100%" }}>
              Sign in
            </Button>
          </a>
          <p style={{ margin: "20px" }}>
            Don't have an account? <a href="/signup"> Sign up here</a>
          </p>
        </Card.Content>
      </Card>
    </div>
  </Div>
);
export default LandingPage;

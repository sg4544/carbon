import { FunctionComponent } from "react";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar";
import { useAuthContext } from "../../components/context/AuthContext";

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
// justify-content: center;
// align-items: center;

const Layout: FunctionComponent = ({ children }) => {
  const { currentUser, signout } = useAuthContext();
  const leftItems = !currentUser
    ? []
    : [
        { href: "/", as: "a", content: "Home", key: "home" },
        { href: "/dashboard", as: "a", content: "Dashboard", key: "dashboard" },
      ];
  const rightItems = !currentUser
    ? [
        { href: "/signin", as: "a", content: "Login", key: "login" },
        { href: "/signup", as: "a", content: "Register", key: "register" },
      ]
    : [
        {
          onClick: () => {
            signout();
          },
          href: "",
          as: "div",
          content: "Logout",
          key: "logout",
          style: { cursor: "pointer" },
        },
      ];
  return (
    <AppWrapper>
      <NavBar leftItems={leftItems} rightItems={rightItems} color="grey">
        {children}
      </NavBar>
    </AppWrapper>
  );
};

export default Layout;

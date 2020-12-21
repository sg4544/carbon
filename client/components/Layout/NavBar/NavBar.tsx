import React, { useState, FunctionComponent, CSSProperties } from "react";
import {
  Container,
  Radio,
  Responsive,
  SemanticCOLORS,
} from "semantic-ui-react";
import styled from "styled-components";
import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";
import { i18n } from "../../../i18n";

const ChildrenContainerDesktop = styled(Container)`
  margin-top: 5em;
`;
const ChildrenContainerMobile = styled.div`
  margin-top: 5em;
  margin-left: -0.6em;
  margin-right: -0.6em;
`;

export interface IItem {
  href: string;
  as: string;
  content: string;
  key: string;
  onClick?: () => void;
  style?: CSSProperties;
}

interface INavBar {
  leftItems: IItem[];
  rightItems: IItem[];
  color?: SemanticCOLORS;
}

const NavBar: FunctionComponent<INavBar> = ({
  children,
  leftItems,
  rightItems,
  color,
}) => {
  const [visible, setVisible] = useState(false);

  const handlePusher = () => {
    if (visible) setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);

  return (
    <React.Fragment>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
          color={color}
        >
          <ChildrenContainerMobile>{children}</ChildrenContainerMobile>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop
          leftItems={leftItems}
          rightItems={rightItems}
          color={color}
        />
        <ChildrenContainerDesktop>{children}</ChildrenContainerDesktop>
      </Responsive>
    </React.Fragment>
  );
};

export default NavBar;

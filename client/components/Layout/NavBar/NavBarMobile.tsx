import React, { FunctionComponent } from "react";
import {
  Icon,
  Menu,
  Sidebar,
  Segment,
  SemanticCOLORS,
  Flag,
} from "semantic-ui-react";
import { i18n } from "../../../i18n";
import SVGIcon from "../../Icons/SVGIcon";
import { IItem } from "./NavBar";

interface INavBarMobile {
  leftItems: IItem[];
  rightItems: IItem[];
  onPusherClick: () => void;
  onToggle: () => void;
  visible: boolean;
  color?: SemanticCOLORS;
}

const NavBarMobile: FunctionComponent<INavBarMobile> = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
  color,
}) => {
  return (
    <Sidebar.Pushable
      as={Segment}
      style={{
        boxShadow: "none",
        border: "0",
      }}
    >
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={visible}
        style={{
          minWidth: "45vw",
        }}
        color={color}
        direction="right"
      >
        <Menu.Item style={{ padding: "5px" }}>
          <span>
            <SVGIcon name="footprint" width={45} fill={"white"} />
            <div>Carbon Footprint</div>
          </span>
        </Menu.Item>
        {leftItems.map((item) => (
          <Menu.Item {...item} />
        ))}
        {rightItems.map((item) => (
          <Menu.Item {...item} />
        ))}
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted color={color}>
          <Menu.Item style={{ padding: "5px" }}>
            <SVGIcon name="footprint" width={45} fill={"white"} />
            <span>Carbon Footprint</span>
          </Menu.Item>
          <Menu.Item>
            <Flag
              name="gb"
              onClick={() => {
                i18n.changeLanguage("en");
              }}
            />
            <Flag
              name="cn"
              onClick={() => {
                i18n.changeLanguage("ch");
              }}
            />
          </Menu.Item>
          <Menu.Item onClick={onToggle} position="right">
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>
        <Segment basic>{children}</Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default NavBarMobile;

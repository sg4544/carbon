import { Menu } from "semantic-ui-react";
import SVGIcon from "../../Icons/SVGIcon";
import React, { FunctionComponent } from "react";
import { SemanticCOLORS } from "semantic-ui-react";
import { IItem } from "./NavBar";

interface INavBarDesktop {
  leftItems: IItem[];
  rightItems: IItem[];
  color?: SemanticCOLORS;
}

const NavBarDesktop: FunctionComponent<INavBarDesktop> = ({
  leftItems,
  rightItems,
  color,
}) => (
  <Menu fixed="top" color={color} inverted>
    <Menu.Item style={{ padding: "5px" }}>
      <SVGIcon name="footprint" width={45} fill={"white"} />
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
        Carbon Footprint
      </span>
    </Menu.Item>
    {leftItems.map((item) => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position="right">
      {rightItems.map((item) => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);
export default NavBarDesktop;

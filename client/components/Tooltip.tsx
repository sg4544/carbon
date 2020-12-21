import React from "react";
import { Icon, Popup } from "semantic-ui-react";

interface IToolTipProps {
  content: string;
  size?: "small" | "mini" | "tiny" | "large" | "huge";
  label?: string;
  position?:
    | "top left"
    | "top right"
    | "bottom right"
    | "bottom left"
    | "right center"
    | "left center"
    | "top center"
    | "bottom center";
}

const ToolTip = ({
  content,
  size = "small",
  label,
  position,
}: IToolTipProps) => (
  <div style={{ display: "inline" }}>
    <span>
      <Popup
        size={size}
        content={content}
        position={position}
        trigger={<Icon name="info circle" />}
      />
    </span>
    <span
      style={{ marginLeft: "5px", fontWeight: 700, fontSize: ".92857143em" }}
    >
      {label}
    </span>
  </div>
);

export default ToolTip;

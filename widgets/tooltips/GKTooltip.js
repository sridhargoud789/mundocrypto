// import node module libraries
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

// import tippy tooltip
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";

const GKTooltip = ({
  children,
  toolTipText,
  placement,
  className,
  href = "#",
}) => {
  const ToolTipChildren = React.forwardRef((props, ref) => {
    return (
      <Link href={props.href}>
        <a className={`cursor-pointer ${className}`} ref={ref}>
          {children}
        </a>
      </Link>
    );
  });
  return (
    <Tippy content={toolTipText} animation={"scale"} placement={placement}>
      <ToolTipChildren href={href} />
    </Tippy>
  );
};

// Typechecking With PropTypes
GKTooltip.propTypes = {
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ]),
  toolTipText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

// Specifies the default values for props
GKTooltip.defaultProps = {
  placement: "top",
  toolTipText: "Tool Tip Text",
  href: "#",
};

export default GKTooltip;

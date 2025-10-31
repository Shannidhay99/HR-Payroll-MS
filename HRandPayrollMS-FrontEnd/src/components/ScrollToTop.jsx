import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ props, children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Fragment {...props}>{children}</Fragment>;
};

ScrollToTop.propTypes = {
  props: PropTypes.object,
  children: PropTypes.element,
};

export default ScrollToTop;

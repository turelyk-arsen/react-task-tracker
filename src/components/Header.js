import Button from "./Button";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  // const onClick = () => {
  //   console.log("click");
  // };
  return (
    <header className="header">
      {/* <h1>Hello From React</h1> */}
      <h1>{title}</h1>
      {/* <button className='btn'>Add</button> */}
      {location.pathname === '/' && <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

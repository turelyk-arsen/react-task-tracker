import Button from "./Button";

const Header = (props) => {
  const onClick = () => {
    console.log("click");
  };
  return (
    <header className="header">
      {/* <h1>Hello From React</h1> */}
      <h1>{props.title}</h1>
      {/* <button className='btn'>Add</button> */}
      <Button color="green" text="Add" onClick={onClick} />
    </header>
  );
};

export default Header;

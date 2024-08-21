const Button = ({ children, onClick, red, classN }) => {
  return (
    <button
      className={`button ${red ? " red" : ""} ${!classN ? "open-app" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

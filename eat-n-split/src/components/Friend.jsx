import Button from "./Button";

const Friend = ({ friend, showSplits, selectedFriend }) => {
  const { name, balance, image } = friend;

  const isSelected = friend?.id === selectedFriend?.id;

  return (
    <li className={`${isSelected ? "selected" : ""}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 ? (
        <p className="red2">
          You owe {name} {Math.abs(balance)}$
        </p>
      ) : balance === 0 ? (
        <p>You and {name} are even</p>
      ) : balance > 0 ? (
        <p className="green">
          {name} owes you {Math.abs(balance)}$
        </p>
      ) : (
        ""
      )}
      <Button onClick={() => showSplits(friend)}>
        {isSelected ? "Close" : "Selected"}
      </Button>
    </li>
  );
};

export default Friend;

import Button from "./Button";
import { useState } from "react";

const Split = ({ selectedFriend, onDeleteFriend, onUpdateBalance }) => {
  const { name } = selectedFriend;
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoisPaying, setWhoisPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paidByUser || !bill) {
      alert("todos los campos son obligatorios");
      return;
    }
    onUpdateBalance(whoisPaying === "user" ? paidByFriend : -paidByUser);
    console.log(paidByFriend);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    onDeleteFriend(selectedFriend);
  };
  return (
    <>
      <form action="" className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a BILL WITH {name}</h2>
        <label htmlFor="">💰Bill Value:</label>
        <input
          type="number"
          placeholder=""
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label htmlFor="">🧍‍♂️Your expense:</label>
        <input
          type="number"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByFriend
                : Number(e.target.value)
            )
          }
        />
        <label htmlFor="">👩🏻‍🤝‍🧑🏽{name}'s expense</label>
        <input type="number" disabled value={paidByFriend} />
        <label htmlFor="">💵Who is paying the Bill?</label>
        <select
          name=""
          id=""
          value={whoisPaying}
          onChange={(e) => setWhoisPaying(e.target.value)}
        >
          <option value="user">you</option>
          <option value="friend">{name}</option>
        </select>
        <div className="actions-bill">
          <Button>Split bill</Button>
          <Button red={"red"} onClick={handleDelete}>
            Delete Friend
          </Button>
        </div>
      </form>
    </>
  );
};

export default Split;

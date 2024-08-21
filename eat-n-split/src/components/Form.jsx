import Button from "./Button";
import { useState } from "react";
const Form = ({ onAddFriend }) => {
  const imagenURL = "https://i.pravatar.cc/48";
  const [friend, setFriend] = useState({
    name: "",
    image: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(friend).some((f) => f.trim() === "")) {
      return console.log("todos los campos son obligatorios");
    }
    const id = crypto.randomUUID();
    const newFriend = {
      ...friend,
      id,
      balance: 0,
      image: `${imagenURL}?=${id}`,
    };
    //const friendStorage = localStorage.getItem("friends");

    // console.log(newFriend);
    onAddFriend(newFriend);
    setFriend({
      name: "",
      image: "",
    });
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="nombre">👨🏾‍🤝‍👨🏼Friend name</label>
      <input
        type="text"
        name="name"
        value={friend.name}
        placeholder="Add Friend"
        onChange={(e) =>
          setFriend({
            ...friend,
            [e.target.name]: e.target.value,
          })
        }
      />
      <label htmlFor="imagen">🌆Image URL </label>
      <input
        type="text"
        placeholder="imagen..."
        name="image"
        value={friend.image}
        onChange={(e) =>
          setFriend({
            ...friend,
            [e.target.name]: e.target.value,
          })
        }
      />
      <Button>Add</Button>
    </form>
  );
};

export default Form;

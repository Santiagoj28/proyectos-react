import Form from "./components/Form";
import ListFriend from "./components/ListFriend";
import { useState, useEffect } from "react";
import Split from "./components/Split";
import Button from "./components/Button";

function App() {
  const getFriends = JSON.parse(localStorage.getItem("friends"));
  if (!getFriends) {
    localStorage.setItem("friends", JSON.stringify(friends));
  }

  useEffect(() => {
    const cargarStorage = () => {
      localStorage.setItem("friends", JSON.stringify(friends));
    };

    cargarStorage();
  });

  const [addFriend, setAddFriend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(getFriends);
  const [selectedFriend, setSelectedFriends] = useState(null);

  const handleAddFriend = async (friend) => {
    setFriends((friends) => [...friends, friend]);
    addStorage(friends);
  };

  const addStorage = (friends) => {
    localStorage.setItem("friends", JSON.stringify(friends));
  };

  const handleSelected = (friend) => {
    setSelectedFriends((cur) => (cur?.id === friend.id ? null : friend));
    setAddFriend(false);
  };

  const handleDeleteFriend = (friend) => {
    setFriends((friends) =>
      friends.filter((friendss) => friendss.id !== friend.id)
    );
    setSelectedFriends(null);
  };
  const handleUpdateBalance = (value) => {
    setFriends((friends) =>
      friends.map((i) =>
        i.id === selectedFriend.id ? { ...i, balance: i.balance + value } : i
      )
    );
    setSelectedFriends(null);
  };

  return (
    <>
      <div className={`${!isOpen ? "open" : ""}`}>
        <h1 className="tittle">Split the bill with your friends</h1>
        <Button classN="open-app" onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? "Cerrar" : "Start splitting the bill with your friend"}
        </Button>
      </div>

      {isOpen && (
        <div className="app">
          <div className="sidebar card">
            <ListFriend
              friendList={friends}
              onHandleSelected={handleSelected}
              selectedFriend={selectedFriend}
            />

            {addFriend && <Form onAddFriend={handleAddFriend} />}

            <Button onClick={() => setAddFriend((add) => !add)}>
              {addFriend ? " Close" : "Add Friend"}
            </Button>
          </div>
          {selectedFriend && (
            <Split
              friend={friends}
              selectedFriend={selectedFriend}
              onDeleteFriend={handleDeleteFriend}
              onUpdateBalance={handleUpdateBalance}
              key={selectedFriend.id}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;

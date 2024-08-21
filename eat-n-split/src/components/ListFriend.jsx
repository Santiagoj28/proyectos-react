import Friend from "./Friend";

const ListFriend = ({
  friendList,
  onHandleSelected,
  selectedFriend,
  children,
}) => {
  return (
    <>
      <ul>
        {friendList.map((friends) => (
          <Friend
            friend={friends}
            key={friends.id}
            showSplits={onHandleSelected}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </>
  );
};

export default ListFriend;

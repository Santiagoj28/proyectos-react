const Item = ({ item, onDeleteItems, onCheck }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onCheck(item)}
      />
      <span className={item.packed ? "complete" : ""}>
        {item.quantity} {item.description}
      </span>
      <button className="x" onClick={() => onDeleteItems(item.id)}>
        &times;
      </button>
    </li>
  );
};

export default Item;

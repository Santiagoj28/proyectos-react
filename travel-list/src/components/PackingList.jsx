import Item from "./Item";
import { useState } from "react";
const PackingList = ({
  items,
  onDeleteItems,
  onCheck,
  onReset,
  statsTotal,
  order,
}) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  if (sortBy === "quantity-larger")
    sortedItems = items.slice().sort((a, b) => b.quantity - a.quantity);
  if (sortBy === "quantity-smaller")
    sortedItems = items.slice().sort((a, b) => a.quantity - b.quantity);

  return (
    <>
      <div className="list">
        {statsTotal === 0 ? (
          <p>You have no Items,add Items</p>
        ) : (
          <p>Your Items:</p>
        )}
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItems={onDeleteItems}
              onCheck={onCheck}
            />
          ))}
        </ul>
        <div className="actions">
          {statsTotal > 0 && (
            <>
              <select
                name=""
                id=""
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="input">Sort by input order</option>
                <option value="description">Sort by description</option>
                <option value="packed">Sort by packed status</option>
                <option value="quantity-larger">
                  Sort by larger quantity{" "}
                </option>
                <option value="quantity-smaller">
                  Sort by smaller quantity{" "}
                </option>
              </select>
              <button onClick={onReset}>Reset</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PackingList;

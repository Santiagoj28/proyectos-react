import Logo from "./components/Logo";
import Formulario from "./components/Formulario";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { useState } from "react";
function App() {
  const [items, setItems] = useState([]);

  //console.log(items);
  //levantar el estado
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((i) => i.id !== id));
  };

  const handleCheck = (id) => {
    setItems((items) =>
      items.map((i) => (i === id ? { ...i, packed: !i.packed } : i))
    );
  };
  const handleReset = () => {
    const confirm = window.confirm("Are you sure to delete them all? ");
    if (confirm) setItems([]);
  };
  const handleOrder = () => {
    setItems((items) =>
      items.sort((a, b) => {
        if (a.description > b.description) {
          return a + b;
        }
      })
    );
  };
  //derivar el estado
  const statsTotal = items.length;
  const statsComplete = items.reduce((acc, cur) => acc + cur.packed, 0);
  const statsPercentage = Math.round((statsComplete / statsTotal) * 100);

  return (
    <>
      <div className="app">
        <Logo />

        <Formulario onAddItems={handleAddItems} />

        <PackingList
          items={items}
          key={items.id}
          onDeleteItems={handleDeleteItem}
          onCheck={handleCheck}
          onReset={handleReset}
          statsTotal={statsTotal}
          order={handleOrder}
        />

        <Stats
          totalItems={statsTotal}
          packed={statsComplete}
          percentage={statsPercentage}
        />
      </div>
    </>
  );
}

export default App;

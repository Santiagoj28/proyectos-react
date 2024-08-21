const Stats = ({ totalItems, packed, percentage }) => {
  if (totalItems === 0)
    return (
      <footer className="stats">
        <p>Start adding some items to your packing list </p>{" "}
      </footer>
    );

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <>
          <em>You got everything! ready to go</em>
        </>
      ) : (
        <em>
          You have {totalItems} items on your list,and you already packed{" "}
          {packed}
          {"  "}
          {`(${percentage}%)`}
        </em>
      )}
    </footer>
  );
};

export default Stats;

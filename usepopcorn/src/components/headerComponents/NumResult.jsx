const numResults = ({ children }) => {
  return (
    <p className="num-results">
      Found <strong>{children.length}</strong> results
    </p>
  );
};

export default numResults;

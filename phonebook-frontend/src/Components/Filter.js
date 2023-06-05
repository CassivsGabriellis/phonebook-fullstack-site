const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Filter:{" "}
    <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

export default Filter;

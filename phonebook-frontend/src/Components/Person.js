const Person = ({ person, deletePerson }) => {
  const handleDelete = () => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      deletePerson(person.id);
    }
  };

  return (
    <li>
      {person.name} {person.number}
      {" "}<button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Person;

const mongoose = require("mongoose");

if (process.argv.length === 2) {
  console.log("Give a password, a name and a number as arguments!");
  process.exit(0);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://cassivsfullstack:${password}@cluster0.2dyrqn1.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneBookSchema);

if (process.argv.length === 3) {
  //console.log("Phonebook: ")
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log("Phonebook: " + `${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to Phonebook`);
    mongoose.connection.close();
  });
}

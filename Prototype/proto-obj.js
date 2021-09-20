const Person2 = {
    getPersonDetails() {
        return `${this.Name} ${this.Age}`;
    }
}

// #. All props and methods from the Person2 moves to protype
const newPerson = Object.create(Person2)
newPerson.Name = 'Libin';
newPerson.Age = 33;
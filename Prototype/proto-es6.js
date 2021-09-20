// # Class Person
class Person1 {
    constructor(name, age) {
        this.Name = name;
        this.Age = age;
    }

    // #. This method added to the protype
    getPersonDetails() {
        return `${this.Name} ${this.Age}`;
    }
}

// #. Class Employee extends with Person class
class Employee1 extends Person1 {
    constructor(name, age, id, salary) {
        // #. Call the base class constructor
        super(name, age);
        this.Id = id;
        this.Salary = salary;
    }

    // #. Override the base class method
    getPersonDetails() {
        // #. Call the base class method
        const personalDetails = super.getPersonDetails();
        return ` ${personalDetails} ${this.Id} ${this.Salary}`;
    }
}

const emp1 = new Employee1('Libin', 32, 100, 15000);
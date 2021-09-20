// #. Create a base class
function Person(name, age) {
    this.Name = name;
    this.Age = age;
}

// #. Add a method to prototype
Person.prototype.getPersonDetails = function() {
    return `${this.Name} ${this.Age}`;
}

function Employee(name, age, id, salary) {
    Person.call(this, name, age);
    this.Id = id;
    this.Salary = salary;
}

// #. Extend the class
Object.setPrototypeOf(Employee.prototype, Person.prototype);

// #. Override the base method
Employee.prototype.getPersonDeails = function() {
    // #. Call the base class method
    const personalDetails = Person.prototype.getPersonDetails.call(this);
    return ` ${personalDetails} ${this.Id} ${this.Salary}`;
}
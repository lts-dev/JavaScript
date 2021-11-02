// concept dynamic currying
// sum(1)(2)(3).... any number of params

function dynamicSum(a) {
    return function(b) {
       return b ? dynamicSum(a + b) : a;
    }
   }

dynamicSum(1)(2);

function fact(num) {
    return num > 1 ? num * fact(num - 1) : num
}

function superCache(fn) {
    const map = new Map();
    return function(args) {
        if (map.get(args)) {
            return map.get(args);
        }

        const result = fn(args);
        map.set(args, result);

        return result;
    }
}

const superFact = superCache(fact);

class Car {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

const ford = new Car('ford')

const tracer = new Proxy(ford, {
    set(obj, prop, value) {
        console.log(`${obj} - ${prop} - ${value}`);
        Reflect.set(...arguments);
    },
    get(obj, prop, receiver) {
        console.log(obj, prop, receiver);
        if (typeof obj[prop] === 'function') {
            return new Proxy(obj[prop], {
                apply(target, thisArg, argumentsList) {
                    console.log(target, thisArg, argumentsList);
                    return Reflect.apply(...arguments);
                }
            })
        } else {
            Reflect.get(...arguments); 
        }
    }    
})


const intercetor = {
    apply(target, thisArg, argumentsList) {
        console.log(`Calculate sum: ${argumentsList}`);    
        return Reflect.apply(...arguments);
      }
}

function sum() {
    return [...arguments].reduce((a,b) => a + b);
}

const sumInterCeptor = new Proxy(sum, intercetor);

const sProto = sum;
const sInterceptor = function() {
    console.log(`Calculate sum: ${[...arguments]}`);
    return sProto.apply(this, arguments);
}

sum = sInterceptor;
function reducer(iteratee, initialValue) {
    let accumaltor = initialValue;

    for(let i = 0; i < this.length; i++) {
        accumaltor = iteratee(accumaltor, this[i]);
    }

    return accumaltor;
}

Array.prototype.reducer = reducer;

function maps(iteratee) {
    const resultArray = [];
    for(let i = 0; i < this.length; i++) {
        const value = iteratee(this[i]);
        resultArray.push(value);
    }

    return resultArray;
}

Array.prototype.maps = maps;


function random() {
    const index =  Math.floor((Math.random() * this.length));
    return this[index];
}

Array.prototype.random = random;

function shuffle() {
    for (let i = 0; i < this.length; i++) {
        const newIndex = Math.floor((Math.random() * (i + 1)));
        const sItem = this[newIndex];
        this[newIndex] = this[i];
        this[i] = sItem;
    }

    return this;
}

Array.prototype.shuffle = shuffle;

function flats(){
    const doFlat = (arr) => {
        const flatArr = [];
        arr.forEach((value) => {
            if(Array.isArray(value)){
                flatArr.push(...doFlat(value));
            }
            else{
                flatArr.push(value);
            }
        });
        return flatArr;
    }

    return doFlat(this);
}

Array.prototype.flats = flats;


function arrayOf() {
    const params = Array.of(arguments);
    return params;
}

const obj = {
    a: 1,
    b: {
        c : 2,
        d: {
            e: 3
        }
    }
}

// shallow copy object
const cobj = {...obj};

const deepCopy = JSON.parse(JSON.stringify(cobj));

const map = new Map();

map.set(1, 'item 1');
map.set('1', 'item string 1');
map.set(10, 'item 10');

// get all hierarchies from an object
function propertiesToArray(obj) {
    const isObject = val => typeof val === 'object' && !Array.isArray(val);
    const addDelimiter = (a, b) => a ? `${a}.${b}` : b;

    const paths = (obj = {}, head = '') => {
        return Object.entries(obj)
            .reduce((product, [key, value]) => {
                let fullPath = addDelimiter(head, key);
                return isObject(value) ?
                    product.concat(paths(value, fullPath))
                    : product.concat(fullPath)
            }, []);
    }

    return paths(obj);
}
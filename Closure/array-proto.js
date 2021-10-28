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
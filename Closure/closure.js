function debounce(fn) {
    let timerId = null;
    return function(param) {
        clearInterval(timerId);
        timerId = setTimeout(() => {
            fn(param);
        }, 1000);         
    }

}

const call = (value) => console.log(value);
const debouncer = debounce(call, 1000);

(function(){
    for(let i = 0; i < 5; i++) {
        debouncer(i);
    }
})();

// sum(1)(2)(3) and sum(1,2,3)

function sum(v1) {
    let values = Array.prototype.slice.call(arguments) || [];    
    if (values.length === 3) {
        return values.reduce((c, p) => c + p, 0);
    }    

    return function(v2) {
        return function(v3) {
            return v1 + v2 + v3;
        }   
    }
}

function asyncFunc1(callback) {
    console.log('Started asyncFunc1');
    setTimeout(() => {
        console.log('Completed asyncFunc1');
        callback(1);
    }, 3000);
}

function asyncFunc2(callback) {
    console.log('Started asyncFunc2');
    setTimeout(() => {
        console.log('Completed asyncFunc2');
        callback(2);
    }, 2000);
}

function asyncFunc3(callback) {
    console.log('Started asyncFunc3');
    setTimeout(() => {
        console.log('Completed asyncFunc3');
        callback(3);
    }, 1000);
}

function callbackManager(asyncFuncs) {
    function nextFuncExecutor() {
        const nextAsyncFunc = asyncFuncs.shift();
        if (nextAsyncFunc && typeof nextAsyncFunc === 'function') {
            nextAsyncFunc(nextFuncExecutor);
        }
    }
    nextFuncExecutor();
}

// driver code
callbackManager([asyncFunc1, asyncFunc2, asyncFunc3]);

asyncParellel([asyncFunc1, asyncFunc2, asyncFunc3], result => console.log(result));

function asyncParellel(tasks, callback) {
    const results = [];
    const totalTasks = tasks.length;
    tasks.forEach(task => {
        task((result) => {
            results.push(result);
            if (results.length === totalTasks) {
                callback(results);
            }
        });
    });
}


async function f1() {
    return 1;
}

async function f2() {
    return 3;
}

async function f3() {
    return 3;
}

f1()
.then(f2)
.then(f3)
.catch(() => console.log('Error'));

// async function allPromise(tasks) {
//     const results = [];
//    // const a = await tasks[0]();
//     tasks.forEach(task => {
//         const op = await task;
//        // results.push(op);
//     });
// }

// allPromise([f1,f2,f3])
// .then((result) => console.log(result));

function* genId() {
    console.log('A');
    yield 1;
    console.log('B');
    yield 2;
    console.log('C');
    yield 3;
}

function callGen() {
    let gen = genId();
    return function() {
        const val = gen.next();
        if (val.done) {
            gen = genId();
        }
    }
}
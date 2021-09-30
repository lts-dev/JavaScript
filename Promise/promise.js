(() => {
    const log = console.log;
    const error = console.error;

    function GetData() {
        return new Promise((resolve, reject) => {
            const env = Math.floor(Math.random() * 11);
            if (env % 2 === 0) {
                setTimeout(() => {
                    resolve([1, 2, 3]);
                }, 10);
            } else {
                setTimeout(() => {
                    reject('Error');
                }, 20);
            }
        });
    }

    // #. promise chain
    GetData().then((data) => {
        log(data);
    }).then(() => {
        log('then is return promise always');
    }).then(() => {
        log('we can add any number of thenable methods with promise');
    }).catch((err) => {
        error(err);
    }).then(() => {
        log('this then is common for success and catch');
    }).finally(() => {
        log('All completed');
    }).then(() => {
        log('after finally');
    });


    const gData = GetData();
    const promise1 = Promise.resolve(3);
    const promise2 = 42;
    const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 're1');
    });

    const promises = [gData, promise1, promise2, promise3];

    Promise.all(promises).then((values) => {
        log(values);
    }).catch((err) => {
        error(err);
    });

    /**
     * It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully,
     * or you'd always like to know the result of each promise.
     * In comparison, the Promise returned by Promise.all() may be more appropriate if the tasks are dependent on each 
     * other / if you'd like to immediately reject upon any of them rejecting.
     */

    Promise.allSettled(promises).then((values) => {
        log(values);
    });


    /**
     * Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, 
     * returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill 
     * (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, 
     * a new subclass of Error that groups together individual errors.
     */
    Promise.any(promises).then((value) => console.log('any', value));

    /**
     * The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills 
     * or rejects, with the value or reason from that promise.
     */
    Promise.race(promises).then((value) => {
        console.log('race', value);
    });

    function resolved(result) {
        log('Resolved', result);
    }

    function rejected(result) {
        error(result);
    }


    /**
     * The Promise.reject() method returns a Promise object that is rejected with a given reason.
     */
    Promise.reject(new Error('reject')).then(resolved, rejected);

    /**
     * The Promise.resolve() method returns a Promise object that is resolved with a given value
     */
    Promise.resolve(55).then(resolved, rejected);

    // Async & Await
    // #. async return type is promise
    // #. await must be inside of an aync method
    async function AsyncData() {
        const data = await GetData();
        return data;
    }

    async function AsyncData1() {
        return GetData();
    }

    AsyncData().then((data) => {
        log('aync test', data);
    });

    AsyncData1().then((data) => {
        log('aync test 1', data);
    });
})();
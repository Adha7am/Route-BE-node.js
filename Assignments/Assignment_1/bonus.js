var createCounter = function(init) {
    let counter = init;

    return {
        increment(){
            return ++counter ;
        },
        decrement(){
            return --countergit ;
        },
        reset(){
            return counter = init;
        }
    }
}

let counter = createCounter(5)

console.log(counter.decrement());
console.log(counter.reset());
console.log(counter.increment());


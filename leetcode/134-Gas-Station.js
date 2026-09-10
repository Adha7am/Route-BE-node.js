gas =  [1, 2, 3, 4, 5];
cost = [3, 4, 5, 1, 2];
var canCompleteCircuit = function (gas, cost) {
    let totaltank = 0;
    let currtank = 0;
    let start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i]
        totaltank += diff;
        currtank += diff;

        if (currtank < 0) {
            currtank = 0;
            start = i + 1;
        }
    }
    return totaltank >= 0 ? start : -1;
};


console.log(
    canCompleteCircuit(gas, cost)
);

const { log } = require("console");

const arr = [2,3,4,7]
const k = 5;

let max = 0;
arr.map(
    (n) => {
        if(n > max){
            max = n;
        }     
    }
)

console.log("max : " + max);

let arrpos = [];
for (let i = 0; i < max; i++) {         
    arrpos[i] = max - i
}

console.log("positive numbers to check : "+ arrpos);

arr.forEach(
    (n, i) => {
        if(arrpos.includes(n))
        {
            arrpos.forEach(
                (m, j) => {
                    if(m === n){    
                        arrpos.splice(j,1)
                    }
                }
            )   
            
        }
    }
)

console.log(arrpos.reverse())

//----------------------------------------------------------------------------

// let arrpos = []; 
// let ontrack;
// let exists;

// for (let i = 0; i < arr.length; i++) {

//     ontrack = ( arr[i] == i+1);
//     exists = arr.includes(i+1);

//     if (!ontrack && !exists){

//         for (let j = i+1 ; j < arr[i]; j++) {
//            if (!arr.includes(j) && !arrpos.includes(j)) {
//              arrpos.push(j);
//            }
//         }
//     }
    
//     // if (!ontrack && arr[i] == arr.length) {
        
//     // }
   
// }
  
// console.log(arrpos);


//----------------------------------------------------------------------------

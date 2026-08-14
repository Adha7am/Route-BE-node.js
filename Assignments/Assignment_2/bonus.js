const { log } = require("console");

const myarr = [2,3,5,7,11,12]
const nnn = [1,2,3,4,5,6,7,8,9] // ==> 1,5,6,8
const k = 5;

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
// function findKthPositive(arr, k){
//     let lo = 0
//     let hi = myarr.length;
//     while (lo < hi){

//         mid = (lo + hi) // 2
//         missing = arr[mid] - (mid + 1)

//         if (missing < k){
//             lo = mid + 1
//         }else{
//             hi = mid
//         }
//     }
//      return lo + k
        
// }
// console.log(

//     findKthPositive(myarr, k)
// );

//----------------------------------------------------------------------------



// let max = 0;
// arr.map(
//     (n) => {
//         if(n > max){
//             max = n;
//         }     
//     }
// )

// console.log("max : "+max);

// let arrpos = [];
// for (let i = 0; i < max; i++) {         
//     arrpos[i] = max - i
// }

// console.log("positive numbers to check : "+arrpos);


// arr.forEach(
//     (n, i) => {
//         if(arrpos.includes(n))
//         {
//             arrpos.forEach(
//                 (m, j) => {
//                     if(m === n){    
//                         arrpos.splice(j,1)
//                     }
//                 }
//             )   
            
//         }
//     }
// )

// console.log(arrpos.reverse())
// console.log(arrpos[k-1]);



// function fn(arr, k){

// };


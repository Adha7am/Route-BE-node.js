//q1.
// let x = "123";
// console.log(Number(x) + 7);
//----------------------------------------------------------------------------

//q2.
// let x = 0;
// !x && console.log("Invalid");
//----------------------------------------------------------------------------

//q3.
// for (let i = 1; i <= 10; i++) {
//        if (i % 2 == 0) continue;
//        else console.log(i); 
// }
//----------------------------------------------------------------------------

//q4.
// let x = [1,2,3,4,5];
// console.log(x.filter( (n) => n % 2 ==  0 ));
//----------------------------------------------------------------------------

//q5.
// let arr1 = [1,2,3];
// let arr2 = [4,5,6];
// let arr3 = [...arr1, ...arr2];
// console.log(arr3);
//----------------------------------------------------------------------------

//q6.
// let x =6;
// switch (x) {
//     case 1:
//         console.log("monday");
//         break;
//     case 2:
//         console.log("tuesday");
//         break;
//     case 3:
//         console.log("wednesday");
//         break;
//     case 4:
//         console.log("thursday");
//         break;
//     case 5:
//         console.log("friday");
//         break;
//     case 6: 
//         console.log("saturday");
//         break;
//     case 7:
//         console.log("sunday");
//         break;
//     default:
//         console.log("Invalid day");
//         break;
// }
//----------------------------------------------------------------------------

//q7.
// let arr = ["a", "ab", "abc"];
// console.log(arr.map( (str) => str.length ));
//----------------------------------------------------------------------------

//q8.
// function getDivisibility(x){
//     x % 5 == 0
//         ? x % 3 == 0
//             ? console.log("divisible by both")
//             : console.log("divisible by 5")
//         : x % 3 == 0
//             ? console.log("divisible by 3")
//             : console.log('not divisible by 3 or 5');

// //ana asef :-)
// // wrote it cleaner here:
// // if (x % 3 === 0 && x % 5 === 0) {
// //         console.log("divisible by both");
// //     } else if (x % 5 === 0) {
// //         console.log("divisible by 5");
// //     } else if (x % 3 === 0) {
// //         console.log("divisible by 3");
// //     } else {
// //         console.log("Not divisible by 3 or 5");
// //     }
// } 
// getDivisibility(15);
//----------------------------------------------------------------------------

//q9.
// let power = (x) => console.log(x**2);
// power(2);
//----------------------------------------------------------------------------

//q10.
// const person = {name: 'John', age: 25}
// let {name, age} = person;
// console.log( name + " is "+ age +" years old");
//----------------------------------------------------------------------------

//q11:
// function sum(a, b, ...c){
//     let sum = 0;
//     for (let i = 0; i < c.length; i++) {
//         if (typeof c[i] !== "number") break;
//         sum += c[i]; 
//         console.log("loop");
//     }
//     console.log(sum + a + b);
// }
// sum(2,3,1,2,3);
//----------------------------------------------------------------------------

//q12.
// function checkSuccess(resolve, reject){
//     return new Promise( (resolve, reject) => {
//     if (false) {
//         return reject('fail');
//     }
//     else{
//         return resolve('success');
//     }
// })
// }

// checkSuccess()
//     .then( (v) => {
//         setTimeout( () => {
//             console.log(v) , 3000
//         } )
//     } ) 
//     .catch( (r)=> null )
//----------------------------------------------------------------------------

//q13.
// const arr = [1, 3, 7, 2, 4];
// function findMax(arr){
//     let max = arr[0];
//     for (let i = 0; i < arr.length; i++) {
//         arr[i] > max ? max = arr[i] : max ;
//     }
//     console.log(max);
// }
// findMax(arr);
//----------------------------------------------------------------------------

//q14.
// const person = {name: "John", age: 30}
// function getKeys(obj){
//     return console.log(Object.keys(obj));
// }
// getKeys(person)
//----------------------------------------------------------------------------

//q15.
// let sentence = "The quick brown fox"; 
// function mySplit(str){
//     return console.log(sentence.split(' '));
// }
// mySplit(sentence)
//----------------------------------------------------------------------------

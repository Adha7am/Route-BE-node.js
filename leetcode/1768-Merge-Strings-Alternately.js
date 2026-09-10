let word1 = "abc";
let word2 = "pq"

let final = "";
let long;

if (word1.length > word2.length) {
     long = word1
} else if (word2.length > word1.length) {
     long = word2
}

for (let i = 0; i < long.length; i++) {
    if (word1[i] && word2[i]) {
        final += word1[i];
        final += word2[i];
    } else {
        final += long[i]
    }
}

console.log(
    final
);

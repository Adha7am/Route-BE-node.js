// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters if it is non-empty.

// const arr = ["flower", "flow", "flight"]
const arr = ["dog", "car", "racer"]
let prefix = "";


function findPrefix(arr) {
    if (arr.length === 0) return "";

    let prefix = arr[0];

    for (let i = 0; i < arr.length; i++) {

        while (!arr[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
            if (!prefix) return "";
        }
    }
    return prefix
}
findPrefix(arr)
console.log("OutPut : \"" + prefix + "\"");
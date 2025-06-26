//1
function countUnique(arr) {
    return new Set(arr).size;
}


console.log(countUnique([1,2,2,3,3,3])); 
console.log(countUnique([4,4,4,4,4,4])); 
//2
function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

console.log(capitalizeWords("salom dunyo"));
console.log(capitalizeWords("men dasturchiman"));
//3
function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}   
console.log(isPalindrome("level")); // true
console.log(isPalindrome("hello")); // false
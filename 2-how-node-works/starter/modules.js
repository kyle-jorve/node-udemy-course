// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const Calc1 = require("./test-module-1");
const calc1 = new Calc1();

console.log(calc1.add(6, 2));
console.log(calc1.multiply(6, 2));
console.log(calc1.divide(6, 2));

console.log("------------------------");

// exports
const { add, multiply, divide } = require("./test-module-2");

console.log(add(6, 2));
console.log(multiply(6, 2));
console.log(divide(6, 2));

console.log("------------------------");

// caching
// the console log in the module file will only run once, due to caching
// the export, however, will run thrice
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();

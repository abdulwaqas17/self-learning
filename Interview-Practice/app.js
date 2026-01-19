// // // // // console.log('====================================');
// // // // // console.log('hello world');
// // // // // console.log('====================================');

// // // // // // function outer() {
// // // // // //   let name = "Ali";
  
// // // // // //   function inner() {
// // // // // //     console.log("Hello " + name);
// // // // // //     return "Hello " + name;
// // // // // //   }
  
// // // // // //   return inner;
// // // // // // }

// // // // // // const greet = outer(); // outer() execute hua
// // // // // // var inner = greet(); // "Hello Ali"

// // // // // // console.log(inner);

// // // // // // function greet(name, callback) {
// // // // // //     callback();
// // // // // //   console.log("Hello " + name);
// // // // // // }

// // // // // // function bye() {
// // // // // //   console.log("Goodbye!");
// // // // // // }

// // // // // // greet("Ali", bye);



// // // // // // let a = 5;
// // // // // // let b = 10;

// // // // // // let temp = a;
// // // // // // a = b;
// // // // // // b = temp;

// // // // // // console.log("a:", a);
// // // // // // console.log("b:", b);

// // // // // // let a = 5, b = 10;
// // // // // // console.log("a:", a);
// // // // // // console.log("b:", b);
// // // // // // [a, b] = [b, a];
// // // // // // console.log(a, b); // 10 5

// // // // // let user = { name: "Ali", age: 22, city: "Lahore" };

// // // // // for (let key in user) {
// // // // //   console.log(key, user[key]);
// // // // // }


// // // // // Object.keys(user).forEach(key => {
// // // // //   console.log(key, user[key]);
// // // // // });


// // // // // for (let [key, value] of Object.entries(user)) {
// // // // //   console.log(key, value);
// // // // // }










// // // // // IIV Interview

// // // // function counter() {
// // // //   let count = 0;
// // // //   console.log("parent count",count);
  

// // // //   return function () {
// // // //     count++;
// // // //     console.log("child count",count);
// // // //   };
// // // // }

// // // // const inc = counter(); // matlber inc m inner funciton store ho gia aur wohi call hway ja rha h

// // // // inc(); // 1
// // // // inc(); // 2
// // // // inc(); // 3

// // // // const obj = {
// // // //   name: "Ali",
// // // //   fn: () => console.log(this)
// // // // };

// // // // obj.fn(); // ❌ window — object nahi

// // // // console.log('====================================');
// // // // console.log(3 ** 3);
// // // // console.log('====================================');





// // // // Invention and innovation Interview

// // // // var b = 10;
// // // // let a = 10;

// // // // function test() {
// // // //    b = 20;
// // // //    a = 20; 
// // // //   console.log("Inside function - a:", a); // 20
// // // //   console.log("Inside function - b:", b); // 20
// // // // }

// // // // test();

// // // // console.log("Outside function - a:", a); 
// // // // console.log("Outside function - b:", b); 


// // // // if(1) {
// // // //   console.log("hye");
// // // // }else{
// // // //   console.log("bye");
// // // // }

// // // const user = {
// // //   name: "Waqas",
// // //   address: { city: "Lahore" }
// // // };

// // // const copyUser = { ...user }; // Shallow copy

// // // copyUser.address.city = "Karachi";
// // // copyUser.name = "Ali";

// // // console.log(copyUser);
// // // console.log(user.name);

// // // console.log(user.address.city); // "Karachi" — original bhi change hogaya

// const user = { name: "Waqas", age: 22 };

// const { age, name } = user;

// console.log(name); // Waqas
// console.log(age);  // 22



// // const cloneUser = structuredClone(user);

// // cloneUser.address.city = "Karachi";

// // console.log(user.address.city); // "Lahore" — original safe hai
// // console.log(cloneUser); // "Karachi" — clone change hua hai
// // console.log(user); // "Karachi" — clone change hua hai


// // const user = "Waqas";

// // const [a, b] = user;  
// // console.log(a, b);


// // const arr = [10, 20];

// // const { length } = arr;

// // console.log(length);

// const arr1 = ["Ali", "Waqas"];

// const {   as,abs } = arr1;

// console.log(as, abs);

// const user = { name: "Waqas", age: 22, city: "Lahore" };
// console.log({...user});
// console.log(...user); // error in console
// console.log([...user]);


// var arr1 = [1, 2,'a',9];
// const newArr = {...arr1};
// const newArr2 = [...arr1];
// console.log(newArr);
// console.log(newArr2);


// const { name,city, ...others } = user;


// console.log(name,city);   // Waqas
// console.log(others); // { age:22, city:"Lahore" }

// const arr2 = [[...arr1], 3, 4];
// console.log(arr2); // [1, 2, 3, 4]
// console.log(...arr1);
// console.log([...arr1]);

// const nums = ...arr1;




// ------------------- SWAP VARIABLES -------------------
// var a =10 ;
// var b = 20;
// const arr = [b,a];
// var [a,b] = arr;
// console.log(a,b);



// ---------------------- COPY/CLONE OBJECT --------------------
// const user = {
//   name: "Waqas",
//   address: { city: "Lahore" }
// };

// const copyUser = JSON.parse(JSON.stringify(user));
// copyUser.address.city = "Karachi";
// console.log(user);
// console.log(copyUser);


// ---------------------- DESTRUCTURING -----------------------
// const numbers = [1, [2, 3], 4];

// // Destructure
// const [first, [second, third], fourth] = numbers;

// console.log(first);  // 1
// console.log(second); // 2
// console.log(third);  // 3
// console.log(fourth); // 4

// const user = {
//   name: "Waqas",
//   address: {
//     city: "Lahore",
//     zip: 54000
//   }
// };

// // Destructure
// const { name,address  } = user;

// console.log(name);  // Waqas
// // console.log(address);
// console.log(city);  // Lahore
// console.log(zip);   // 54000


// ------------------- SPREAD/REST OPERATOR -------------------
// const obj1 = { a: 1, b: 2 };
// const obj2 = { key : {...obj1}, c: 3 };
// console.log(obj2); // { a:1, b:2, c:3 }


// // // /*
// // // copy clone
// // // destructuring
// // //   spread operator 
// // //   rest operator
// // //   useState
// //  dsa
// // // */


/*
Ok thanks brother, I understand
and stl ka environement ksa h, ager opportunity mili h to accept krni chahie ? 
*/









// ---------------------- Asychronous/Synchronous JavaScript -----------------------
// console.log('Start');
// setTimeout(() => {
//   console.log('Timeout 1');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Promise 1');
// });

// setTimeout(() => {
//   console.log('Timeout 2');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Promise 2');
// });

// console.log('End');

// Expected Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2

















// ---------------------- Junior Node.js Developer Interview Questions-----------------------
let name = "Waqas"; 
name[0] = "A";
console.log(name); // Waqas
  console.log(this);
console.log(y); // ReferenceError
let y = 10;

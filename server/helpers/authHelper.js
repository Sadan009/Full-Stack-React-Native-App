const bcrypt = require("bcrypt");

// Hash function

// using Promise:

// exports.hashPassword = (password) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) {
//         reject(err);
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(hash);
//       });
//     });
//   });
// };

// Async / Await
// exports.hashPassword = async (password) => {
//     try {
//         const genSalt = await genSalt()
//     } catch (error) {
//         console.log(error)
//     }
// };

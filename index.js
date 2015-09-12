var readline = require('readline');
import sendEmail from "./sendEmail";

let [,, email, ...subjectWords] = process.argv;
let subject = subjectWords.join(' ');

// var rl = readline.createInterface({
//   input: process.stdin
// });

// rl.question("", function(body) {
  let body = '- Sent from my cron';
  sendEmail({to: email, subject, body})
    .then(() => {
      console.log("Email sent");
      process.exit();
    })
    .catch((actualError) => {
      console.error("Email was NOT sent, try again");
      console.error(actualError);
      process.exit();
    });
// });

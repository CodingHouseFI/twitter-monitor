var readline = require('readline');
var exec = require('child_process').exec, child;

let [,, email, ...subjectWords] = process.argv;
let subject = subjectWords.join(' ');

var rl = readline.createInterface({
  input: process.stdin
});

rl.question("", function(body) {
  sendEmail({to: email, subject, body})
    .then(() => {
      console.log("Email sent");
      process.exit();
    })
    .catch(() => {
      console.error("Email was NOT sent, try again");
      process.exit();
    });
});

let sendEmail = ({to, subject, body}) => {
  let promise = new Promise((resolve, reject) => {
    child = exec(`
      curl -s --user '${process.env.MG_API_KEY}' \
        https://api.mailgun.net/v3/sandboxbf6ec8ad5ef74cca9eca5deca6326d4b.mailgun.org/messageszzz \
        -F from='Mailgun Sandbox <postmaster@sandboxbf6ec8ad5ef74cca9eca5deca6326d4b.mailgun.org>' \
        -F to='${email}'\
        -F subject='${subject}' \
        -F text='${body}'
    `,
      function (error, stdout, stderr) {
        if (error !== null) {
          reject();
        } else {
          resolve();
        }
    });
  });

  return promise;
};

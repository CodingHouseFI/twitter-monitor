var exec = require('child_process').exec, child;

export default ({to, subject, body}) => {
  let promise = new Promise((resolve, reject) => {
    child = exec(`
      curl -s --user '${process.env.MG_API_KEY}' \
        https://api.mailgun.net/v3/sandboxbf6ec8ad5ef74cca9eca5deca6326d4b.mailgun.org/messageszzz \
        -F from='Mailgun Sandbox <postmaster@sandboxbf6ec8ad5ef74cca9eca5deca6326d4b.mailgun.org>' \
        -F to='${to}'\
        -F subject='${subject}' \
        -F text='${body}'
    `,
      function (error, stdout, stderr) {
        if (error !== null) {
          reject(error);
        } else {
          resolve();
        }
    });
  });

  return promise;
};

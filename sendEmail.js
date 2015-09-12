var exec = require('child_process').exec, child;
import { Mailgun } from "mailgun";

let mg = new Mailgun(process.env.MG_API_KEY);

export default ({to, subject, body}) => {
  let promise = new Promise((resolve, reject) => {
    mg.sendText('postmaster@sandboxbf6ec8ad5ef74cca9eca5deca6326d4b.mailgun.org', to, subject, body, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return promise;
};

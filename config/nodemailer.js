const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "testali218", 
//       pass: "farhan98",
//     },
//   });


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'justyn.schiller57@ethereal.email',
      pass: '7WP8xTqcpFs5ay7BCn'
  }
});

  let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err) { console.log("error in rendering mailer Template"); return; }

            mailHTML = template;
        }
    )
    return mailHTML;
  }

  module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
  }
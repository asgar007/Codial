const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside the newComment mailer', comment);

    // nodeMailer.transporter.sendMail({
    //     from: 'testali218@gmail.com',
    //     to: comment.user.email,
    //     subject: "New Comment Published!",
    //     html: '<h1> Yup! your comment is published </h1>'
    // }, (err, info) => {
    //     if(err){ console.log('Error in Sending email', err); return }

    //     console.log("Message Sent", info)
    //     return;
    // });
    nodeMailer.transporter.sendMail({
        from: 'justyn.schiller57@ethereal.email', // sender address
        to: "testali218@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello Asgar?</b>", // html body
      });
}
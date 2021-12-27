import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = (to, subject, htmlContent) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "peaky.blinders.2404@gmail.com", // generated ethereal user
      pass: "Asasdasdf244", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let options = {
    from: "peaky.blinders.2404@gmail.com", // địa chỉ admin email bạn dùng để gửi
    to: to, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail

    html: htmlContent, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  };

  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options);
};

export default sendMail;

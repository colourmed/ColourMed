const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.placeOrder = async function(req, res, next) {
  try {
    const { subject, text } = await getEmailText(req);

    sendEmail(subject, text).then(() => {
      res.status(200).json({
        message: 'Success!'
      });
    });
  } catch (err) {
    return next(err);
  }
};

const getEmailText = async function(req) {
  const orderData = req.body;

  const { userData, items } = orderData;

  let formattedItems = '';
  let totalPrice = 0;

  items.forEach((item, index) => {
    const formattedColor = `
      <span style="background: ${item.colors[0]}; height: 15px; width: 15px; border: 1px solid #000000; display: inline-block" />
    `;

    formattedItems += `
    ${index + 1}.<br />
    ${item.title}<br />
    Culoare: ${formattedColor}<br />
    Model: ${item.patterns[0] ? item.patterns[0] : 'fără model'}<br />
    Marime: ${item.sizes[0]}<br />
    Pret: ${item.price}<br />
    Cantitate: ${item.quantity}<br />
    Imagine: ${item.images[0]}<br />
    Pentru: ${item.forMen ? 'Bărbați' : 'Femei'}<br />
    ------------------------------------<br /><br />
    `;

    totalPrice += item.price * item.quantity;
  });

  const mailText = `
    Nume: ${userData.firstName}<br />
    Prenume: ${userData.lastName}<br />
    Adresa: ${userData.address}<br />
    Nr. Telefon: ${userData.phoneNumber}<br />
    Email: ${userData.email}<br /><br />

    Pret Total: ${totalPrice} lei<br /><br />


    Produse:<br /><br />

    ${formattedItems}
  `;

  const date = new Date();
  const formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const mailSubject = `Comanda noua: ${formattedDate}`;

  return { subject: mailSubject, text: mailText };
};

const sendEmail = async function(subject, text) {
  const email = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.EMAIL,
    subject,
    html: text
  };

  return sendgrid.send(email);
};

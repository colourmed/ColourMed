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
    formattedItems += `
    ${index + 1}.
    ${item.title}
    Culoare: ${item.colors[0]}
    Model: ${item.patterns[0] ? item.patterns[0] : 'fără model'}
    Marime: ${item.sizes[0]}
    Pret: ${item.price}
    Cantitate: ${item.quantity}
    Imagine: ${item.images[0]}
    ${item.forMen ? 'Bărbați' : 'Femei'}
    ------------------------------------
    `;

    totalPrice += item.price * item.quantity;
  });

  const mailText = `
    Nume: ${userData.firstName}
    Prenume: ${userData.lastName}
    Adresa: ${userData.address}
    Nr. Telefon: ${userData.phoneNumber}
    Email: ${userData.email}

    Pret Total: ${totalPrice} lei


    Produse:

    ${formattedItems}
  `;

  const date = new Date();
  const formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const mailSubject = `Comanda noua: ${formattedDate}`;

  return { subject: mailSubject, text: mailText };
};

const sendEmail = async function(subject, text) {
  const email = {
    to: process.env.EMAIL,
    from: process.env.ADMIN_EMAIL,
    subject,
    text
  };

  try {
    return sendgrid.send(email);
  } catch (err) {
    return next(err);
  }
};

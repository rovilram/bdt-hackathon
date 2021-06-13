const axios = require('axios').default;

exports.mailboxlayer = async (email) => {
  const url = `http://apilayer.net/api/check?access_key=${process.env.MAILBOX_API}&email=${email}&smtp=1&format=1`;

  const response = await axios.get(url);

  return response.data.score;
};


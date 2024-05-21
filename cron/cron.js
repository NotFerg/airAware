const schedule = require('node-schedule');

schedule.scheduleJob('15 16 * * *', async function() {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${process.env.CHANNEL_ID}/feeds.json`, {
      params: {
        api_key: process.env.READ_API_KEY,
        results: 1 // Fetch only the most recent data point
      }
    });

    const data = response.data.feeds[0];
    const emailContent = `Latest data from ThingSpeak: ${JSON.stringify(data)}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail' or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Latest ThingSpeak Data',
      text: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error fetching data or sending email:', error);
  }
});
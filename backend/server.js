// Load environment variables
require('dotenv').config();

// Import necessary packages
const express = require('express');
const path = require('path');
const Groq = require('groq-sdk');
const nodemailer = require('nodemailer');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Initialize Groq SDK with your API key from the .env file
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// API endpoint to generate the summary
app.post('/generate-summary', async (req, res) => {
  const { transcript, prompt } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required.' });
  }

  const userPrompt = prompt || "Summarize the following meeting notes in a clear, concise manner.";
  const systemMessage = `You are a helpful assistant for summarizing meeting notes. Your task is to generate a structured summary based on the user's instructions.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage
        },
        {
          role: 'user',
          content: `Instructions: ${userPrompt}\n\nTranscript: ${transcript}`
        }
      ],
      model: 'llama3-8b-8192', // You can change this to another Groq model if you like
    });

    const summary = chatCompletion.choices[0]?.message?.content || "";
    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
});

// API endpoint to share the summary via email
app.post('/share-summary', async (req, res) => {
  const { recipients, summary } = req.body;

  if (!recipients || !summary) {
    return res.status(400).json({ error: 'Recipient and summary are required.' });
  }

  // Configure a Nodemailer transporter.
  // NOTE: For Gmail, you may need to use an "App Password"
  // instead of your regular password for security.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: recipients,
    subject: 'Meeting Summary',
    text: summary,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Summary sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
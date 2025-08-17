# AI Meeting Notes Summarizer & Sharer 📝

This is a full-stack web application that uses an AI model to summarize meeting notes or call transcripts. The generated summary can be edited and then shared via email with multiple recipients.

## Features

* **AI-Powered Summarization**: Uses the Groq API to generate structured summaries from raw text based on custom prompts.
* **Custom Prompts**: Allows users to input specific instructions (e.g., "Highlight action items only").
* **Editable Output**: The generated summary is fully editable by the user before sharing.
* **Email Sharing**: Sends the final summary to one or more email addresses.
* **Simple & Functional UI**: A clean, minimalistic frontend built with vanilla HTML, CSS, and JavaScript.

## Tech Stack

**Frontend:**
* **HTML5**
* **CSS3**
* **Vanilla JavaScript**

**Backend:**
* **Node.js**
* **Express.js**: A fast, unopinionated, minimalist web framework.
* **Groq SDK**: For interacting with the AI model.
* **Nodemailer**: For sending emails.
* **dotenv**: To manage environment variables securely.

## Deployment

The application is deployed on Render.com. The deployment configuration uses a a **Build Command** of `npm install` and a **Start Command** of `node server.js` within the `backend` root directory. All environment variables were added directly in the Render dashboard for security.

## License

This project is open-source and available under the MIT License.
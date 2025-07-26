# Inspiring Quotes Web App

![Quote App Screenshot](https://i.imgur.com/your-screenshot-url.png) <!-- Replace with a URL to a screenshot of your app -->

A dynamic and immersive web application that displays random inspirational quotes. This project was built to explore and master JavaScript Promises, asynchronous operations, and modern web APIs, including Google's Gemini for AI-powered explanations.

Live Demo:  https://rameezwangde.github.io/Quotes/


---

## ✨ Features

This application is packed with modern features designed to provide a rich user experience:

* **Dynamic Quote Fetching:** Fetches random quotes from an external API.
* **Promise-Based Caching:** Implements a client-side cache to instantly load the last fetched quote, avoiding unnecessary network requests.
* **Cache Management:** Users can manually clear the cache to fetch a brand new quote from the server.
* **AI-Powered Explanations:** Utilizes the **Google Gemini API** to provide insightful explanations and author context for any given quote.
* **Download as Image:** Users can download the styled quote card as a high-resolution PNG image, perfect for sharing on social media, using the `html2canvas` library.
* **Immersive & Responsive UI:** A beautiful, dark-themed, and fully responsive user interface that looks great on all devices, from mobile phones to desktops.
* **Secure API Key Handling:** API keys are kept secure and are not exposed in the main codebase by using a `.gitignore` file.

---

## 🛠️ Tech Stack

This project was built using a combination of foundational web technologies and modern libraries:

* **HTML5:** For the core structure of the application.
* **CSS3:** For custom styling, animations, and layout.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building the responsive UI.
* **JavaScript (ES6+):** For all the application logic, including DOM manipulation, event handling, and asynchronous operations.
* **JavaScript Promises:** Heavily used for managing asynchronous API calls and caching logic.
* **Google Gemini API:** To generate AI-powered explanations of the quotes.
* **html2canvas.js:** A JavaScript library used to capture the quote card and convert it into a downloadable image.

---

## 🚀 Setup and Installation

To get this project running on your local machine, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rameezwangde/Quotes.git](https://github.com/rameezwangde/Quotes.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```

3.  **Create the Configuration File:**
    This project requires a Gemini API key. To keep it secure, you need to create a `config.js` file in the root of the project folder. This file is **intentionally ignored by Git** (via the `.gitignore` file) so your key will not be uploaded to GitHub.

    Create a new file named `config.js` and add the following content, replacing `"YOUR_API_KEY_HERE"` with your actual Gemini API key:

    ```javascript
    // config.js
    const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
    ```

4.  **Open the Application:**
    Simply open the `index.html` file in your web browser. That's it! The application is now running locally.

---

## 🙏 Acknowledgements

This project was made possible by several fantastic free APIs and libraries:

* **[DummyJSON](https://dummyjson.com/docs/quotes):** For providing the free quote API.
* **[Google Gemini](https://ai.google.dev/):** For the powerful language model used for quote explanations.
* **[html2canvas](https://html2canvas.hertzen.com/):** For the amazing screenshot-to-canvas functionality.
* **[Unsplash](https://unsplash.com/):** For the beautiful background image.

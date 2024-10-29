# WhatsOn
 Authors: Conor Judge | Eoin Fitzsimons | David O'Connor

To run this application you will need to type into the terminal the following:
npm install
npx nodemon app

To view this application in the browser you will need to enter an encoded API key to run Google Maps




## Overview
WhatsOn is a map-based event discovery web application designed to help users find real-time events happening around them. The application encourages spontaneity, reduces decision fatigue, and supports social engagement by presenting events visually on an interactive map. Users can browse, filter, and even randomly select events near their location.

Unlike traditional event management platforms that focus on hosting and managing events, WhatsOn is uniquely dedicated to event discovery. This approach allows users to view only the events happening now, removing barriers to socialising and focusing on simplicity.

## Key Features
- **Interactive Map-based Discovery**: Events appear directly on a map based on the user’s current location, promoting local engagement.
- **Random Event Selection**: A randomizer feature for those undecided, encouraging users to try new activities.
- **User Personalization**: Users can filter events by type and receive recommendations based on preferences.
- **Real-Time Updates**: Events automatically update to show only what’s relevant in real time.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS for dynamic rendering
- **Backend**: Node.js with Express.js for server-side functionality
- **APIs**: Google Maps API for map content, Meetup API for event data
- **Additional Tools**: Figma for design, Trello for project management, PhotoPea and Pixelmator for icon design

## Project Documentation
Below is the project documentation providing detailed insights into the design, development, and testing of WhatsOn.

- **[Business Plan](Business_Plan.pdf)**: Describes the business concept, target market, value propositions, and market analysis.
- **[Technical Report](Technical_Report.pdf)**: Outlines the system’s requirements, architecture, use case diagrams, and design choices.
- **[Testing Report](Testing_Report.pdf)**: Provides a comprehensive testing strategy, including black-box, white-box, and unit tests, along with results and analysis.
- **[Project Presentation Slides](Group 1- WhatsOn- Presentation Slides.pdf)**: A visual summary of the project, covering goals, unique features, and key outcomes.

## Getting Started
To get started with WhatsOn, clone this repository and follow the setup instructions provided in the Technical Report.

```bash
git clone https://github.com/your-username/WhatsOn.git
cd WhatsOn




# WhatsOn: Real-Time Event Discovery App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js CI](https://github.com/your-username/WhatsOn/actions/workflows/node.js.yml/badge.svg)](https://github.com/your-username/WhatsOn/actions)
[![GitHub issues](https://img.shields.io/github/issues/your-username/WhatsOn)](https://github.com/your-username/WhatsOn/issues)
[![GitHub stars](https://img.shields.io/github/stars/your-username/WhatsOn)](https://github.com/your-username/WhatsOn/stargazers)

Discover events happening around you in real time with **WhatsOn**—a map-based web application that promotes spontaneity and simplifies event discovery.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [Future Developments](#future-developments)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Overview

WhatsOn is designed to make finding and attending events effortless. With a focus on simplicity and spontaneity, the app displays events happening within the next 24 hours directly on an interactive map. No registrations or complex menus—just open the app and start exploring!

## Features

- **Interactive Map Interface**: View events around you on an intuitive map.
- **Real-Time Updates**: Events appear when they're imminent, ensuring you always have up-to-date information.
- **Random Event Selector**: Feeling adventurous? Let the app suggest a random event for you.
- **Optional Personalization**: Sign up to follow your favorite events or organizers and get personalized recommendations.
- **Directions**: Get instant directions to events via Google Maps or other mapping services.

## Demo

- **[Watch Demo Video](https://www.youtube.com/watch?v=your_video_link)**: See WhatsOn in action.
- **[Try the App Live](https://your_deployed_application_url)**: Experience WhatsOn yourself.

## Getting Started

### Prerequisites

- **Node.js and npm**: Install from the [official website](https://nodejs.org/).
- **Google Maps API Key**: Obtain one from the [Google Cloud Console](https://console.cloud.google.com/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/WhatsOn.git
   cd WhatsOn
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure API Key**:

   - Create a `.env` file in the root directory.
   - Add your API key:

     ```env
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

4. **Start the app**:

   ```bash
   npm start
   ```

   *Alternatively, use Nodemon for automatic restarts during development:*

   ```bash
   npx nodemon app.js
   ```

5. **Visit the app**:

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Open the App**: Launch WhatsOn and allow location permissions.
2. **Explore Events**: Browse events displayed on the map in your vicinity.
3. **Random Event**: Click the random event button for a surprise activity.
4. **Event Details**: Select an event marker to view more information.
5. **Get Directions**: Use the directions link to navigate to the event.
6. **Personalize (Optional)**: Sign up to follow events or organizers you love.

## Screenshots

### Map View

![Map View](./screenshots/map_view.png)

*Explore events around you on an interactive map.*

### Event Details

![Event Details](./screenshots/event_details.png)

*Get detailed information about events.*

## Documentation

For an in-depth look at the development of WhatsOn, check out our comprehensive documentation:

1. **[Project Proposal](./documents/Project_Proposal.pdf)**: Overview of the project, market research, and application features.
2. **[Requirements Specification](./documents/Requirements_Specification.pdf)**: Detailed functional and non-functional requirements.
3. **[Technical Report](./documents/Technical_Report.pdf)**: System architecture, implementation challenges, and technology stack.
4. **[Business Plan](./documents/Business_Plan.pdf)**: Business concept, market analysis, and strategic positioning.
5. **[Testing Report](./documents/Testing_Report.pdf)**: Testing strategies and results to ensure functionality and user experience.
6. **[Presentation Slides](./documents/Presentation_Slides.pdf)**: Visual summary of the project and key outcomes.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript templates)
- **Backend**: Node.js, Express.js, Morgan (logging), Bcrypt (security), Axios (API integration)
- **APIs**: Google Maps API, Meetup API
- **Design Tools**: Figma, PhotoPea, Pixelmator Pro
- **Project Management**: Trello, Microsoft Teams, OneDrive

## Contributors

- **Conor Judge**: Product owner, map design, event functionality
- **Eoin Fitzsimons**: Visual design, event data handling, API key security
- **David O'Connor**: Backend navigation, account management, contact feature

## Contributing

We welcome contributions to enhance WhatsOn! Please follow these steps:

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Add your descriptive commit message"
   ```

4. **Push to your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request** detailing your changes.

For more information, please see our [Contributing Guidelines](./CONTRIBUTING.md).

## Future Developments

We aim to enhance WhatsOn with:

- **OpenStreetMaps Integration**: Offering alternative mapping options.
- **Native Mobile App**: Developing apps for iOS and Android.
- **Advanced Personalization**: Improved filtering and personalized recommendations.
- **Social Features**: Event sharing, friend lists, and group planning.

Check out our [Roadmap](./ROADMAP.md) for more details.

## Troubleshooting

- **Dependencies**:

  - Run `npm install` to ensure all dependencies are installed.
  - If issues persist, delete `node_modules` and reinstall:

    ```bash
    rm -rf node_modules
    npm install
    ```

- **Port Conflicts**:

  - Ensure port `3000` is free or change it in the `.env` file:

    ```env
    PORT=your_desired_port
    ```

- **API Key Issues**:

  - Verify your Google Maps API key is correct and active.
  - Ensure the key is properly referenced in your `.env` file.
  - **Security Reminder**: Never commit your `.env` file or API keys to version control. Add `.env` to your `.gitignore` file.

## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgments

- **Third-Party Libraries**:
  - [Express.js](https://expressjs.com/)
  - [EJS](https://ejs.co/)
  - [Axios](https://axios-http.com/)
- **APIs**:
  - [Google Maps API](https://developers.google.com/maps)
  - [Meetup API](https://www.meetup.com/meetup_api/)
- **Design Inspirations**:
  - [Dribbble](https://dribbble.com/)
  - [Behance](https://www.behance.net/)

## Contact

If you have any questions, feedback, or need assistance, please contact us:

- **Email**: [support@whatsonapp.com](mailto:support@whatsonapp.com)
- **GitHub Issues**: [Report an issue](https://github.com/your-username/WhatsOn/issues)

---

*Please replace placeholders like `your-username` and `your_video_link` with actual links and information relevant to your project. Ensure all images and documents are correctly linked.*

---

Thank you for choosing **WhatsOn**! We hope it helps you discover exciting events happening around you.

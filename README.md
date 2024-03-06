<a href="https://timeforge.vercel.app/" target="_blank" rel="noopener" align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" alt="TimeForge" srcset="https://res.cloudinary.com/dv2wmpi4s/image/upload/v1709745106/ssimcufvedhry2knorma.png" align="center"/>
    <img alt="TimeForge" src="https://res.cloudinary.com/dv2wmpi4s/image/upload/v1709745106/ssimcufvedhry2knorma.png" align="center"/>
  </picture>
</a>

## Introduction:

TimeForge is a powerful online appointment and scheduling platform that simplifies time management. With TimeForge, users can effortlessly organize meetings and appointments, boosting productivity and efficiency.
[Live Link](https://timeforge.vercel.app/)

## Objective:

We aim to create a seamless interface for event management, empowering users to categorize and manage their schedules effectively.

## Features:

- **Dynamic Event Creation:** Easily manage online and offline events.
- **Comprehensive Event Management:** Enjoy robust functionalities for organizing events.
- **Flexible Event Categorization:** Categorize events based on their nature, making organization simple.
- **Video and Audio Integration:** Seamlessly integrate video and audio options for enhanced communication.
- **Efficient Participant Management:** Manage event attendees efficiently.
- **Calendar Integration:** Sync with popular calendars for added convenience.
- **Enhanced Note-taking:** Take detailed notes related to meetings and events.
- **User-friendly Interface:** Enjoy an intuitive interface with customizable dark and light modes.
- **Personalized Profile Customization:** Customize your profile to suit your preferences.
- **Google Calendar Integration:** Seamless connection with Google Calendar

## Technology:

- **TypeScript:** TypeScript brings type safety to JavaScript, enhancing code quality and developer productivity.
- **TanStack Query v5:** TanStack Query v5 is a powerful data fetching library that simplifies complex data fetching logic in React applications.
- **Three.js:** Three.js is a lightweight 3D library that allows for the creation of stunning 3D graphics and visualizations in the browser.
- **Stripe:** Stripe is a secure and flexible payment processing platform, ensuring seamless and reliable transactions.
- **Daily.js:** WebRTC API platform for real-time communication.

**Authentication:** Firebase Authentication provides simple yet secure authentication services

## Environment Variables:

- **VITE_FIREBASE_API_KEY:** Firebase API key for authentication and accessing Firebase services. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_AUTH_DOMAIN:** Firebase authentication domain. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_PROJECT_ID:** Firebase project ID. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_STORAGE_BUCKET:** Firebase storage bucket for storing user-generated content. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_MESSAGING_SENDER_ID:** Firebase messaging sender ID for sending notifications. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_APP_ID:** Firebase application ID. (obtain from Firebase console: [Firebase Console](https://console.firebase.google.com/))
- **VITE_BACK_END_API:** URL for the backend API endpoint. (obtain from [TimeForge-server](https://github.com/CareerNavigators/timeforge-server))
- **VITE_IMAGE_UPLOAD_API:** URL for the image upload API endpoint. (obtained from [Cloudinary](https://cloudinary.com/)
- **VITE_IMAGE_UPLOAD_PRESET:** Preset for image uploads. (configure in Cloudinary settings)

#### User Dashboard

Email: user@gmail.com

Pass: Usern@me434

#### Admin Dashboard

Email: admin@gmail.com

Pass: @Dmin434

### Instructions:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CareerNavigators/timeforge-client.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd timeforge-client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env.local` file:**

   - Create a `.env.local` file in the root directory of your project.
   - Copy the required environment variables from the provided `.env.example` file.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **View the app:**

   - Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.

That's it! You've successfully set up and run the app locally.

Server Repo: [TimeForge Server Repo](https://github.com/CareerNavigators/timeforge-server)

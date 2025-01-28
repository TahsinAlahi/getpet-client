# GetPet Client

**GetPet** is a modern pet adoption platform allowing users to list, adopt, and manage pet adoption campaigns. This repository contains the client-side code, built with React, Vite, and other cutting-edge technologies for an engaging and responsive user experience.

---

## Table of Contents

- [Features](#features)
- [Routes](#routes)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)
- [Author](#author)

---

## Features

- **Pet Listings**: View available pets for adoption.
- **Pet Details**: Detailed information about each pet.
- **User Authentication**: Secure login and registration.
- **Pet Management**: Add, edit, and delete pets.
- **Donation Campaigns**: Create and manage campaigns.
- **Admin Panel**: Manage users, campaigns, and all pets.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Smooth Animations**: Leveraging Lottie for enhanced user interactions.
- **Stripe Integration**: Secure donation system.

---

## Routes

### Public Routes

- `/`: Homepage
- `/pet-listing`: List of pets available for adoption
- `/pet-details/:id`: Detailed view of a specific pet
- `/donation-campaigns`: View all donation campaigns
- `/campaign-details/:id`: Details of a specific campaign
- `/login`: Login page
- `/register`: Registration page

### Protected Routes

- `/dashboard`: User dashboard
  - `add-pet`: Add a new pet
  - `edit-pet/:id`: Edit a pet
  - `added-pets`: View user's added pets
  - `create-donation-campaign`: Create a donation campaign
  - `edit-campaign/:id`: Edit a donation campaign
  - `my-campaigns`: View user's donation campaigns
  - `adoption-request`: View adoption requests
  - `my-donations`: View user's donation history

### Admin Routes

- `/dashboard`
  - `users`: Manage users
  - `all-pets`: Manage all pets
  - `all-campaigns`: Manage all campaigns

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **Vite** (optional but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TahsinAlahi/getpet-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd getpet-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file:

   ```bash
   touch .env
   ```

5. Add environment variables to the `.env` file (see the [Environment Variables](#environment-variables) section).

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_KEY=your-firebase-api-key
VITE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_PROJECT_ID=your-firebase-project-id
VITE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_APP_ID=your-firebase-app-id
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
VITE_API_URL=your-api-endpoint
VITE_IMAGE_BB_API_KEY=your-image-bb-api-key
```

---

## Scripts

- **Start development server**:

  ```bash
  npm run dev
  ```

  Runs the app in development mode and watches for file changes.

- **Build for production**:

  ```bash
  npm run build
  ```

  Creates an optimized production build.

- **Preview production build**:

  ```bash
  npm run preview
  ```

  Serves the production build locally for testing.

- **Lint the code**:

  ```bash
  npm run lint
  ```

  Checks the code for linting errors and enforces coding standards.

---

## Dependencies

- **[@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)**: Stripe integration for React.
- **[@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)**: Data fetching and caching.
- **[axios](https://www.npmjs.com/package/axios)**: HTTP client for API requests.
- **[firebase](https://www.npmjs.com/package/firebase)**: Authentication and database integration.
- **[lottie-react](https://www.npmjs.com/package/lottie-react)**: Lottie animations for React.
- **[react](https://www.npmjs.com/package/react)**: JavaScript library for building user interfaces.
- **[react-hook-form](https://www.npmjs.com/package/react-hook-form)**: Forms and validation.
- **[react-router-dom](https://www.npmjs.com/package/react-router-dom)**: Routing library for React.
- **[react-toastify](https://www.npmjs.com/package/react-toastify)**: Toast notifications.
- **[swiper](https://www.npmjs.com/package/swiper)**: Modern touch slider.

---

## Dev Dependencies

- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)**: Vite plugin for React support.
- **[tailwindcss](https://www.npmjs.com/package/tailwindcss)**: Utility-first CSS framework.
- **[eslint](https://www.npmjs.com/package/eslint)**: Linting for JavaScript and React.
- **[postcss](https://www.npmjs.com/package/postcss)**: Tool for transforming CSS.
- **[vite](https://www.npmjs.com/package/vite)**: Lightning-fast development environment.

---

## License

This project is licensed under the ISC License.

---

## Author

- **Your Name**
  - [GitHub](https://github.com/TahsinAlahi)
  - [LinkedIn](https://www.linkedin.com/in/TahsinAlahi/)

# Bookstore Application (Booktopia)

![alt text](https://raw.githubusercontent.com/akapez/book-store-fe/refs/heads/main/screenshot.png)

This project is built using Next.js, NextAuth for authentication, React Hook Form with Zod for form validation, Jest for unit testing, Playwright for end-to-end testing, Redux Toolkit for state management, and shadcn/ui for UI components.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)
- [Backend Repository](#backend-repository)

## Features

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **NextAuth**: Authentication for Next.js applications.
- **React Hook Form / Zod**: Form handling and validation.
- **Unit Testing**: Jest is used for writing and running unit tests.
- **End-to-End Testing**: Playwright is used for writing and running end-to-end tests.
- **State Management**: Redux Toolkit is used for managing the application state.
- **shadcn/ui**: A UI component library.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/akapez/book-store-fe.git
   cd book-store-fe
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   API_BASE_URL=your-api-base-url
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=your-nextauth-url
   NEXT_PUBLIC_BASE_URL=your-next-public-base-url
   ```

4. **Set up environment variables for testing**:
   Create a `.env.test` file in the root directory with the same variables as `.env.local`.

## Usage

1. **Start the development server**:

   ```bash
   yarn dev
   ```

2. The application will start on `http://localhost:3000`.

3. This project uses `commitlint`. Please follow the convention below when committing your changes:

   ```bash
   git commit -m "subject: message"
   ```

## Testing

1. **Run unit tests**:

   ```bash
   yarn test
   ```

2. **Run end-to-end tests**:
   ```bash
   yarn test:e2e
   ```

## Backend Repository

The backend application for Booktopia, built with Nest.js, can be found at [https://github.com/akapez/book-store-be](https://github.com/akapez/book-store-be).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

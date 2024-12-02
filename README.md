# jokes-frontend

A Next.js web application that allows users to submit jokes, view random jokes, and provides an interface for moderators to manage submissions

# Features
- Submit Jokes: Allows users to submit their jokes.
- View Random Jokes: Displays random jokes for users to enjoy.
- Moderator Panel: Provides an interface for moderators to review and manage jokes submissions.
- Responsive Design: Supports different screen sizes for enhanced user experience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Contact Information](#contact-information)

## Prerequisites

- **Node.js**: 22.x
- **npm**

## Installation

```bash
# Clone the repository
git clone https://github.com/Harshan-Pradeep/jokes-frontend.git

# Navigate into the directory
cd jokes-frontend

# Install dependencies
npm install
```

## Usage

```
# Start the development server
npm run dev
```
Access the application at `http://localhost:3000`

## Deployment
Vercel and EC2(Currently not working)

## Testing

Currently, there are no tests included. Future updates will provide unit and integration tests using a testing framework like Jest.

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```env
NEXT_PUBLIC_DELIVER_JOKES_API = http://ec2-13-60-85-225.eu-north-1.compute.amazonaws.com
NEXT_PUBLIC_MODERATOR_JOKES_API= http://ec2-13-233-163-9.ap-south-1.compute.amazonaws.com
NEXT_PUBLIC_SUBMIT_JOKES_API= http://ec2-65-0-99-51.ap-south-1.compute.amazonaws.com
```

An example `.env.example` file is provided for reference.

## Contact Information

- **Name**: Harshan Pradeep
- **LinkedIn**: [https://www.linkedin.com/in/harshan-pradeep-40712a29b/](https://www.linkedin.com/in/harshan-pradeep-40712a29b/)

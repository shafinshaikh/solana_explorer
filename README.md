# Solana Explorer

A comprehensive Solana blockchain explorer built with Next.js and the Helius API, offering detailed AI-assisted insights into the Solana ecosystem. Just search your wallet address or signature and get details fetched from the blockchain and in-depth analysis

You can visit the vercel deployed version of this project at https://solana-explorer-jade.vercel.app/

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for Solana accounts by address
- View account information (balance, executable status, rent epoch)
- See recent transactions for the account
- Responsive design for mobile and desktop

## Technologies Used

- Next.js 14 (App Router)
- React.js
- Tailwind CSS
- Helius API
- Javascript

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**
git clone https://github.com/shafinshaikh/solana-explorer.git
cd solana-explorer

2. **Install dependencies:**
npm i

3. **Set up environment variables:**
Create a `.env.local` file in the root directory and add your Helius API key:
HELIUS_API_KEY=your_helius_api_key_here

4. **Run the development server:**
npm run dev

5. **Open the application:**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To create a production build, follow these steps:

1. **Create a production build:**
npm run build

2. **Start the production server:**
npm start

## Deployment

This project can be easily deployed to various platforms:

### Vercel

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Next.js project and set up the build configuration.
3. Add your environment variables in the Vercel project settings.
4. Deploy the project.

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages.
2. Set the build command to `npm run build` and the output directory to `out`.
3. Add your environment variables in the Cloudflare Pages project settings.
4. Deploy the project.

## Future Features

Here are some exciting features we plan to implement in the future:

1. Real-time transaction visualization via graphs/charts/diagrams
2. Integration with popular Solana-based DeFi protocols
3. NFT portfolio analytics and tracking
4. Customizable user dashboards
5. Solana program (smart contract) analysis and data security audit tools
6. Cross-chain transaction and bridging activity tracker
7. Validator health monitoring system
8. Token vesting schedule information
9. Governance proposal tracker for Solana-based projects
10. Environmental impact calculator for Solana transactions
11. AI-powered price predictions for Solana tokens
12. Social sentiment analysis for Solana projects and tokens

## Contributing

We welcome contributions from the community! Here's how you can contribute:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
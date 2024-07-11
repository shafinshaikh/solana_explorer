# Solana Explorer

This is a simple Solana blockchain explorer built with Next.js and the Helius API.

## Getting Started

1. Clone the repository:
git clone https://github.com/shafinshaikh/solana-explorer.git
cd solana-explorer

2. Install dependencies:
npm install

3. Create a `.env.local` file in the root directory and add your Helius API key:
HELIUS_API_KEY=your_helius_api_key_here

4. Run the development server:
npm run dev

5. Open http://localhost:3000 with your browser to see the result.

## Building for Production

To create a production build, run:
npm run build

Then, to start the production server:
npm start

## Deployment

This project can be easily deployed to Vercel or Cloudflare Pages. Simply connect your GitHub repository to either platform and they will automatically deploy your application.

## Features

- Search for Solana accounts by address
- View account information (balance, executable status, rent epoch)
- See recent transactions for the account

## Technologies Used

- Next.js 14 (App Router)
- ReactJs
- Tailwind CSS
- Helius API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request/Issue.
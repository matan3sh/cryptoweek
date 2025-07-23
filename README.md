# CryptoWeek - Next.js 15 + TypeScript

A modern, fully-typed React application built with Next.js 15, showcasing crypto industry leaders, speakers, and events.

## 🚀 Features

- **Next.js 15** - Latest version with React 18+ support
- **TypeScript** - Full type safety and better developer experience
- **MUI v6** - Modern Material-UI components with TypeScript support
- **Styled Components v6** - CSS-in-JS with TypeScript integration
- **Performance Optimized** - Using React 18 features like useMemo and useCallback
- **Responsive Design** - Mobile-first approach with custom breakpoints
- **Type-Safe API Routes** - Fully typed backend with NodeMailer integration

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.3
- **Language**: TypeScript 5.x
- **UI Library**: MUI (Material-UI) v6
- **Styling**: Styled Components v6
- **Email**: NodeMailer
- **Development**: ESLint, TypeScript ESLint

## 📁 Project Structure

```
cryptoweek/
├── components/          # Reusable UI components
│   ├── home/           # Home page specific components
│   ├── layout/         # Layout components (Header, Footer)
│   └── icons/          # Icon exports
├── data/               # TypeScript data files
├── pages/              # Next.js pages (TypeScript)
│   └── api/           # API routes
├── services/           # Service functions (API calls)
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd cryptoweek
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file with:

```env
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=your_password
CONTACT_EMAIL=contact@cryptoweek.co.il
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 🎯 Key Features

### TypeScript Integration

- Full type safety across the entire application
- Custom type definitions for all data structures
- Typed API routes and service functions
- Intelligent autocomplete and error detection

### Performance Optimizations

- React 18 optimizations with useMemo and useCallback
- Optimized package imports for MUI components
- Next.js 15 performance features
- Proper image optimization

### Modern React Patterns

- Functional components with hooks
- Proper TypeScript component typing
- Performance-optimized event handlers
- Clean component abstractions

### Responsive Design

- Mobile-first responsive design
- Custom styled-components with TypeScript
- Flexible grid layouts
- Optimized for all screen sizes

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` includes:

- TypeScript support
- Styled Components compiler
- Image optimization
- Performance optimizations

### TypeScript Configuration

- Strict mode enabled
- Path mapping for clean imports
- Modern ES features support
- Integration with Next.js

## 📧 Contact Form

The application includes a fully-typed contact form with:

- Server-side email validation
- NodeMailer integration
- TypeScript API routes
- Error handling and success states

## 🚀 Deployment

The application is optimized for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- Heroku
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔄 Migration Notes

This project was successfully upgraded from:

- **Next.js 10** → **Next.js 15**
- **JavaScript** → **TypeScript**
- **Material-UI v4** → **MUI v6**
- **React 17** → **React 18**
- **Styled Components v5** → **v6**

All components maintain the same functionality while gaining:

- Type safety
- Better performance
- Modern React patterns
- Improved developer experience

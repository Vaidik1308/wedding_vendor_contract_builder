# Wedding Vendor Contract Builder

A professional contract management tool for wedding vendors that allows them to quickly create, edit, and digitally sign contracts with AI assistance.

## 🚀 Features

- **Authentication System**: Simple login with test vendor accounts
- **Contract Management**: Create, edit, and view contracts
- **AI-Powered Content**: Generate contract templates based on vendor type
- **Digital Signatures**: Draw or type signatures for contract finalization
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with localStorage persistence
- **Authentication**: Client-side dummy authentication
- **Data Storage**: Browser localStorage (demo purposes)

## 📋 Test Accounts

Use these credentials to test the application:

| Email | Password | Vendor Type |
|-------|----------|-------------|
| photographer@test.com | password123 | Photographer |
| caterer@test.com | password123 | Caterer |
| florist@test.com | password123 | Florist |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedding_vendor_contract_builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### 1. Login
- Use one of the test accounts provided above
- All accounts use the password: `password123`

### 2. Dashboard
- View all your contracts
- Create new contracts
- Edit existing drafts
- View signed contracts

### 3. Create Contract
- Fill in client details (name, event date, venue)
- Specify service package and amount
- Use AI Assist to generate contract content
- Save as draft

### 4. Sign Contract
- Open a draft contract
- Click "Sign Contract"
- Choose to draw or type your signature
- Contract status changes to "Signed"

### 5. AI Assist
- Click the "🤖 AI Assist" button when creating/editing contracts
- AI generates vendor-specific contract templates
- Templates include appropriate terms and conditions
- Content is automatically populated with form data

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Main dashboard
│   ├── contracts/         # Contract management pages
│   └── page.tsx          # Login page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── contracts/        # Contract-related components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
└── lib/                  # Utilities and data management
    ├── auth.ts           # Authentication logic
    ├── storage.ts        # Data persistence
    ├── types.ts          # TypeScript interfaces
    └── utils.ts          # Helper functions
```

## 🔧 Key Components

### Authentication (`src/lib/auth.ts`)
- Dummy authentication system
- Test vendor accounts
- Session management with localStorage

### Data Storage (`src/lib/storage.ts`)
- Contract CRUD operations
- Signature management
- Sample data initialization

### AI Templates (`src/lib/types.ts`)
- Vendor-specific contract templates
- Photography, catering, and floral service contracts
- Placeholder replacement system

### Digital Signature (`src/components/contracts/signature-pad.tsx`)
- Canvas-based drawing signature
- Typed signature with cursive font
- Base64 encoding for storage

## 🎨 Design Decisions

### UI/UX
- **Clean Interface**: Minimalist design focused on functionality
- **Responsive Layout**: Works on desktop and mobile devices
- **Status Indicators**: Clear visual feedback for contract states
- **Intuitive Navigation**: Easy-to-use workflow

### Data Management
- **Local Storage**: Simple persistence for demo purposes
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks for component state

### AI Integration
- **Template-Based**: Pre-written templates for each vendor type
- **Context-Aware**: Templates adapt to form data
- **Realistic Content**: Professional contract language

## 🔮 Assumptions Made

1. **Authentication**: Used dummy accounts for simplicity
2. **Data Storage**: localStorage instead of database for demo
3. **AI Integration**: Mock responses instead of real AI API
4. **Legal Compliance**: Templates are examples, not legal advice
5. **File Management**: No file upload/download functionality
6. **Multi-tenancy**: Single vendor per session

## 🚧 What I'd Add with More Time

### Enhanced Features
- **Real Database**: PostgreSQL or MongoDB integration
- **Real AI API**: OpenAI integration for dynamic content generation
- **File Management**: PDF generation and download
- **Email Integration**: Send contracts to clients
- **Advanced Editor**: Rich text editor with formatting
- **Template Library**: Customizable contract templates
- **Client Portal**: Client-side contract viewing and signing
- **Payment Integration**: Stripe for contract payments
- **Analytics**: Contract performance metrics

### Technical Improvements
- **API Routes**: Next.js API routes for backend logic
- **Authentication**: JWT tokens and secure sessions
- **Validation**: Form validation with error handling
- **Testing**: Unit and integration tests
- **Deployment**: Vercel or AWS deployment
- **Monitoring**: Error tracking and performance monitoring

### Security Enhancements
- **Data Encryption**: Encrypt sensitive contract data
- **Audit Trail**: Track all contract modifications
- **Role-Based Access**: Different permission levels
- **Backup System**: Automated data backups

## 🐛 Known Limitations

1. **Data Persistence**: Data is lost when localStorage is cleared
2. **No Real AI**: AI responses are pre-written templates
3. **Single User**: No multi-user collaboration
4. **No Validation**: Limited form validation
5. **No Export**: Cannot export contracts as PDFs
6. **No Search**: No contract search functionality

## 📝 Development Notes

### Time Allocation (4 hours)
- **Setup & Structure**: 30 minutes
- **Authentication**: 45 minutes
- **Contract Management**: 90 minutes
- **AI Integration**: 30 minutes
- **Digital Signatures**: 60 minutes
- **UI Polish**: 30 minutes
- **Documentation**: 15 minutes

### Trade-offs Made
- **Simplicity over Complexity**: Focused on core functionality
- **Speed over Perfection**: Prioritized working features
- **Demo over Production**: Built for demonstration purposes

## 🤝 Contributing

This is a technical assessment project. For production use, consider:
- Adding proper error handling
- Implementing comprehensive testing
- Adding security measures
- Following accessibility guidelines
- Adding performance optimizations

## 📄 License

This project is created for technical assessment purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
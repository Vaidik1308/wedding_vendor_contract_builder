# Wedding Vendor Contract Builder

A professional contract management tool for wedding vendors that allows them to quickly create, edit, and digitally sign contracts with AI assistance. Built with Next.js 15, TypeScript, and shadcn/ui components.

## 🚀 Features

- **Authentication System**: Simple login with test vendor accounts
- **Contract Management**: Create, edit, and view contracts with full CRUD operations
- **AI-Powered Content**: Generate contract templates based on vendor type (Photographer, Caterer, Florist)
- **Digital Signatures**: Draw or type signatures for contract finalization
- **Date Picker**: Custom reusable date picker component for event dates
- **Toast Notifications**: User feedback for all actions (success/error messages)
- **Responsive Design**: Modern UI built with Next.js 15 and Tailwind CSS
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Data Persistence**: Local storage for contracts and signatures

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks with localStorage persistence
- **Authentication**: Client-side dummy authentication
- **Data Storage**: Browser localStorage (demo purposes)
- **Date Handling**: Custom DatePicker component with calendar integration
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React icons

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
- Toast notification confirms successful signing

### 5. AI Assist
- Click the "🤖 AI Assist" button when creating/editing contracts
- AI generates vendor-specific contract templates
- Templates include appropriate terms and conditions
- Content is automatically populated with form data
- Loading state shows during generation

### 6. Date Selection
- Use the custom DatePicker component for event dates
- Calendar popup with month/year navigation
- Formatted date display (e.g., "January 15, 2024")
- Validation prevents past dates before 1900

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Main dashboard
│   ├── contracts/         # Contract management pages
│   │   ├── [id]/         # Dynamic contract routes
│   │   └── new/          # Create new contract
│   └── page.tsx          # Login page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── common/           # Shared components
│   │   └── DatePicker.tsx # Reusable date picker
│   ├── contracts/        # Contract-related components
│   │   ├── contract-form.tsx
│   │   ├── contract-list.tsx
│   │   ├── contract-view.tsx
│   │   └── signature-pad.tsx
│   ├── layout/           # Layout components
│   │   └── header.tsx
│   └── ui/               # Reusable UI components
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── popover.tsx
└── lib/                  # Utilities and data management
    ├── auth.ts           # Authentication logic
    ├── storage.ts        # Data persistence
    ├── types.ts          # TypeScript interfaces
    └── utils.ts          # Helper functions
```

## 🔧 Key Components

### Authentication (`src/lib/auth.ts`)
- Dummy authentication system with test vendor accounts
- Session management with localStorage
- User type detection (photographer, caterer, florist)

### Data Storage (`src/lib/storage.ts`)
- Contract CRUD operations with full persistence
- Signature management and storage
- Sample data initialization for demo purposes
- Type-safe data handling

### AI Templates (`src/lib/types.ts`)
- Vendor-specific contract templates for all three types
- Photography, catering, and floral service contracts
- Smart placeholder replacement system
- Professional contract language and terms

### Digital Signature (`src/components/contracts/signature-pad.tsx`)
- Canvas-based drawing signature with touch support
- Typed signature with cursive font styling
- Base64 encoding for storage and display
- Mobile-friendly touch events

### Date Picker (`src/components/common/DatePicker.tsx`)
- Reusable component with customizable props
- Calendar popup with month/year navigation
- Formatted date display and validation
- Integration with form state management

### Toast Notifications
- Success and error feedback for all user actions
- Non-intrusive popup notifications
- Consistent user experience across the app

## 🎨 Design Decisions

### UI/UX
- **Clean Interface**: Minimalist design focused on functionality
- **Responsive Layout**: Works on desktop and mobile devices
- **Status Indicators**: Clear visual feedback for contract states
- **Intuitive Navigation**: Easy-to-use workflow with breadcrumbs
- **Toast Notifications**: Immediate feedback for user actions
- **Loading States**: Visual indicators during async operations

### Data Management
- **Local Storage**: Simple persistence for demo purposes
- **Type Safety**: Full TypeScript implementation with strict typing
- **State Management**: React hooks for component state
- **Form Validation**: Client-side validation with error handling

### AI Integration
- **Template-Based**: Pre-written templates for each vendor type
- **Context-Aware**: Templates adapt to form data automatically
- **Realistic Content**: Professional contract language and terms
- **Loading States**: Visual feedback during AI generation

### Component Architecture
- **Reusable Components**: DatePicker and other UI components
- **Props Interface**: Well-defined TypeScript interfaces
- **Modular Design**: Separated concerns and clean code structure

## 🔮 Assumptions Made

1. **Authentication**: Used dummy accounts for simplicity
2. **Data Storage**: localStorage instead of database for demo
3. **AI Integration**: Mock responses instead of real AI API
4. **Legal Compliance**: Templates are examples, not legal advice
5. **File Management**: No file upload/download functionality
6. **Multi-tenancy**: Single vendor per session

## 🚧 What I'd Add with More Time

### Enhanced Features
- **Real Database**: PostgreSQL or MongoDB integration with proper data modeling
- **Real AI API**: OpenAI integration for dynamic content generation
- **File Management**: PDF generation and download with custom branding
- **Email Integration**: Send contracts to clients with tracking
- **Advanced Editor**: Rich text editor with formatting and templates
- **Template Library**: Customizable contract templates with version control
- **Client Portal**: Client-side contract viewing and signing
- **Payment Integration**: Stripe for contract payments and invoicing
- **Analytics**: Contract performance metrics and insights
- **Bulk Operations**: Mass contract creation and management
- **Search & Filter**: Advanced contract search and filtering
- **Export Options**: Multiple export formats (PDF, Word, etc.)

### Technical Improvements
- **API Routes**: Next.js API routes for backend logic
- **Authentication**: JWT tokens and secure sessions with refresh tokens
- **Validation**: Server-side validation with Zod or similar
- **Testing**: Unit, integration, and E2E tests with Jest and Playwright
- **Deployment**: Vercel or AWS deployment with CI/CD
- **Monitoring**: Error tracking with Sentry and performance monitoring
- **Caching**: Redis for improved performance
- **Rate Limiting**: API rate limiting and abuse prevention

### Security Enhancements
- **Data Encryption**: Encrypt sensitive contract data at rest
- **Audit Trail**: Track all contract modifications and access
- **Role-Based Access**: Different permission levels and user roles
- **Backup System**: Automated data backups and disaster recovery
- **GDPR Compliance**: Data privacy and user rights management
- **Two-Factor Auth**: Enhanced security for user accounts

## 🐛 Known Limitations

1. **Data Persistence**: Data is lost when localStorage is cleared
2. **No Real AI**: AI responses are pre-written templates
3. **Single User**: No multi-user collaboration or team features
4. **Limited Validation**: Basic form validation only
5. **No Export**: Cannot export contracts as PDFs or other formats
6. **No Search**: No contract search or filtering functionality
7. **No Offline Support**: Requires internet connection
8. **No Real-time Updates**: No live collaboration features
9. **Limited Customization**: Fixed UI themes and layouts
10. **No Backup**: No automatic data backup system

## 📝 Development Notes

### Trade-offs Made
- **Simplicity over Complexity**: Focused on core functionality
- **Speed over Perfection**: Prioritized working features
- **Demo over Production**: Built for demonstration purposes
- **Reusability**: Created reusable components like DatePicker
- **User Experience**: Added toast notifications for better feedback
- **Type Safety**: Maintained strict TypeScript throughout

### Key Achievements
- ✅ Full CRUD operations for contracts
- ✅ Digital signature functionality with both drawing and typing
- ✅ AI-powered contract generation with vendor-specific templates
- ✅ Reusable DatePicker component with calendar integration
- ✅ Toast notifications for user feedback
- ✅ Responsive design that works on all devices
- ✅ Type-safe implementation with proper error handling
- ✅ Clean, maintainable code structure

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
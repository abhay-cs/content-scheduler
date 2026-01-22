# StreamFlow – Content Scheduling Dashboard

A full-stack web application for venue managers to manage and schedule digital content (ads, promos, trivia) for display on venue TVs. StreamFlow enables businesses to replace national ads with targeted local promotions during commercial breaks, optimizing content delivery and reducing advertising costs.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Content Library**: Create, manage, and organize digital content (ads, promos, trivia) with rich metadata
- **Interactive Timeline Scheduler**: Drag-to-resize scheduling interface with minute-level precision across 7-day windows
- **Real-time Analytics**: Comprehensive dashboard showing schedule coverage, content distribution, and performance metrics
- **Day-wise Filtering**: Filter and manage schedules by day of the week
- **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
- **Dark Mode**: System-aware dark/light theme with persistent user preferences
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Optimistic Updates**: Instant UI feedback for seamless user experience
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Smooth loading indicators and skeleton screens

### 🏗️ Technical Features
- **Server Actions**: Type-safe data operations using Next.js Server Actions
- **TypeScript**: Full type safety across the application
- **Component Architecture**: Reusable, modular React components
- **Context API**: Global state management for theme and sidebar
- **Database Integration**: PostgreSQL with Supabase for scalable data storage

## 🚀 Tech Stack

### Frontend
- **Next.js 16** (App Router) – React framework with server-side rendering
- **React 19** – UI library
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS 4** – Utility-first CSS framework
- **Lucide React** – Icon library
- **React Resizable** – Drag-to-resize functionality

### Backend & Database
- **Supabase** – PostgreSQL database with real-time capabilities
- **Server Actions** – Next.js server-side data mutations
- **PostgreSQL** – Relational database

### Development Tools
- **ESLint** – Code linting
- **PostCSS** – CSS processing
- **TypeScript** – Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm/yarn/pnpm
- **Supabase Account** (free tier works)
- **Git** (for version control)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/content-scheduler.git
cd content-scheduler/content-scheduler
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API.

### 4. Database Setup

1. **Create Tables**: Run the following SQL in your Supabase SQL Editor:

```sql
-- Content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('ad', 'promo', 'trivia')),
  media_url TEXT,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schedule table
CREATE TABLE schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  day TEXT CHECK (day IN ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  color TEXT DEFAULT 'primary',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. **Seed Sample Data** (Optional): Run `SEED_DATA.sql` in Supabase SQL Editor to populate sample data.

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
content-scheduler/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Dashboard route group
│   │   │   ├── dashboard/      # Main dashboard page
│   │   │   ├── contents/       # Content library
│   │   │   ├── scheduler/       # Schedule management
│   │   │   ├── analytics/      # Analytics dashboard
│   │   │   ├── settings/       # Settings page
│   │   │   └── seed/           # Database seeding
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── Button.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PageTitle.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   └── timeline.tsx        # Timeline scheduler
│   ├── context/                # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── SidebarContext.tsx
│   └── lib/                    # Utility functions
│       ├── supabase.ts         # Supabase client
│       └── utils.ts            # Helper functions
├── public/                     # Static assets
├── .env.local                  # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Usage

### Content Management
1. Navigate to **Content Library**
2. Click **"Add Content"** to create new content items
3. Fill in title, description, type (ad/promo/trivia), and media URL
4. Set status (draft/scheduled/published)
5. Save to add to your library

### Scheduling
1. Go to **Schedule** page
2. Select a day from the day filter
3. Click **"Add Schedule"** to create a new schedule
4. Choose content, day, start/end time, and color
5. View schedules on the interactive timeline
6. Drag schedule blocks to resize (desktop) or use touch gestures (mobile)
7. Click delete icon to remove schedules

### Analytics
1. Visit **Analytics** page
2. View schedule coverage by day
3. See content type distribution
4. Monitor day-wise activity
5. Track total scheduled hours

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Commit and push your code
2. **Import to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
3. **Add Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**: Click deploy and wait for build to complete

Your app will be live at `your-app.vercel.app`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🧪 Development

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📊 Database Schema

### Content Table
- `id` (UUID) – Primary key
- `title` (TEXT) – Content title
- `description` (TEXT) – Content description
- `type` (TEXT) – Content type: 'ad', 'promo', or 'trivia'
- `media_url` (TEXT) – Media file URL
- `status` (TEXT) – Content status: 'draft', 'scheduled', or 'published'
- `scheduled_at` (TIMESTAMPTZ) – Scheduled date/time
- `created_at` (TIMESTAMPTZ) – Creation timestamp

### Schedule Table
- `id` (UUID) – Primary key
- `content_id` (UUID) – Foreign key to content table
- `day` (TEXT) – Day of week
- `start_time` (TIME) – Schedule start time
- `end_time` (TIME) – Schedule end time
- `color` (TEXT) – Display color: 'primary', 'emerald', or 'amber'
- `created_at` (TIMESTAMPTZ) – Creation timestamp

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@abhay-cs](https://github.com/abhay-cs)
- LinkedIn: [abhaycs](https://linkedin.com/in/abhaycs)
- Portfolio: [portfolio](https://abhaycs.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [Supabase](https://supabase.com) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact me via email: your.email@example.com

---


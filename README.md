
# HealthMonitor - Modern Health Tracking Dashboard

A beautiful, responsive health monitoring web application built with React, TypeScript, Tailwind CSS, and Supabase. Features real-time health data visualization, user authentication, and a modern glassmorphism design.

## ✨ Features

- **🎨 Modern Design**: Beautiful UI with glassmorphism effects, smooth animations, and gradient backgrounds
- **🌓 Theme Toggle**: Light/dark mode with persistent theme preference
- **📊 Real-time Data**: Live health metrics with interactive charts using Recharts
- **🔒 Authentication**: Secure user authentication with Supabase
- **📱 Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **💾 Data Persistence**: User profiles and health metrics stored in Supabase
- **🔄 Real-time Updates**: Live data updates using Supabase subscriptions
- **📈 Health Analytics**: 7-day trends and monthly averages calculation
- **🚨 Health Alerts**: Anomaly detection and health status indicators

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Real-time)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-monitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   The app is pre-configured to connect to the Supabase project, but you'll need to set up the database tables:

   **Profiles Table:**
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade,
     name text,
     email text,
     phone text,
     location text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );

   alter table profiles enable row level security;

   create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
   create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
   create policy "Users can insert own profile." on profiles for insert with check (auth.uid() = id);
   ```

   **Health Metrics Table:**
   ```sql
   create table health_metrics (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users on delete cascade,
     heart_rate integer not null,
     blood_oxygen integer not null,
     activity_level integer not null,
     temperature decimal not null,
     timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
     anomaly boolean default false
   );

   alter table health_metrics enable row level security;

   create policy "Users can view own health metrics." on health_metrics for select using (auth.uid() = user_id);
   create policy "Users can insert own health metrics." on health_metrics for insert with check (auth.uid() = user_id);
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts (Theme)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
└── styles/             # Global styles
```

## 📊 Health Metrics

The application tracks and visualizes:

- **Heart Rate** (60-100 bpm healthy range)
- **Blood Oxygen** (95-100% healthy range)
- **Body Temperature** (36.1-37.2°C healthy range)
- **Activity Level** (20-80% healthy range)

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Grid Layouts**: Adapts to all screen sizes
- **Consistent Color Scheme**: Cyan/blue primary colors with proper contrast

## 🚀 Deployment

### Deploy to Vercel

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No additional environment variables needed - the Supabase configuration is included in the code.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/pages/` and update routing in `App.tsx`
3. **New Hooks**: Add to `src/hooks/`
4. **Database Changes**: Update Supabase schema and types in `src/lib/supabase.ts`

## 📱 Screenshots

The application features:
- Modern dashboard with real-time health metrics
- Interactive charts showing health trends
- Responsive design that works on all devices
- Dark/light theme toggle
- User profile management
- Authentication with email/password

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the code comments
- Review the Supabase documentation for backend-related questions

---

Built with ❤️ using React, TypeScript, and Supabase

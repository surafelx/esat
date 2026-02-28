# AI School - AI-Powered Learning Platform

<p align="center">
  <img src="public/logo.svg" alt="AI School Logo" width="120" />
</p>

<p align="center">
  <strong>A remote, open-access learning operating system designed for beginners who want to become real AI engineers.</strong>
</p>

<p align="center">
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/React-18-blue" alt="React" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript" />
  </a>
  <a href="https://github.com">
    <img src="https://img.shields.io/badge/Tailwind-3-blue" alt="Tailwind" />
  </a>
</p>

---

## 📚 About AI School

AI School is a modern, interactive learning platform built for aspiring AI engineers. It combines structured roadmaps with AI-powered tools to accelerate learning from beginner to hired professional in months, not years.

### Core Philosophy

- **Learning is Experimental** - Every concept results in a working prototype
- **Beginners are Expected to Think** - Questions are encouraged, not just answers
- **Kilo Code Guides, Not Replaces** - Senior engineer mentorship model
- **Progress is Measured by Output** - Daily small outputs compound into skill

---

## 🚀 Features

### 1. Landing Page

A visually stunning hero section with:
- Fire gradient animated background with particle effects
- Clear value proposition: "Learn AI Engineering the Right Way"
- Two CTAs: "Start Learning Free" and "View Roadmap"
- Live stats counter (Students, Projects, Success Rate)
- Feature highlights section
- Animated scroll indicator

### 2. Typeform-Style Onboarding

A one-question-at-a-time conversational onboarding experience:

- **Full-screen minimal design** with large typography and whitespace
- **Conversational flow** - Questions feel like a dialogue, not data collection
- **Smooth transitions** with Framer Motion animations between questions
- **Dot progress indicators** showing completion status
- **Keyboard-friendly navigation** - Press Enter to proceed
- **Conditional logic** for personalized paths:
  - Career goals selection (Frontend, Backend, AI/ML, Full-Stack, DevOps)
  - Experience level (Beginner, Intermediate, Advanced)
  - Learning focus (Web Development, Data Science, AI/ML, Mobile)
  - Time commitment (Less than 5 hours, 5-10 hours, 10-20 hours, 20+ hours)
- **Brand customization** - Custom colors, fonts, backgrounds

### 3. Interactive Dashboard

A comprehensive dashboard with real-time learning metrics:

- **Welcome section** with streak counter (e.g., "14-day streak")
- **Quick stats buttons** showing:
  - Day streak (🔥)
  - Total XP (⚡)
  - Current Level (🏆)
  - Completion percentage (📈)
- **Quick actions** for Continue Learning, View Schedule, Ask AI Tutor
- **Video progress wrapper** with:
  - Animated fire particle effects
  - Play button overlay
  - Progress bar
  - Volume controls
  - Gradient overlays
- **Stats grid** displaying:
  - Lessons Completed (24/56)
  - Current Streak (14 days)
  - Total XP (2,450)
  - Achievements (12)
- **Current Learning Path** card showing AI Engineering Track progress
- **Badges section** with earned achievements
- **Recent Activity** feed with XP rewards
- **Today's Schedule** with calendar integration

### 4. Learn Page

An enhanced learning experience with multiple content types:

- **Video Recaps** - Embedded learning videos with controls
- **Quizzes** - Interactive assessments with multiple choice
- **Projects** - Hands-on coding projects
- **XP System**:
  - 50 XP per lesson
  - 100 XP for projects
  - 25 XP for quizzes
- **Progress tracking** with visual indicators
- **Lesson type icons** distinguishing video, reading, quiz, and project

### 5. Standalone Quiz System

A dedicated quiz page featuring:
- Multiple choice questions
- Immediate feedback
- Score tracking
- XP rewards on completion

### 6. AI Tutor Chat

An intelligent chatbot for personalized learning:
- Real-time conversational AI
- Context-aware responses
- Code explanation capabilities
- Concept clarification

### 7. Community Features

Peer-to-peer learning support:
- Discussion threads
- Community posts
- Collaborative learning

### 8. Guided Assignments

A comprehensive guided project system with ladder/tree view:

**AI Orchestration Engineer Curriculum:**

1. **Python Foundations for Orchestration & Tooling**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

2. **Git Forensic Tooling**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

3. **Multi-Agent State Orchestration with LangGraph**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

4. **PDF Parsing + Hallucination Detection**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

5. **Structured LLM Output & Prompt Engineering**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

6. **Deterministic Synthesis Engine (Chief Justice)**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

7. **Integration Testing**
   - Learning Objectives
   - Resources
   - Creative Learning
   - Testing

Each module includes:
- Code snippets (working Python examples)
- Implementation stages (step-by-step instructions)
- Notes (concept explanations and best practices)
- Video placeholders (YouTube links)

### 9. Meetings & Schedule

Integrated scheduling system:
- Calendar view
- Upcoming events display
- Event types: lessons, Q&A sessions, study groups
- Time-based notifications

### 10. TalkToMe Component

A floating AI assistant accessible throughout the app:
- Global accessibility via React context
- Quick access to AI tutoring

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [React 18](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **Routing** | [React Router 6](https://reactrouter.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **State/Data** | [React Query](https://tanstack.com/query/latest) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) + [Sileo Toast](https://github.com/nickmilo/sileo) |
| **Calendar** | [react-day-picker](https://react-day-picker.js.org/) |

---

## 📁 Project Structure

```
ai-academy/
├── public/
│   ├── logo.svg                 # App logo
│   ├── feedback.mp4             # Feedback video
│   └── placeholder.svg          # Placeholder assets
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── AIChat.tsx           # AI chat component
│   │   ├── CommunityThread.tsx  # Community discussion
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── NavLink.tsx          # Navigation link
│   │   ├── ProgressCard.tsx      # Progress tracking card
│   │   ├── Roadmap.tsx           # Learning roadmap
│   │   ├── RubricEvaluator.tsx  # Rubric evaluation
│   │   ├── Sidebar.tsx          # Side navigation
│   │   └── TalkToMe.tsx         # Global AI assistant
│   ├── data/
│   │   ├── courses.json         # Course modules & lessons
│   │   └── guided-assignments.json # Guided project curriculum
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   ├── use-toast.ts         # Toast notifications
│   │   └── useMessages.ts      # Chat messages
│   ├── lib/
│   │   ├── firebase.ts          # Firebase config
│   │   └── utils.ts             # Utility functions
│   ├── pages/
│   │   ├── Index.tsx            # Landing page
│   │   ├── Onboarding.tsx       # Typeform-style onboarding
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Learn.tsx            # Learning page
│   │   ├── Quiz.tsx             # Quiz system
│   │   ├── Chat.tsx             # AI chat page
│   │   ├── Community.tsx        # Community page
│   │   ├── Assignments.tsx      # Guided assignments
│   │   ├── Meetings.tsx         # Schedule/meetings
│   │   └── NotFound.tsx         # 404 page
│   ├── test/
│   │   ├── pages.test.tsx       # Page tests
│   │   └── setup.ts             # Test setup
│   ├── App.css                  # Global styles
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Tailwind + custom styles
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts           # Vite types
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── components.json              # shadcn config
├── eslint.config.js            # ESLint config
├── index.html                  # HTML entry
├── package.json                 # Dependencies
├── postcss.config.js           # PostCSS config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # TS app config
├── tsconfig.node.json          # TS node config
├── vite.config.ts              # Vite config
├── vitest.config.ts            # Vitest config
└── vercel.json                # Vercel deployment
```

---

## 🎨 Design System

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | `hsl(0, 84%, 55%)` | CTAs, highlights, accents |
| Secondary | `hsl(25, 95%, 55%)` | Gradients, secondary actions |
| Background | `#0a0a0f` | Main dark background |
| Surface | `#120a0a` | Card backgrounds |
| Text | `hsl(0, 0%, 100%)` | Primary text |
| Muted | `hsl(0, 0%, 60%)` | Secondary text |

### XP & Gamification

- **Lessons**: +50 XP each
- **Projects**: +100 XP each
- **Quizzes**: +25 XP each
- **Streaks**: Daily login bonuses
- **Levels**: Progressive unlock system
- **Badges**: Achievement rewards

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd ai-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
# Add other Firebase config as needed
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon set
- All open-source contributors

---

<p align="center">
  <strong>Built with ❤️ for aspiring AI Engineers</strong>
</p>

# React Frontend Breakdown

This document provides a detailed breakdown of the React features and concepts used in the content scheduler application.

## Project Structure

```
src/
├── app/                    # Next.js App Router structure
│   ├── (dashboard)/        # Route group for dashboard pages
│   │   ├── layout.tsx      # Layout shared across dashboard pages
│   │   ├── dashboard/
│   │   ├── scheduler/
│   │   ├── contents/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── logout/
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── context/                # React Context providers
│   └── ThemeContext.tsx    # Theme management context
└── node_modules/
```

## React Features Used

### 1. **Components**

React components are the building blocks of the UI.

**Functional Components:**
- All page files (`page.tsx`) are functional components
- Example from `dashboard/page.tsx`:
```jsx
export default function Dashboard() {
  return (
    <div>Dashboard content</div>
  );
}
```

### 2. **JSX (JavaScript XML)**

JSX allows writing HTML-like syntax in JavaScript:

```jsx
<header className={`sticky top-0 z-10 flex h-16`}>
  <h1 className="text-lg font-semibold">Dashboard</h1>
</header>
```

### 3. **State Management**

#### useState Hook
Used to manage local component state:

```jsx
const [sidebarOpen, setSidebarOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);
```

- `sidebarOpen`: Tracks whether the mobile sidebar is open
- `darkMode`: Tracks whether dark mode is active

### 4. **React Context**

#### Context API
Used for global state management across components:

1. **ThemeContext.tsx** - Creates the context
```jsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

2. **ThemeProvider** - Wraps the app and provides the context
```jsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

3. **useTheme** - Custom hook to access context values
```jsx
const { darkMode, toggleDarkMode } = useTheme();
```

### 5. **Custom Hooks**

Custom hooks encapsulate reusable logic:

```jsx
// In ThemeContext.tsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 6. **useContext Hook**

Used to access values from React Context:

```jsx
const { darkMode, toggleDarkMode } = useTheme();
```

### 7. **useEffect Hook**

Used for side effects and lifecycle events:

```jsx
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setDarkModeState(savedTheme === 'dark');
  }
}, []); // Empty dependency array means it runs once on mount
```

### 8. **usePathname Hook (Next.js)**

Next.js hook to get the current route:

```jsx
const pathname = usePathname(); // Returns current URL path
```

### 9. **Conditional Rendering**

Rendering different content based on state:

```jsx
<div className={`flex min-h-screen ${darkMode ? 'bg-[#0a0a0a] text-zinc-200' : 'bg-white text-zinc-800'}`}>
```

### 10. **Event Handling**

Handling user interactions:

```jsx
<button onClick={() => setSidebarOpen(!sidebarOpen)}>
  Toggle Menu
</button>
```

### 11. **Props**

Passing data between components:

```jsx
// Layout component receives children prop
export default function DashboardLayout({
  children,  // Children prop contains the page content
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar</aside>
      <main>{children}</main>  // Renders the page content here
    </div>
  );
}
```

### 12. **Styling with Tailwind CSS**

Utility-first CSS framework:

```jsx
<div className="flex min-h-screen bg-[#0a0a0a] text-zinc-200">
```

- `flex`: Makes element a flex container
- `min-h-screen`: Minimum height of viewport
- `bg-[#0a0a0a]`: Background color
- `text-zinc-200`: Text color

### 13. **Dynamic Class Names with Template Literals**

Conditionally applying CSS classes:

```jsx
className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}
```

### 14. **List Rendering with map()**

Rendering lists of components:

```jsx
{stats.map(({ id, title, value, icon, change, changeClass }) => (
  <div key={id}>
    <p>{title}</p>
    <p>{value}</p>
  </div>
))}
```

### 15. **Key Prop**

React requires a unique `key` prop for list items:

```jsx
<div key={id}>  // Each item in map() needs a unique key
```

### 16. **Children Prop Pattern**

The layout pattern passes page content via children:

```jsx
// In layout.tsx
<div className="flex-1">
  {children}  // Page content gets rendered here
</div>

// The page content inside this layout
// automatically becomes the children prop
```

### 17. **Navigation with Link**

Next.js Link component for client-side navigation:

```jsx
import Link from "next/link";

<Link href="/dashboard">
  <span>Dashboard</span>
</Link>
```

### 18. **Environment-Specific Code**

Code that runs differently in browser vs server:

```jsx
useEffect(() => {
  // This only runs in the browser
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
}, []);
```

### 19. **Reusability with Components**

Creating reusable component patterns across pages:

- All pages have the same header structure
- Same sidebar toggle functionality
- Same dark mode button functionality
- Same avatar display
- Same layout pattern

### 20. **Error Handling**

Safeguarding against context usage:

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## Key React Concepts Demonstrated

1. **Component Composition**: Pages are composed within layouts
2. **State Lifting**: Theme state is lifted to context for sharing
3. **Prop Drilling Alternative**: Context avoids passing props through multiple levels
4. **Conditional Rendering**: UI changes based on state
5. **Event Handling**: Buttons trigger state changes
6. **Side Effects**: Loading/saving theme preferences
7. **Custom Hooks**: Encapsulating reusable logic (useTheme)
8. **Performance**: Efficient rendering with proper keying in lists
9. **Separation of Concerns**: Context for state, components for UI
10. **Responsive Design**: Mobile/hidden classes in Tailwind
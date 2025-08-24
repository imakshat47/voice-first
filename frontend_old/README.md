# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
├── api/                 # Centralize API calls (e.g., authApi.js, chatApi.js)
├── assets/              # Static assets
├── components/
│   ├── auth/            # Login and Register form components
│   ├── chat/            # Chat specific components (ChatInterface, Message)
│   ├── common/          # Reusable components (Button, Spinner, Modal)
│   ├── dashboard/       # Dashboard widgets (ProfileCard, ExpenseChart, Checklist)
│   └── layout/          # Navbar, Footer, etc.
├── contexts/            # React contexts (AuthContext.jsx)
├── hooks/               # Custom hooks (e.g., useAuth.js)
├── i18n/                # Localization files
├── pages/               # Page-level components
├── store/               # Zustand state stores (e.g., chatStore.js)
├── utils/               # Utility functions (e.g., date formatters)
├── App.jsx
└── main.jsx

New Component Hierarchy:
Authentication:
pages/LoginPage.jsx
pages/RegisterPage.jsx
contexts/AuthContext.jsx (Manages user token and authentication state globally).
hooks/useAuth.js (A simple hook to easily access the AuthContext).
Dashboard (pages/DashboardPage.jsx):
components/dashboard/ProfileCard.jsx: Displays user info and role.
components/dashboard/ExpenseTracker.jsx: Contains logic for tracking expenses and uses recharts to display BudgetChart.jsx.
components/dashboard/DocumentChecklist.jsx: Manages and displays application checklists.
components/dashboard/SchemeFinder.jsx: The UI for NLP-based scheme search.
Chat Interface (pages/ChatPage.jsx):
components/chat/ChatInterface.jsx: The core component handling voice input/output, messages, and API calls. This makes the chat functionality reusable.
3. Voice-Enabled RAG System Integration (The Core Task)
We will refactor the ChatPage to use a dedicated ChatInterface component that fully embodies the RAG system's principles.
Implementation Steps:
Capture Microphone Input: Continue using react-speech-kit as it is already integrated. The logic will be encapsulated within ChatInterface.jsx.
Manage UI States: Create states to track the RAG pipeline:
isLoading: (Boolean) True when waiting for a response from the backend. Display a spinner or "thinking..." indicator.
isSpeaking: (Boolean) True when the browser's TTS is reading the response aloud. Display a speaker icon or soundwave animation.
Connect to Backend: Use axios to send the user's transcribed text to your FastAPI backend endpoint (/query). This call should be made inside an async function.
Receive and Render Response:
The backend should return a JSON object containing the response text and any citations or source links.
Render the response text in a new chat bubble.
Display the citations clearly below the response text.
Implement Text-to-Speech (TTS) for AI Responses:
Create a useEffect hook that triggers whenever a new message from the "bot" is added to the conversation.
Inside this hook, create a new SpeechSynthesisUtterance with the bot's response text.
Set the onstart event handler to set isSpeaking(true).
Set the onend event handler to set isSpeaking(false).
Call window.speechSynthesis.speak(utterance). Ensure any previously speaking utterance is cancelled via window.speechSynthesis.cancel().
4. New Feature Implementation
User Onboarding & Profile: This will be handled by our new AuthContext. After a successful login or registration, the user's token (JWT) is stored in localStorage, and the user object is stored in the context's state. ProfileCard.jsx on the dashboard will consume this context to display user details.
Government Scheme Discovery: SchemeFinder.jsx on the dashboard will feature a prominent input field where users can type or speak a natural language query (e.g., "Show me farming schemes for women in Gujarat"). This component will call a dedicated backend endpoint and render the structured results.
Expense & Budget Tracking: The ExpenseTracker.jsx component will manage an array of expense objects in its state. It will include a form to add new expenses and will pass the processed data to recharts components for visualization.
Checklist & Document Management: DocumentChecklist.jsx will be a stateful component managing a list of tasks. Users can add, remove, and check off items. This state can be saved to the backend associated with the user's profile.
Alerts & Guidance: Implement a Notifications.jsx component in the navbar. This component can periodically fetch new alerts from the backend based on the user's profile and display a small indicator when new notifications are available.
5. State Management Strategy
For this level of complexity, a hybrid approach is best:
React Context (AuthContext): Perfect for managing global, rarely updated authentication state (user, token, isAuthenticated). It's built into React and avoids extra dependencies for this specific use case.
Zustand (chatStore): Excellent for client-side state that changes frequently, like chat messages or dashboard data. It's much simpler than Redux. We can create a store to manage the chat session history, so it can be persisted or accessed across different components if needed.
Example: AuthContext
You'll create AuthContext.jsx which will provide a user object and login/logout functions. All components wrapped by its provider can access this information via the useAuth custom hook.
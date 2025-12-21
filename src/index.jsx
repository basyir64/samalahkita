import { StrictMode } from 'react'
import './index.css'
import './i18n';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './views/Layout';
import App from './views/App'
import Stories from './views/Stories';
import { ThemeProvider } from './theme-context';

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/stories/situation/:situationid" element={<Stories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

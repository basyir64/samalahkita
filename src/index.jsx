import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './views/App'
import './i18n';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Stories from './components/stories/Stories';

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stories/situation/:situationid" element={<Stories />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

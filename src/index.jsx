import { StrictMode } from 'react'
import './index.css'
import './i18n';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './views/Layout';
import App from './views/App'
import Stories from './views/Stories';
import { ThemeProvider } from './theme-context';
import PrivacyNotice from './views/PrivacyNotice';
import Disclaimer from './views/Disclaimer';

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename='/samalahkita/'>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/stories/situation/:situationid" element={<Stories />} />
            <Route path="/privacy-notice" element={<PrivacyNotice />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

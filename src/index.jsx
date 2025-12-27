import { StrictMode, useEffect } from 'react'
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
import ScrollToTop from './views/ScrollToTop';
import { useNavigate } from 'react-router';

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename='/samalahkita'>
        <RedirectHandler />
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<App />} />
            <Route path="/stories/situation/:situationid" element={<Stories />} />
            <Route path="/privacy-notice" element={<PrivacyNotice />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');

    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, []);

  return null;
}

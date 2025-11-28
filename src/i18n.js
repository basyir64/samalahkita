
import i18n, { loadNamespaces } from "i18next";
import { initReactI18next } from "react-i18next";
import app from './i18n/views/App.json'

const resources = { en: { views: {}, components: {} }, ms: { views: {}, components: {} } };
[app].forEach((file) => {
  Object.keys(file.en).forEach((key) => {
    resources.en.views[key] = file.en[key];
    resources.ms.views[key] = file.ms[key];
  });
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'views',
    ns: ['components', 'views'],
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
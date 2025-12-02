
import i18n, { loadNamespaces } from "i18next";
import { initReactI18next } from "react-i18next";
import GeneralButtonsAndLinks from './i18n/GeneralButtonsAndLinks.json'
import Stories from './i18n/views/Stories.json'
import Navbar from './i18n/components/navbar/Navbar.json'
import Face from './i18n/components/face/Face.json';
import CreateStoryModal from './i18n/components/stories/CreateStoryModal.json'
import ModalPage1 from './i18n/components/stories/ModalPage1.json'
import ModalPage2 from './i18n/components/stories/ModalPage2.json'
import ModalPage3 from './i18n/components/stories/ModalPage3.json'

const resources = { en: { views: {}, components: {} }, ms: { views: {}, components: {} } };
[GeneralButtonsAndLinks, Stories, Navbar, Face, CreateStoryModal, ModalPage1, ModalPage2, ModalPage3].forEach((file) => {
  Object.keys(file.en).forEach((key) => {
    resources.en.views[key] = file.en[key];
    resources.ms.views[key] = file.ms[key];
    resources.en.components[key] = file.en[key];
    resources.ms.components[key] = file.ms[key];
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
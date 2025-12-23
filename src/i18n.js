
import i18n, { loadNamespaces } from "i18next";
import { initReactI18next } from "react-i18next";
import GeneralButtonsAndLinks from './i18n/GeneralButtonsAndLinks.json'
import Stories from './i18n/views/Stories.json'
import Navbar from './i18n/components/navbar/Navbar.json'
import Face from './i18n/components/face/Face.json';
import CreateStoryModal from './i18n/components/stories/CreateStoryModal.json'
import CreateSituationModal from "./i18n/components/situations/CreateSituationModal.json";
import ModalPage1 from './i18n/components/stories/ModalPage1.json'
import ModalPage2 from './i18n/components/stories/ModalPage2.json'
import ModalPage3 from './i18n/components/stories/ModalPage3.json'
import Chart from "./i18n/components/chart/Chart.json";
import Feed from "./i18n/components/stories/Feed.json";
import PrivacyNoticeAndDisclaimer from "./i18n/views/PrivacyNoticeAndDisclaimer.json";

const resources = { eng: { views: {}, components: {} }, bm: { views: {}, components: {} } };
[GeneralButtonsAndLinks, Stories, Navbar, Face, CreateStoryModal, CreateSituationModal, 
  ModalPage1, ModalPage2, ModalPage3, Chart, Feed, PrivacyNoticeAndDisclaimer].forEach((file) => {
  Object.keys(file.eng).forEach((key) => {
    resources.eng.views[key] = file.eng[key];
    resources.bm.views[key] = file.bm[key];
    resources.eng.components[key] = file.eng[key];
    resources.bm.components[key] = file.bm[key];
  });
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'views',
    ns: ['components', 'views'],
    resources,
    lng: "eng", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
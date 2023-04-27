import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Cache
// import * as RNLocalize from 'react-native-localize';
// import 'localstorage-polyfill';

// import LanguageSelector from '../screens/Auth/LanguageSelector'

// console.log(globalThis.sl)




import kz from "./kz";
import ru from './ru';
import ch from './ch';

const LANGUAGES = {
    kz,
    ru,
    ch
};

// console.log(globalThis.iink)

const LANG_CODES = Object.keys(LANGUAGES);
i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    lng: 'ru',
    
    // fallbackLng:globalThis.sl,
    react:{
        useSuspense:false
    },
        interpolation: {
      escapeValue: false
    },

})

export default i18next;
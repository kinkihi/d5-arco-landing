'use client';
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';
type Lang = 'zh' | 'en';
const Language = createContext({
  lang: 'zh' as Lang,
  setLang: (_lang: Lang) => {},
  t: (zh: string, _en: string) => zh,
});
let clientLanguage: Lang | undefined;
function getLanguage(): Lang {
  if (clientLanguage) return clientLanguage;
  try {
    const value =
      new URLSearchParams(location.search).get('lang') ||
      localStorage.getItem('arco-language');
    clientLanguage = value === 'en' ? 'en' : 'zh';
  } catch {
    clientLanguage = 'zh';
  }
  return clientLanguage;
}
function subscribe(listener: () => void) {
  const storage = () => {
    clientLanguage = undefined;
    listener();
  };
  window.addEventListener('arco-language-change', listener);
  window.addEventListener('storage', storage);
  return () => {
    window.removeEventListener('arco-language-change', listener);
    window.removeEventListener('storage', storage);
  };
}
function setLanguage(lang: Lang) {
  clientLanguage = lang;
  try {
    localStorage.setItem('arco-language', lang);
  } catch {}
  window.dispatchEvent(new Event('arco-language-change'));
}
function getServerLanguage(): Lang {
  return 'zh';
}
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title =
      lang === 'zh'
        ? 'D5 Arco — 连接设计的每个阶段'
        : 'D5 Arco — A unified design workflow';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        lang === 'zh'
          ? '认识 D5 Arco。通过聊天、画布和 D5 工作流连接设计、创作与协作。'
          : 'Meet D5 Arco. Connect design, creation and collaboration through chat, canvas and the D5 workflow.',
      );
  }, [lang]);
  return (
    <Language.Provider
      value={{
        lang,
        setLang: setLanguage,
        t: (zh, en) => (lang === 'zh' ? zh : en),
      }}
    >
      {children}
    </Language.Provider>
  );
}
export const useLanguage = () => useContext(Language);
export function LanguageButtons() {
  const { lang, setLang } = useLanguage();
  return (
    <fieldset
      className="language-switch"
      aria-label={lang === 'zh' ? '语言' : 'Language'}
    >
      <button
        lang="zh-CN"
        aria-pressed={lang === 'zh'}
        onClick={() => setLang('zh')}
      >
        中文
      </button>
      <button
        lang="en"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </fieldset>
  );
}

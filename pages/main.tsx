import { createRoot } from 'react-dom/client';
import HomePage from '../app/page';
import SharePage from '../app/share/garden/page';
import '../app/globals.css';
import '../app/ui-blocks/studio.css';

const isSharePage = /\/share\/garden\/?$/.test(window.location.pathname);
createRoot(document.getElementById('root')!).render(isSharePage ? <SharePage /> : <HomePage />);

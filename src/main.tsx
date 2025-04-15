import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // <-- Added import for Provider
import App from './App.tsx';
import './index.css';
import store from './redux/store';

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
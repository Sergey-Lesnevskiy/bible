import { memo } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import App from '../../App';

/**
 * Do not edit this component
 * It is used to wrap the app and app global logic
 */
const Layout = memo(() => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
});
Layout.displayName = 'Layout';

export { Layout };

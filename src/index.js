import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Animecontext from './Context.js/Hianimecontext.js/Animecontext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ClerkProvider } from '@clerk/clerk-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_KEY
if (!PUBLISHABLE_KEY) {
  console.log('Missing Publishable Key')
}
root.render(
  <React.StrictMode>
    <Animecontext>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
            <App />
          </ClerkProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Animecontext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

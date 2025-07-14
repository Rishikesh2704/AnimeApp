import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { SignedIn, } from '@clerk/clerk-react';
import Home from './components/HomeSection/Home';
import Navbar from './components/Navbar';
import { Suspense } from 'react';
import LoadingPage from './components/LoadingPage';

function App() {
  const FavoritePage = lazy(() => import('./components/Favoritepage'))
  const SearchPage = lazy(() => import('./components/SearchPage'))
  const GenreAnimePage = lazy(() => import('./components/GenreAnimePage'))
  const Epstream = lazy(() => import('./components/StreamPage.js/Epstream'))

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },

    {
      path: "/Home",
      element: <Home />
    },

    {
      path: "/Favorites",
      element: <>
        <Navbar />
        <Suspense fallback={<LoadingPage />}>
          <SignedIn>
            <FavoritePage />
          </SignedIn>
        </Suspense>
      </>
    },

    {
      path: "/Search",
      element: <>
        <Navbar />
        <Suspense fallback={<LoadingPage />}>
          <SearchPage />
        </Suspense>
      </>
    },

    {
      path: "/genre/:id",
      element: <>
        <Navbar />
        <Suspense fallback={<LoadingPage />}>
          <GenreAnimePage />
        </Suspense>
      </>
    },

    {
      path: "/stream/:id",
      element: <>
        <Navbar />
        <Suspense fallback={<LoadingPage />}>
          <Epstream />
        </Suspense>
      </>
    },

  ])

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import LayOut from "./components/layout/LayOut";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import CounterContextProvider from "./context/counterContext";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostContextProvider from "./context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from './components/PostDetails/PostDetails';
import { Toaster } from 'react-hot-toast';

ReactQueryDevtools

function App() {
  
  let query = new QueryClient();
  const x = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "about", element: <About /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "PostDetails/:id", element: <PostDetails /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
        <Toaster />
          <CounterContextProvider>
            <QueryClientProvider client={query}>
          <ReactQueryDevtools/>
              <RouterProvider router={x} />
            </QueryClientProvider>
          </CounterContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

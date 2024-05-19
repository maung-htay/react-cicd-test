// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "@/pages/Posts.tsx";
import Login from "@/pages/Login.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/posts",
                element: <Posts />

            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            }
        ],
    }
])

function App() {


    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}

export default App

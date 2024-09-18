import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { router } from "./lib/router";

function App() {
    return (
        <main className="w-[100dvw] h-[100dvh] bg-background">
            <RouterProvider router={router} />
            <Toaster />
        </main>
    );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header.tsx";
import { Footer } from "./components/footer/Footer.tsx";
import { Provider } from "react-redux";
import { store } from "../store.ts";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey} afterSignOutUrl={"/"}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);

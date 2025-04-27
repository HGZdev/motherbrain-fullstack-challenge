import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FiltersProvider } from "./Context/FiltersContext.tsx";
import { client, ApolloProvider } from "../lib/apollo.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ApolloProvider>
  </React.StrictMode>
);

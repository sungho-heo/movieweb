import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import apllo from "./apllo.js"
import { ApolloProvider } from "@apollo/client"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ApolloProvider client={apllo}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

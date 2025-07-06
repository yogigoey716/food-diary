import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </SafeAreaProvider>
  );
}

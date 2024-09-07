import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { TaxesRouter } from "./router";

export const TaxesApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <TaxesRouter />
      </Provider>
    </BrowserRouter>
  );
};

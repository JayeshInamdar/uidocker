import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import i18n from "./helper/i18n";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ReservationFormDetails from "./pages/ReservationFormDetails";
import "./App.css";
import Loading from "./helper/Loading";
import LocaleContext from "./helper/LocaleContext";

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <Router>
          <HeaderComponent name="NRMA-Self Serve Portal" />
          <div className="container">
            <Switch>
              <Route path="/" exact component={ReservationFormDetails}></Route>
            </Switch>
          </div>
          <FooterComponent />
        </Router>
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default App;

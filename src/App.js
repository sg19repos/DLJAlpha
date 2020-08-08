import React, { useState } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import messages from './Core/i18n';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Home from './Components';
import ItemCategory from './Components/Common/itemCategoryPage';
import Favorites from './Components/Common/favorites';
import ItemDetails from './Components/Common/itemDetails';
import Checkout from './Components/Common/checkout';

function App() {
    const [locale, setLocale] = useState(
        localStorage.getItem('localValue') ? localStorage.getItem('localValue') : 'en',
    );
    const handleSwitch = (language) => {
        setLocale(language);
        localStorage.setItem('localValue', language);
    };
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {/* <HashRouter> */}
            <Switch>
                <Route
                    exact={true}
                    path="/"
                    component={() => <Home handleSwitch={handleSwitch} selectedLanguage={locale} />}
                />
                <Route
                    exact={true}
                    path="/home"
                    component={() => <Home handleSwitch={handleSwitch} selectedLanguage={locale} />}
                />
                <Route path="/categories/" component={ItemCategory} />
                <Route path="/favorites/" component={Favorites} />
                <Route path="/item/" component={ItemDetails} />
                <Route path="/checkout/" component={Checkout} />
                <Route
                    path="/*"
                    component={() => <Home handleSwitch={handleSwitch} selectedLanguage={locale} />}
                />
            </Switch>
            {/* </HashRouter> */}
        </IntlProvider>
    );
}

export default withRouter(App);

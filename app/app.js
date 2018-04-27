/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
// URLSearchParams垫片
import 'url-search-params-polyfill';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// antDesign组件中文化
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

// Import root app
import App from 'containers/App';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';


// Import CSS reset and Global Styles
import './global-styles';
import { getGlobal } from './utils/globalDataSave';
import { SERVER } from './utils/universalConst';

const MOUNT_NODE = document.getElementById('app');

// Create redux store with history
const initialState = { global: getGlobal() };
const history = createHistory();
const store = configureStore(initialState, history);

// apollo graphql
const client = new ApolloClient({
  uri: `${SERVER.PT}/graphql`,
});

const render = () => {
  ReactDOM.render((<Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>), MOUNT_NODE);
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

export { client };

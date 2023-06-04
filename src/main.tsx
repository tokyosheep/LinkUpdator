import React from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './pages/layout';
import { SaveabledMonitor } from './components/overlayer/saveabled';
import { GlobalStyle } from './styles/globalstyle';

import { store } from './redux/app/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <SaveabledMonitor />
    <Layout/>
  </Provider>
);
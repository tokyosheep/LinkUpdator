import React from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './pages/layout';
import { GlobalStyle } from './styles/globalstyle';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <GlobalStyle />
    <Layout/>
  </>
);
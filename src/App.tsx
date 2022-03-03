import { AppContent } from 'AppContent';
import React from 'react';
import { Layout } from 'uiw';

import styles from './styles/App.module.scss';
const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header className={styles.Header}>Welcome to Ainsley's EHG code test</Header>
      <Content className={styles.Content}>
        <AppContent />
      </Content>
      <Footer className={styles.Footer}>Copyright © 2022 Ainsley Cao</Footer>
    </Layout>
  );
};

export default App;

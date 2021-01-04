import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BuildForm } from './components/BuildForm'
import { BuildResults } from './components/BuildResults'
import { AddComponent } from './components/AddComponent';
import { Components } from './components/Components';
import { ComponentProvider } from './context/ComponentState';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import store from './redux/stores';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App card card-shadow">
      <Provider store={store}>
        <Header />
        <BuildForm />
        <BuildResults />
        <Components />
        <Footer />
      </Provider>
      {/* <ComponentProvider>
        <Header />
        <BuildForm />
        <BuildResults />
        <Components />
        <Footer />
      </ComponentProvider> */}
    </div>
  );
}

export default App;

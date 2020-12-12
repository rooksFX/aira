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

function App() {
  return (
    <div className="App card card-shadow">
      <ComponentProvider>
        {/* <Header /> */}
        {/* <Router>
          <Route path="/" exact component={Components}/>
          <Route path="/add" component={AddComponent}/>
          <Route path="/build" component={BuildForm}/>
        </Router> */}
        <BuildForm />
        <BuildResults />
        <Components />
        <AddComponent />
        <Footer />
      </ComponentProvider>
    </div>
  );
}

export default App;

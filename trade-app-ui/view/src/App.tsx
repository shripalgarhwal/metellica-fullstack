import * as React from 'react';
import './App.css';
import Header from './core/header';
import ContainerComponent from './features/container.component';

// import logo from './logo.svg';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <ContainerComponent />
      </div>
    );
  }
}

export default App;

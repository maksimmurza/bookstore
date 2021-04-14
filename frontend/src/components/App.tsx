import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen'

function App() {
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen} exact></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;

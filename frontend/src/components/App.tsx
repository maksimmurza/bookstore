import React from 'react';
import { Container } from 'react-bootstrap'
import './App.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen'

function App() {
  return (
    <>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;

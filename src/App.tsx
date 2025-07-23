import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header, Main } from './components';

import {HomePage, AboutPage, ArtworksPage, ContactPage} from './pages';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
          <Main>
            <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route path="/artwork" element={<Navigate to='paintings' replace />} />
              <Route path="/artwork/:tab" element={<ArtworksPage />} />

              <Route path="/about" element={<Navigate to='bio' replace />} />
              <Route path="/about/:tab" element={<AboutPage/>} />

              <Route path="/contact" element={<ContactPage/>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Main>

        <Footer/>
      </Router>
    </div>
  );
};

export default App;
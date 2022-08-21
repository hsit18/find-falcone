import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from "react-router-dom";
import FindFalconePage from './pages/FindFalconePage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <h1>Finding Falcone !</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<FindFalconePage />} />
          <Route path="result" element={<ResultPage />} />
        </Routes>
      </main>
    </>

  );
}

export default App;

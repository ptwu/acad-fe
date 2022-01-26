import React from 'react';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Footer from './components/Footer';
import Home from './components/Home';
import LearningPage from './components/LearningPage';
import NotFound from './components/NotFound';

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
      },
    },
    typography: {
      allVariants: {
        fontFamily: 'Hind Madurai',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.MainContainer}>
        <Typography variant="h4" className={styles.Logo}>
          a
          <strong className={styles.CyHeader}>成语</strong>
          a day
        </Typography>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="u" element={<LearningPage />}>
                <Route path=":id" element={<LearningPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

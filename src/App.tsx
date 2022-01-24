import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Footer from './components/Footer';
import Home from './components/Home/';

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
      <Typography variant="h4" className={styles.Logo}>
        a <strong className={styles.CyHeader}>成语</strong> a day
      </Typography>
      <div className={styles.BodyContainer}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="u" element={<NotFound />}>
                <Route path=":id" element={<NotFound />} />
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

function NotFound() {
  return <h2>404</h2>;
}

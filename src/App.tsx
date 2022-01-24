import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './css/App.module.css';
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
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="teams" element={<About />}>
              <Route path=":teamId" element={<Users />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <footer>Like the app?</footer>
    </ThemeProvider>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function NotFound() {
  return <h2>404</h2>;
}

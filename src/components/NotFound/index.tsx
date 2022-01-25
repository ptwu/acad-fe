import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="md" className={styles.Container}>
      <div className={styles.TextContainer}>
        <Typography variant="h1">404.</Typography>
        <Typography variant="h5">
          We couldn't find what you're looking for 😭.{' '}
          <Link to="/">Click here</Link> to go back to the homepage.
          <br />
          (您访问的页面不存在。)
        </Typography>
      </div>
    </Container>
  );
}

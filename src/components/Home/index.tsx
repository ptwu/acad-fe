import {
  Typography,
  Container,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import UrlField from '../UrlField';
import styles from './index.module.css';

export default function Home(): ReactElement {
  const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  const handleLinkGeneration = async () => {
    setIsLinkOpen(true);
    // await calls here
    setLink('https://www.youtube.com/watch?v=q6EoRBvdVPQ');
  };

  return (
    <Container className={styles.Section}>
      <Typography variant="h3" className={styles.CTAText}>
        Learn more <strong>idiom</strong>atic Chinese, on the daily.
      </Typography>
      {!isLinkOpen && (
        <>
          <Typography variant="h5" className={styles.CTAText}>
            Get started by grabbing a unique link here (no signup required!):
          </Typography>
          <Box textAlign="center">
            <Button
              variant="outlined"
              className={styles.CTAButton}
              onClick={handleLinkGeneration}
            >
              let's go!
            </Button>
          </Box>
        </>
      )}
      <Box textAlign="center">
        {isLinkOpen && link !== '' && (
          <>
            <Container maxWidth="sm">
              <UrlField url={link} className={styles.Url} />
              <Typography variant="h6" className={styles.Subtitle}>
                <strong>Bookmark this URL!</strong> It contains the progress for
                your chengyu learning journey. (We recommend setting it as one
                of your starting tabs when you open your browser, so you won't
                forget to learn every day 🙂)
              </Typography>
            </Container>
          </>
        )}
        {isLinkOpen && link === '' && (
          <CircularProgress className={styles.Loading} />
        )}
      </Box>
    </Container>
  );
}

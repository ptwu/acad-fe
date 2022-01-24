import {
  Typography,
  Container,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import styles from './index.module.css';

export default function Home(): ReactElement {
  const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  const handleLinkGeneration = async () => {
    setIsLinkOpen(true);
    // await calls here
    setLink('https://google.com');
  };

  return (
    <Container className={styles.Section}>
      <Typography variant="h3" className={styles.CTAText}>
        learn more <strong>idiom</strong>atic Chinese, on the daily.
      </Typography>
      {!isLinkOpen && (
        <>
          <Typography variant="h5" className={styles.CTAText}>
            get started by grabbing a unique link here (no signup required!):
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
      {isLinkOpen && link !== '' && <h3>{link}</h3>}
      {isLinkOpen && link === '' && (
        <Box textAlign="center">
          <CircularProgress className={styles.Loading} />
        </Box>
      )}
    </Container>
  );
}

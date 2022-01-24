import { Typography, Container, Button, Box } from '@mui/material';
import { ReactElement, useState } from 'react';
import styles from './index.module.css';

export default function Home(): ReactElement {
  const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);

  return (
    <Container className={styles.Section}>
      <Typography variant="h3" className={styles.CTAText}>
        learn more <strong>idiom</strong>atic Chinese, on the daily.
      </Typography>
      <Typography variant="h5" className={styles.CTAText}>
        get started by grabbing a unique link here (no signup required!):
      </Typography>
      <Box textAlign="center">
        <Button variant="outlined" className={styles.CTAButton}>
          let's go!
        </Button>
      </Box>
    </Container>
  );
}

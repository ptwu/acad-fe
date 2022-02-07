// eslint-disable-next-line object-curly-newline
import {
  Alert,
  Box,
  Card,
  Fab,
  LinearProgress,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './index.module.css';
import { API_URL } from '../../data/types';

type Props = {
  readonly front: string;
  readonly pinyin: string;
  readonly definition: string;
  readonly userId: string;
};
export default function Flashcard({
  front,
  pinyin,
  definition,
  userId,
}: Props) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false); // true if user wants to review again
  const [isReviewAlertOn, setReviewAlertOn] = useState<boolean>(false);
  const [isErrorAlertOn, setErrorAlertOn] = useState<boolean>(false);
  const [isSuccessAlertOn, setSuccessAlertOn] = useState<boolean>(false);
  const handleClick = () => setIsFlipped(!isFlipped);

  const handleCardReviewedClick = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/api/review-card/${userId}`, {
      method: 'POST',
    });
    setIsLoading(false);
    if (response.ok) {
      setIsDone(true);
      setSuccessAlertOn(true);
    } else {
      setErrorAlertOn(true);
    }
  };

  const handleCardRedoClick = () => {
    setIsDone(true);
    setReviewAlertOn(true);
  };

  return (
    <div className={styles.Wrapper}>
      <Snackbar
        open={isReviewAlertOn}
        autoHideDuration={6000}
        onClose={() => setReviewAlertOn(false)}
      >
        <Alert
          onClose={() => setReviewAlertOn(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          Thanks for reviewing! We&apos;ll show you this card again next time.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorAlertOn}
        autoHideDuration={6000}
        onClose={() => setErrorAlertOn(false)}
      >
        <Alert
          onClose={() => setErrorAlertOn(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          There was an error when trying to review this card :/. Try doing it
          again!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSuccessAlertOn}
        autoHideDuration={6000}
        onClose={() => setSuccessAlertOn(false)}
      >
        <Alert
          onClose={() => setSuccessAlertOn(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Successfully reviewed! See you next time.
        </Alert>
      </Snackbar>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card className={styles.OuterCard} onClick={handleClick}>
          {isLoading && <LinearProgress />}
          <Box textAlign="center" className={styles.FlashcardContainer}>
            <Typography variant="h3">{front}</Typography>
          </Box>
        </Card>

        <Card>
          {isLoading && <LinearProgress />}
          <Box textAlign="center" className={styles.FlashcardContainer}>
            <Typography variant="h3">{front}</Typography>
            <Typography variant="h5" className={styles.PinyinText}>
              {pinyin}
            </Typography>
            <Typography variant="subtitle1">{definition}</Typography>
            {!isLoading && !isDone && (
              <>
                <Tooltip title="Mark idiom reviewed">
                  <Fab
                    size="medium"
                    color="primary"
                    aria-label="check"
                    className={styles.Fab}
                    onClick={handleCardReviewedClick}
                  >
                    <CheckIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Review again next time">
                  <Fab
                    size="medium"
                    color="default"
                    aria-label="review"
                    onClick={handleCardRedoClick}
                  >
                    <ReplayIcon />
                  </Fab>
                </Tooltip>
              </>
            )}
            {isDone && <CheckCircleOutlineIcon />}
          </Box>
        </Card>
      </ReactCardFlip>
    </div>
  );
}

// eslint-disable-next-line object-curly-newline
import {
  Box,
  Card,
  Fab,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import styles from './index.module.css';

type Props = {
  readonly front: string;
  readonly pinyin: string;
  readonly definition: string;
};
export default function Flashcard({ front, pinyin, definition }: Props) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => setIsFlipped(!isFlipped);

  const handleCardReviewedClick = () => {
    setIsLoading(true);
  };

  const handleCardRedoClick = () => {
    setIsLoading(true);
  };

  return (
    <div className={styles.Wrapper}>
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
            <Typography variant="h5">{pinyin}</Typography>
            <Typography variant="subtitle1">{definition}</Typography>
            {!isLoading && (
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
          </Box>
        </Card>
      </ReactCardFlip>
    </div>
  );
}

/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  LinearProgress,
  styled,
  Typography,
  Switch,
  Container,
  Grid,
  Tooltip,
  Button,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, UserData } from '../../data/types';
import styles from './index.module.css';
import chengyuData from '../../data/chengyu.json';
import FantiIcon from '../../assets/fanti.png';
import JiantiIcon from '../../assets/jianti.png';
import Flashcard from '../Flashcard';
import NotFound from '../NotFound';

export default function LearningPage(): ReactElement {
  const { id } = useParams();
  const [idiomsModalOpen, setIdiomsModalOpen] = useState<boolean>(false);
  const [isErrorAlertOn, setErrorAlertOn] = useState<boolean>(false);
  const [data, setData] = useState<UserData | null>(null);
  const [is404, setIs404] = useState<boolean>(false);

  const changeCharacterBasis = () => {
    if (data === null) {
      throw new Error('data for user is not defined!');
    }
    fetch(
      `${API_URL}/api/switch-basis/${id}?is-traditional=${!data.usesTraditional}`,
      {
        method: 'POST',
      }
    ).catch((rej) => setErrorAlertOn(true));
    setData({ ...data, usesTraditional: !data.usesTraditional });
  };

  useEffect(() => {
    // async call here (get data)
    const diff = -(new Date().getTimezoneOffset() / 60);
    fetch(`${API_URL}/api/user/${id}?offset=${diff}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((rej) => {
        setIs404(true);
      });
  }, []);

  const date = new Date();
  const dateString = [
    date.getFullYear(),
    `0 ${date.getMonth() + 1}`.slice(-2).trim(),
    `0 ${date.getDate()}`.slice(-2),
  ].join(' · ');

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url(${FantiIcon})`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${JiantiIcon})`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  if (is404) {
    return <NotFound />;
  }

  return (
    <>
      {data !== null && id !== undefined ? (
        <Box className={styles.OuterBox}>
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
              There was an error when trying to switch to{' '}
              {data.usesTraditional ? 'Simplified' : 'Traditional'} Chinese.
              Please try again.
            </Alert>
          </Snackbar>
          <Modal
            open={idiomsModalOpen}
            onClose={() => setIdiomsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Past idioms up to today ({data.totalLearned + 1} total)
              </Typography>
              {chengyuData
                .slice(0, data.totalLearned + 1)
                .map(({ simplified, traditional }) =>
                  data.usesTraditional ? (
                    <Typography key={`${traditional}`}>
                      {traditional}
                    </Typography>
                  ) : (
                    <Typography key={`${simplified}`}>{simplified}</Typography>
                  )
                )}
            </Box>
          </Modal>
          <Box textAlign="center">
            <Tooltip
              title={
                data.usesTraditional
                  ? 'Switch to Simplified Chinese (简体字)'
                  : 'Switch to Traditional Chinese (繁體字)'
              }
            >
              <MaterialUISwitch
                checked={data.usesTraditional}
                sx={{ m: 1 }}
                onChange={changeCharacterBasis}
              />
            </Tooltip>
          </Box>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3">{dateString}</Typography>
                <Typography variant="h2">
                  {data.usesTraditional
                    ? chengyuData[data.totalLearned].traditional
                    : chengyuData[data.totalLearned].simplified}
                </Typography>
                <Typography variant="h4" className={styles.PinyinText}>
                  {chengyuData[data.totalLearned].pinyin}
                </Typography>
                <Typography variant="h6">
                  {chengyuData[data.totalLearned].explanation}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  className={styles.StatsSubtitle}
                >
                  YOUR STATS
                </Typography>
                {data.highestStreak < 1 && (
                  <Typography>
                    No stats to show right now! Come back tomorrow and onward to
                    see your stats across your chengyu learning journey.
                  </Typography>
                )}
                {data.highestStreak > 0 && (
                  <>
                    <Typography variant="h5">
                      🔥 You&apos;ve been at it for{' '}
                      <b>
                        {data.streak} {data.streak === 1 ? 'day' : 'days'}
                      </b>
                      {data.streak >= 1 && data.streak < 10 && '. Keep going'}
                      {data.streak >= 10 && data.streak < 20 && '. Awesome'}
                      {data.streak >= 20 &&
                        data.streak < 50 &&
                        '. Great stuff!'}
                      {data.streak >= 50 && data.streak < 100 && '. 好牛'}
                      {data.streak === 100 && '. Here&apos;s to 💯!'}!
                      {data.streak >= 100 &&
                        '. You&apos;re setting new standards'}
                      !
                    </Typography>
                    <Typography variant="h5">
                      {data.highestStreak === data.streak
                        ? "🏆 Record setter: you're currently on your highest streak!"
                        : `🏆 Your highest streak of all-time was ${
                            data.highestStreak
                          } ${data.highestStreak === 1 ? 'day' : 'days'}.`}
                    </Typography>
                  </>
                )}

                <Typography variant="h5">
                  {data.reviewPoints === 0 &&
                    data.totalLearned > 0 &&
                    "🔁 You haven't successfully reviewed any idioms! Click the flashcard below to try it out."}
                </Typography>
                <Typography variant="h5">
                  {data.reviewPoints === 1 &&
                    `🔁 You've reviewed ${data.reviewPoints} idiom. Keep trucking on!`}
                  {data.reviewPoints > 1 &&
                    data.reviewPoints < 10 &&
                    `🔁 You've reviewed ${data.reviewPoints} idioms. Nice job!`}
                  {data.reviewPoints >= 10 &&
                    data.reviewPoints < 50 &&
                    `🔁 You've reviewed ${data.reviewPoints} idioms. You're getting good at this!`}
                  {data.reviewPoints >= 50 &&
                    `🔁 You've reviewed ${data.reviewPoints} idioms. You're practically a 高手!`}
                </Typography>

                <Typography
                  variant="subtitle1"
                  className={styles.ReviewSubtitle}
                >
                  DAILY REVIEW{' '}
                  {data.reviewPoints === 0 && '(click the flashcard below!)'}
                </Typography>
                {data.totalLearned === 0 ? (
                  <Typography>No cards to review yet!</Typography>
                ) : (
                  <>
                    {data.reviewPoints !== data.totalLearned ? (
                      <Flashcard
                        front={
                          data.usesTraditional
                            ? chengyuData[data.reviewPoints].traditional
                            : chengyuData[data.reviewPoints].simplified
                        }
                        pinyin={chengyuData[data.reviewPoints].pinyin}
                        definition={chengyuData[data.reviewPoints].explanation}
                        userId={id}
                      />
                    ) : (
                      <Typography className={styles.FinishedText}>
                        Great job staying on top of things! You have no more
                        cards to review.
                      </Typography>
                    )}

                    <Button
                      onClick={() => setIdiomsModalOpen(true)}
                      variant="outlined"
                      className={styles.BottomButton}
                    >
                      View Idiom History
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}

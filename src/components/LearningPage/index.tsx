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
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserData } from '../../data/types';
import styles from './index.module.css';
import chengyuData from '../../data/chengyu.json';
import FantiIcon from '../../assets/fanti.png';
import JiantiIcon from '../../assets/jianti.png';
import Flashcard from '../Flashcard';

export default function LearningPage(): ReactElement {
  const { id } = useParams();
  const [idiomsModalOpen, setIdiomsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserData | null>(null);

  const changeCharacterBasis = () => {
    if (data === null) {
      throw new Error('data for user is not defined!');
    }
    // async call here
    setData({ ...data, usesTraditional: !data.usesTraditional });
  };

  useEffect(() => {
    // async call here (get data)
    setData({
      streak: 5,
      highestStreak: 10,
      totalLearned: 200,
      reviewPoints: 6,
      lastLearned: 1643076860132,
      usesTraditional: false,
    });
    // async call here (post today reviewed)
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

  return (
    <Box className={styles.OuterBox}>
      {data !== null ? (
        <>
          <Modal
            open={idiomsModalOpen}
            onClose={() => setIdiomsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Past idioms up to today ({data.totalLearned} total)
              </Typography>
              {chengyuData
                .slice(0, data.totalLearned + 1)
                .map(({ simplified, traditional }) =>
                  data.usesTraditional ? (
                    <Typography>{traditional}</Typography>
                  ) : (
                    <Typography>{simplified}</Typography>
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
                <Typography variant="h4" style={{ fontWeight: '300' }}>
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
                <Typography variant="h5">
                  🔥 You&apos;ve been at it for {data.streak} days!
                </Typography>
                <Typography variant="h5">
                  🏆 Your highest streak of all-time was {data.highestStreak}{' '}
                  days.
                </Typography>
                <Typography variant="h5">
                  🔁 You&apos;ve reviewed {data.reviewPoints} idioms.
                </Typography>

                <Typography
                  variant="subtitle1"
                  className={styles.ReviewSubtitle}
                >
                  DAILY REVIEW (click the flashcard to reveal)
                </Typography>
                <Flashcard
                  front={
                    data.usesTraditional
                      ? chengyuData[data.reviewPoints].traditional
                      : chengyuData[data.reviewPoints].simplified
                  }
                  pinyin={chengyuData[data.reviewPoints].pinyin}
                  definition={chengyuData[data.reviewPoints].explanation}
                />
                <Button
                  onClick={() => setIdiomsModalOpen(true)}
                  variant="outlined"
                  className={styles.BottomButton}
                >
                  View Idiom History
                </Button>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

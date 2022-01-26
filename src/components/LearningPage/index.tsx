/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Container,
  LinearProgress,
  NoSsr,
  Snackbar,
  styled,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deflate } from 'zlib';
import { UserData } from '../../data/types';
import styles from './index.module.css';
import chengyuData from '../../data/chengyu.json';
import FantiIcon from '../../assets/fanti.png';
import JiantiIcon from '../../assets/jianti.png';

export default function LearningPage(): ReactElement {
  const { id } = useParams();
  // const [data, setData] = useState<Omit<UserData, 'userId'> | null>(null);
  const [data, setData] = useState<UserData | null>({
    streak: 5,
    highestStreak: 10,
    totalLearned: 20,
    reviewPoints: 6,
    lastLearned: 1643076860132,
  });

  const date = new Date();
  const dateString = [
    date.getFullYear(),
    `0 ${date.getMonth() + 1}`.slice(-2).trim(),
    `0 ${date.getDate()}`.slice(-2),
  ].join(' · ');

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
    <Box textAlign="center" className={styles.OuterBox}>
      {data !== null ? (
        <>
          <MaterialUISwitch sx={{ m: 1 }} defaultChecked />
          <Typography variant="h4">{dateString}</Typography>
          <Typography variant="h2">
            {chengyuData[data.totalLearned].simplified}
          </Typography>
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

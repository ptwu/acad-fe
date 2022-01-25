import {
  Alert,
  Container,
  LinearProgress,
  NoSsr,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserData } from '../../data/types';
import './index.module.css';

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

  return (
    <>{data !== null ? <Container>Welcome!</Container> : <LinearProgress />}</>
  );
}

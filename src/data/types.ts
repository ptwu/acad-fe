export const MAX_CHENGYU_NUMBER = 258;

export const API_URL = 'http://127.0.0.1:8080';

export type NewUserResponse = {
  readonly id: string;
  readonly message: string;
};

export type UserDataWithId = {
  readonly id: string; // not tied to the user's actual identity, purely a string
  readonly streak: number; // current daily streak
  readonly highestStreak: number; // number of highest streak ever
  readonly totalLearned: number; // total number of chengyu learned
  readonly reviewPoints: number;
  readonly lastLearned: number; // unix timestamp of last the user was seen
  readonly usesTraditional: boolean;
};

export type UserData = Omit<UserDataWithId, 'id'>;

export type DailyQuizPayload = {
  readonly userId: string; // not tied to the user's actual identity, purely a string
  readonly correct: boolean;
};

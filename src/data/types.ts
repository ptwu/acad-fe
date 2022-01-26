export type UserDataWithId = {
  readonly userId: string; // not tied to the user's actual identity, purely a string
  readonly streak: number; // current daily streak
  readonly highestStreak: number; // number of highest streak ever
  readonly totalLearned: number; // total number of chengyu learned
  readonly reviewPoints: number;
  readonly lastLearned: number; // unix timestamp of last the user was seen
  readonly usesTraditional: boolean;
};

export type UserData = Omit<UserDataWithId, 'userId'>;

export type DailyQuizPayload = {
  readonly userId: string; // not tied to the user's actual identity, purely a string
  readonly correct: boolean;
};

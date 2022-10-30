import { User } from './user.interface';

export interface Library {
  results: Array<User>;
  info: [{ seed: string; results: number; page: number; version: number }];
}

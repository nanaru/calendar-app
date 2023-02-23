import { TrainingMenu } from './TrainingMenu';

export type AgendaEntry = {
  docId: string;
  date: string;
  title: string;
  subTitle: string;
  color: string;
  content: string;
  trainingMenu: TrainingMenu;
};

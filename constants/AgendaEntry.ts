import { TrainingMenu } from './TrainingMenu';

export type AgendaEntry = {
  docId: string;
  date: string;
  title: string;
  subTitle: string;
  iconPath: string;
  content: string;
  trainingMenu: TrainingMenu;
};

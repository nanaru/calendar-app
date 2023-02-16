import { Set } from './Set';
import { DocumentReference } from 'firebase/firestore';

export type TrainingMenu = {
  menu_id: DocumentReference<unknown>;
  memo: string;
  sort_at: number;
  set: Set[];
};

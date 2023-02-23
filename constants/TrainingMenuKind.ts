import { RmKind } from 'constants/RmKind';

export type TrainingMenuKind = {
  name: string;
  sort_at: number;
  color: string;
  rm_kind?: RmKind;
};

export type TrainingMenuKindsInSelectBox = {
  docId: string;
  trainingMenuKind: TrainingMenuKind;
};

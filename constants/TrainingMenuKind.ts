import { RmKind } from 'constants/RmKind';

export type TrainingMenuKind = {
  name: string;
  sort_at: number;
  path: string;
  rm_kind?: RmKind;
};

export type TrainingMenuKindsInSelectBox = {
  docId: string;
  trainingMenuKind: TrainingMenuKind;
};

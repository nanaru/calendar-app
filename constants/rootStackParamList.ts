import { TrainingMenuKindsInSelectBox } from './TrainingMenuKind';

// ルートをまとめたオブジェクト
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  NewTrainingMenuForm: { date: string; trainingDicInSelectBox: TrainingMenuKindsInSelectBox[] };
  EditTrainingMenuForm: undefined;
};

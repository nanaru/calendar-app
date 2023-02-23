import { TrainingMenuKindsInSelectBox } from './TrainingMenuKind';
import { AgendaEntry } from './AgendaEntry';

// ルートをまとめたオブジェクト
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: { date?: string };
  NewTrainingMenuForm: { date: string; trainingDicInSelectBox: TrainingMenuKindsInSelectBox[] };
  EditTrainingMenuForm: {
    agenda: AgendaEntry;
    trainingDicInSelectBox: TrainingMenuKindsInSelectBox[];
  };
};

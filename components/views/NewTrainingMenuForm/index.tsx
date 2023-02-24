import React from 'react';
import { Center, Box } from 'native-base';
import Loading from 'components/templates/Loading';
import TrainingDate from 'components/templates/TrainingDate';
import TrainingMenu from 'components/templates/TrainingMenu';
import TrainingSetAndRepList from 'components/templates/TrainingSetAndRepList';
import TrainingMemo from 'components/templates/TrainingMemo';
import ResistTrainingMenuFormButton from 'components/parts/ResistTrainingMenuFormButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useHooks from './useHook';

const NewTrainingMenuForm = () => {
  const {
    date,
    isValidQuery,
    trainingMenu,
    trainingDicInSelectBox,
    errors,
    handleChangeInTrainingDate,
    handleChangeInTrainingMenu,
    handleInputInWeight,
    handleInputInRep,
    handleInputInTrainingMemo,
    save,
  } = useHooks();

  return (
    <>
      {/* ローディングコンポーネント */}
      <Loading isLoading={isValidQuery} />
      <KeyboardAwareScrollView>
        <Center w='100%'>
          <Box mt='4' w='100%'>
            {/* 日付 */}
            <TrainingDate
              date={date}
              disabled={false}
              errors={errors}
              handleChangeInDate={handleChangeInTrainingDate}
            />
          </Box>
          <Box mt='4' w='100%'>
            {/* 種目名 */}
            <TrainingMenu
              trainingDicInSelectBox={trainingDicInSelectBox}
              errors={errors}
              handleChangeInTrainingMenu={handleChangeInTrainingMenu}
            />
          </Box>
          <Box mt='4' w='100%'>
            {/* 記録 */}
            <TrainingSetAndRepList
              sets={trainingMenu.set}
              errors={errors}
              handleInputInWeight={handleInputInWeight}
              handleInputInRep={handleInputInRep}
            />
          </Box>
          <Box mt='4' w='100%'>
            {/* メモ */}
            <TrainingMemo
              memo={trainingMenu.memo}
              errors={errors}
              handleInputInTrainingMemo={handleInputInTrainingMemo}
            />
          </Box>
        </Center>
        {/* 保存ボタン */}
      </KeyboardAwareScrollView>
      <ResistTrainingMenuFormButton onPress={save} />
    </>
  );
};
export default NewTrainingMenuForm;

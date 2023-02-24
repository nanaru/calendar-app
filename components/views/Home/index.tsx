import React, { FC, useState } from 'react';
import { StyleSheet, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { ListItem } from '@rneui/themed';
import { HStack, VStack, Avatar } from 'native-base';
import { AgendaEntry } from 'constants/AgendaEntry';
import EditTrainingMenuButton from 'components/parts/EditTrainingMenuButton';
import DeleteTrainingMenuButton from 'components/parts/DeleteTrainingMenuButton';
import OpenNewTrainingMenuFormButton from 'components/parts/OpenNewTrainingMenuFormButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';
import useHooks from './useHook';

export type Props = {
  color: string;
  title: string;
  subTitle: string;
  content: string;
  editTrainingMenuButtonOnPress: (e: GestureResponderEvent) => void;
  deleteTrainingMenuButtonOnPress: (e: GestureResponderEvent) => void;
};

const styles = StyleSheet.create({
  subTitle: {
    color: '#888',
    fontSize: 12,
  },
  item: {
    marginTop: 17,
  },
  itemText: {
    fontSize: 14,
  },
  accordion: {
    width: '100%',
  },
});
LocaleConfig.locales.jp = {
  monthNames: [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月',
  ],
  monthNamesShort: [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月',
  ],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

const AccordionListItem: FC<Props> = ({
  color,
  title,
  subTitle,
  content,
  editTrainingMenuButtonOnPress,
  deleteTrainingMenuButtonOnPress,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <EditTrainingMenuButton onPress={editTrainingMenuButtonOnPress} onPressOut={reset} />
      )}
      rightContent={(reset) => (
        <DeleteTrainingMenuButton onPress={deleteTrainingMenuButtonOnPress} onPressOut={reset} />
      )}
    >
      <ListItem.Content>
        <ListItem.Accordion
          content={
            <HStack space={4} alignItems='center' width='90%'>
              <Avatar bg={color} size={6} borderRadius={4} />
              <VStack space={1} justifyContent='start'>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle style={styles.subTitle}>{subTitle}</ListItem.Subtitle>
              </VStack>
            </HStack>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          style={styles.accordion}
        >
          <Text style={styles.itemText}>{content}</Text>
        </ListItem.Accordion>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const {
    agendaSchedule,
    isValidQuery,
    date,
    setDate,
    trainingDicInSelectBox,
    fetchTrainingSummaries,
    deleteTrainingMenu,
  } = useHooks();

  return (
    <>
      {isValidQuery && (
        // カレンダー
        <Agenda
          monthFormat={'yyyy年 M月'}
          // NOTE: items,renderItemで任意のプロパティを渡せないためエラーが出るが無視する
          items={agendaSchedule}
          renderItem={(item: AgendaEntry, isFirst) => (
            <ScrollView removeClippedSubviews>
              <TouchableOpacity style={styles.item}>
                <AccordionListItem
                  color={item.color}
                  title={item.title}
                  subTitle={item.subTitle}
                  content={item.content}
                  editTrainingMenuButtonOnPress={() =>
                    navigation.navigate('EditTrainingMenuForm', {
                      agenda: item,
                      trainingDicInSelectBox: trainingDicInSelectBox,
                    })
                  }
                  deleteTrainingMenuButtonOnPress={() => deleteTrainingMenu(item.date, item.docId)}
                />
              </TouchableOpacity>
            </ScrollView>
          )}
          selected={date}
          refreshing={true}
          showOnlySelectedDayItems={true}
          renderDay={(day, item) => {
            // 日付を表示させないための処理
            return <View />;
          }}
          loadItemsForMonth={(month) => {
            fetchTrainingSummaries(month.year, month.month);
          }}
          onDayPress={(day) => {
            setDate(day.dateString);
          }}
        />
      )}
      {/* トレーニング追加画面表示ボタン */}
      <OpenNewTrainingMenuFormButton
        onPress={() =>
          navigation.navigate('NewTrainingMenuForm', {
            date: date,
            trainingDicInSelectBox: trainingDicInSelectBox,
          })
        }
      />
    </>
  );
};

export default Home;

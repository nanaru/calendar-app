import React, { FC, useState } from 'react';
import { StyleSheet, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { ListItem, Icon } from '@rneui/themed';
import { HStack, VStack } from 'native-base';
import EditTrainingMenuButton from 'components/parts/EditTrainingMenuButton';
import DeleteTrainingMenuButton from 'components/parts/DeleteTrainingMenuButton';

export type AgendaEntry = {
  title: string;
  subTitle: string;
  iconPath: string;
  content: string;
};

export type Props = {
  iconPath: string;
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
  iconPath,
  title,
  subTitle,
  content,
  editTrainingMenuButtonOnPress,
  deleteTrainingMenuButtonOnPress,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Swipeable
      leftContent={() => <EditTrainingMenuButton onPress={editTrainingMenuButtonOnPress} />}
      rightContent={() => <DeleteTrainingMenuButton onPress={deleteTrainingMenuButtonOnPress} />}
    >
      <ListItem.Content>
        <ListItem.Accordion
          content={
            <HStack space={4} justifyContent='space-around' alignItems='center'>
              <Icon name={iconPath} size={30} />
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
        >
          <Text style={styles.itemText}>{content}</Text>
        </ListItem.Accordion>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

const Home = () => {
  // TODO APIからレスポンスした結果を格納する
  const [items, setItems] = useState<{ [key: string]: AgendaEntry[] }>({
    '2023-02-11': [
      {
        title: 'ダンベルローイング',
        subTitle: '3セット / ボリューム 1,080.10kg / 1RM 75kg',
        content: `■ 記録${'\n\n'}1セット目 10kg 2reps${'\n'}2セット目 10kg 2reps${'\n'}3セット目 10kg 2reps${'\n\n\n'}■ メモ${'\n\n'}メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ`,
        iconPath: 'open-in-full',
      },
      {
        title: 'ダンベルローイング',
        subTitle: '3セット / ボリューム 1,080.10kg / 1RM 75kg',
        content: `■ 記録${'\n\n'}1セット目 10kg 2reps${'\n'}2セット目 10kg 2reps${'\n'}3セット目 10kg 2reps${'\n\n\n'}■ メモ${'\n\n'}メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ`,
        iconPath: 'open-in-full',
      },
      {
        title: 'ダンベルローイング',
        subTitle: '3セット / ボリューム 1,080.10kg / 1RM 75kg',
        content: `■ 記録${'\n\n'}1セット目 10kg 2reps${'\n'}2セット目 10kg 2reps${'\n'}3セット目 10kg 2reps${'\n\n\n'}■ メモ${'\n\n'}メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ`,
        iconPath: 'open-in-full',
      },
    ],
  });

  return (
    <Agenda
      monthFormat={'yyyy年 M月'}
      // NOTE: items,renderItemで任意のプロパティを渡せないためエラーが出るが無視する
      items={items}
      renderItem={(item: AgendaEntry, isFirst) => (
        <TouchableOpacity style={styles.item}>
          <AccordionListItem
            iconPath={item.iconPath}
            title={item.title}
            subTitle={item.subTitle}
            content={item.content}
            editTrainingMenuButtonOnPress={() => console.log('edit button click')}
            deleteTrainingMenuButtonOnPress={() => console.log('delete button click')}
          />
        </TouchableOpacity>
      )}
      showOnlySelectedDayItems={true}
      renderDay={(day, item) => {
        // 日付を表示させないための処理
        return <View />;
      }}
    />
  );
};

export default Home;

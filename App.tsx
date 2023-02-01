import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { NativeBaseProvider, Factory, Flex } from 'native-base';
import Accordion from '@gapur/react-native-accordion';

const INITIAL_DATE = moment().format('YYYY-MM-DD');

export default function App() {
  const FactoryView = Factory(View);

  return (
    <SafeAreaView>
      <View style={{ height: '100%' }}>
        <Agenda
          enableSwipeMonths={true}
          monthFormat={'yyyy年 M月'}
          items={{
            '2023-01-01': [{ name: 'Cycling' }, { name: 'Walking' }, { name: 'Running' }],
            '2023-01-02': [{ name: 'Writing', height: 100 }],
            '2023-01-14': [{ name: 'Writing2', height: 100 }],
          }}
          renderItem={(item, isFirst) => (
            <NativeBaseProvider>
              <Accordion
                showButton
                renderHeader={() => (
                  <View>
                    <Flex direction='row'>
                      <FactoryView bg='emerald.400' borderRadius={4} size={8} />
                      <Text style={styles.itemText}>{item.name}</Text>
                    </Flex>
                  </View>
                )}
              >
                <TouchableOpacity style={styles.item}>
                  <Flex direction='row'>
                    <Text style={styles.itemText}>{item.name}3</Text>
                  </Flex>
                </TouchableOpacity>
              </Accordion>
            </NativeBaseProvider>
          )}
          showOnlySelectedDayItems={true}
          renderDay={(day, item) => {
            return <View />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
});

LocaleConfig.locales.jp = {
  today: '今日',
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { GiftedChat } from 'react-native-gifted-chat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'web!!!!',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ChatExample />
      </View>
    );
  }
}

const CalendarExample = () => (
  <Calendar
    style={{
      borderWidth: 1,
    }}
    monthFormat={'yyyy MM'}
    onDayPress={({year, month, day}) => {console.log(`${year}年 ${month}月 ${day}日がクリックされた。`)}}
    onMonthChange={({year, month}) => {console.log(`${year}年 ${month}月に移動した。`)}}

    // 特定の日付に印をつけてみる。
    markedDates={{
      '2018-06-05': {selected: true},
      '2018-06-06': {marked: true},
    }}

    // renderArrowを指定すると、月を移動するボタンに指定できる。
    // 引数directionは、'left'または'right'。
    // この例では、Textで '<' と '>' を表示させた。
    renderArrow={(direction) => (<Text>{direction === 'left' ? '<' : '>'}</Text>)}
  />
)
class ChatExample extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'こんにちは',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'nacam403',
            avatar: 'https://avatars1.githubusercontent.com/u/26166657?v=3',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={[
          {
            _id: 1,
            text: 'あなたが入室しました。',
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            system: true,
          },
          {
            _id: 2,
            text: 'これは自分の発言',
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
              _id: 1,
            },
          },
          {
            _id: 3,
            text: 'nacam403さんが入室しました。',
            createdAt: new Date(),
            system: true,
          },
          {
            _id: 4,
            text: '一応うごいたー',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'nacam403',
              avatar: 'https://avatars1.githubusercontent.com/u/26166657?v=3',
            },
          },
        ]}
        onSend={console.log}
        user={{
          _id: 1,
        }}
        inverted={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderWidth: 1,
    height: 500,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

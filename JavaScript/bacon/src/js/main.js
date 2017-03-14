'use strict';

import Bacon from 'baconjs';

$(() => {
  const clickStream = $('#header').asEventStream('click');
  // 以下と同義か。
  // const clickStream = Bacon.fromEvent(document.getElementById('header'), 'click');

  clickStream.onValue(() => console.log('clicked!'));

  // ボタンをクリックすると現在時刻が流れてくるストリーム。
  const buttonAStream = $('#buttonA').asEventStream('click').map(() => new Date().getTime());
  buttonAStream.onValue((value) => console.log(`buttonA: ${value}`));
  // ストリームに値が流れてくるたびに、$textC.text(値)が実行される。
  const $textC = $('#textC');
  buttonAStream.onValue($textC, 'text');

  // flatMapを使うと、ストリームに値が流れてくるたびに、値に応じて新しいストリームが作られる。
  buttonAStream.flatMap((value) => Bacon.fromArray([value]))
    .onValue(() => console.log('createdStream.onValue()'));

  // ストリームに流れてきた最新の値をプロパティとして受ける。
  const buttonAProperty = buttonAStream.toProperty(0);
  // プロパティの値をHTMLに割り当てる。
  buttonAProperty.assign($('#textA'), 'text');

  // ボタンBを押すたびに、その時のプロパティAの値が流れてくるストリームが作られる。
  const buttonBStream = $('#buttonB').asEventStream('click');
  const sampledStream = buttonAProperty.sampledBy(buttonBStream);
  sampledStream.log('sampledStream');
});

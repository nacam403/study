'use strict';

import Bacon from 'baconjs';

$(() => {
  const clickStream = $('#header').asEventStream('click');
  // 以下と同義か。
  // const clickStream = Bacon.fromEvent(document.getElementById('header'), 'click');

  clickStream.onValue(() => console.log('clicked!'));
});

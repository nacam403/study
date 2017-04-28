'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

const Books = Backbone.Collection.extend({
  url: '/books'
});

const books1 = new Books();
books1.once('aaa', () => {
  alert('books');
});

$('button').click(() => {
  books1.trigger('aaa');
});

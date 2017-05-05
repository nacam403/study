'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

// CollectionとEventのおためし
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

// Viewのおためし
const SampleView = Backbone.View.extend({
  el: '#div-a',

  render() {
    this.$el.html('<p>Sample View</p>');
    return this;
  }
});

const view1 = new SampleView();
view1.render();

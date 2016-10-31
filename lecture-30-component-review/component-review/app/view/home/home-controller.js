'use strict';

require('./_home.scss');

let lorem = require('lorem-ipsum');

module.exports = ['$log', '$interval', HomeController ];

function HomeController($log, $interval){
  $log.debug('init homeCtrl');
  this.timer = { seconds: 0};

  $interval(() => {
    this.timer.seconds = lorem()
  }, 1);
  
}

  //this.articles = [];
  //for( let i=0; i< 10; ++i){
    //this.articles.push({
      //title: lorem({ count: 5, units: 'words'}),
      //author: lorem({ count: 2, units: 'words'}),
      //paragraphs: [
        //lorem({ count: 5, units: 'sentences'}),
        //lorem({ count: 5, units: 'sentences'}),
        //lorem({ count: 5, units: 'sentences'}),
        //lorem({ count: 5, units: 'sentences'}),
        //lorem({ count: 5, units: 'sentences'}),
        //lorem({ count: 5, units: 'sentences'}),
      //],
    //});
  //}

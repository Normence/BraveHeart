// pages/gadgets/fingertraining/timer/timer.js
Page({
  data: {
    type: '',
    trainSet: [],
    currentAct: {
      "index": 1,
      "content": [{
        "type": "second",
        "time": 15,
        "action": "悬吊",
      }],
      "place": ["大把手"],
    },
  },

  onLoad: function (options) {
    this.setData({
      type: options.type,
      trainSet: require('../detail/detail.js').trainSet,
    })
  },
})
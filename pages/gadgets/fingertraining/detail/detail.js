// pages/gadgets/fingertraining/timer/timer.js
Page({
  data: {
    type: '',
    headTitle: '',
    trainSet: []
  },

  handleStartTaped: function() {
    wx.navigateTo({
      url: '../timer/timer?type=' + this.data.type,
    })
  },

  onLoad: function (options) {
    let title = ''
    switch (options.type) {
      case 'junior':
        title = '初'
        this.setJunior()
        break
      case 'senior':
        title = '中'
        this.setSenior()
        break
      default:
        title = '高'
        this.setAdvanced()
        break
    }
    this.setData({
      type: options.type,
      headTitle: title
    })

    module.exports.trainSet = this.data.trainSet
  },

  setJunior: function () {
    this.setData({
      trainSet: [
        {
          "index": 1,
          "content": [{
            "type": "second",
            "time": 15,
            "action": "悬吊",
          }],
          "place": ["大把手"],
        }, {
          "index": 2,
          "content": [{
            "type": "count",
            "time": 1,
            "action": "引体",
          }],
          "place": ["圆摩擦"],
        }, {
          "index": 3,
          "content": [{
            "type": "second",
            "time": 10,
            "action": "悬吊",
          }],
          "place": ["中边沿"],
        }, {
          "index": 4,
          "content": [{
            "type": "second",
            "time": 15,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 3,
            "action": "耸肩",
          }],
          "place": ["三指洞"],
        }, {
          "index": 5,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 2,
            "action": "引体",
          }],
          "place": ["中边沿"],
        }, {
          "index": 6,
          "content": [{
            "type": "second",
            "time": 10,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 5,
            "action": "举膝",
          }],
          "place": ["圆摩擦", "三指洞"],
        }, {
          "index": 7,
          "content": [{
            "type": "count",
            "time": 4,
            "action": "引体",
          }],
          "place": ["中边沿"],
        }, {
          "index": 8,
          "content": [{
            "type": "second",
            "time": 10,
            "action": "悬吊",
          }],
          "place": ["中边沿"],
        }, {
          "index": 9,
          "content": [{
            "type": "count",
            "time": 3,
            "action": "引体",
          }],
          "place": ["大把手"],
        }, {
          "index": 10,
          "content": [{
            "type": "description",
            "action": "悬吊至力竭",
          }],
          "place": ["圆摩擦"],
        },
      ]
    })
  },

  setSenior: function () {
    this.setData({
      trainSet: [
        {
          "index": 1,
          "content": [{
            "type": "second",
            "time": 15,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 3,
            "action": "引体",
          }],
          "place": ["中边沿"],
        }, {
          "index": 2,
          "content": [{
            "type": "count",
            "time": 2,
            "action": "引体",
          }, {
            "type": "second",
            "time": 20,
            "action": "悬吊",
          }],
          "place": ["圆摩擦", "中边沿"],
        }, {
          "index": 3,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "悬吊",
          }, {
            "type": "second",
            "time": 15,
            "action": "90度曲臂悬吊",
          }],
          "place": ["小边沿", "三指洞"],
        }, {
          "index": 4,
          "content": [{
            "type": "second",
            "time": 30,
            "action": "悬吊",
          }],
          "place": ["圆摩擦"],
        }, {
          "index": 5,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 4,
            "action": "引体",
          }],
          "place": ["中边沿", "三指洞"],
        }, {
          "index": 6,
          "content": [{
            "type": "count",
            "time": 6,
            "action": "不对称引体每手各",
          }],
          "place": ["高位手把手", "低位手小边沿"],
        }, {
          "index": 7,
          "content": [{
            "type": "count",
            "time": 15,
            "action": "举膝",
          }, {
            "type": "second",
            "time": 15,
            "action": "悬吊",
          }],
          "place": ["大把手", "中边沿"],
        }, {
          "index": 8,
          "content": [{
            "type": "second",
            "time": 25,
            "action": "悬吊",
          }],
          "place": ["中边沿"],
        }, {
          "index": 9,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "悬吊",
          }, {
            "type": "count",
            "time": 3,
            "action": "引体",
          }],
          "place": ["圆摩擦", "大把手"],
        }, {
          "index": 10,
          "content": [{
            "type": "description",
            "action": "悬吊至力竭",
          }],
          "place": ["圆摩擦"],
        },
      ]
    })
  },

  setAdvanced: function () {
    this.setData({
      trainSet: [
        {
          "index": 1,
          "content": [{
            "type": "second",
            "time": 30,
            "action": "直臂悬吊",
          }, {
            "type": "count",
            "time": 3,
            "action": "引体",
          }],
          "place": ["圆摩擦", "中边沿"],
        }, {
          "index": 2,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "120度曲臂悬吊",
          }, {
            "type": "second",
            "time": 20,
            "action": "L-SIT悬吊或者屈膝悬吊",
          }],
          "place": ["圆摩擦"],
        }, {
          "index": 3,
          "content": [{
            "type": "count",
            "time": 5,
            "action": "引体",
          }, {
            "type": "second",
            "time": 25,
            "action": "悬吊",
          }],
          "place": ["三指洞"],
        }, {
          "index": 4,
          "content": [{
            "type": "second",
            "time": 30,
            "action": "从三指洞开始，中边、小边各悬吊5秒，至圆摩擦结束并悬吊20秒",
          }],
          "place": [],
        }, {
          "index": 5,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "单臂悬吊",
          }, {
            "type": "second",
            "time": 20,
            "action": "换手单臂悬吊",
          }],
          "place": ["中边沿"],
        }, {
          "index": 6,
          "content": [{
            "type": "count",
            "time": 5,
            "action": "不对称引体每手各",
          }],
          "place": ["高位手平摩擦", "低位手三指洞"],
        }, {
          "index": 7,
          "content": [{
            "type": "second",
            "time": 30,
            "action": "90度曲臂悬吊",
          }],
          "place": ["小边沿"],
        }, {
          "index": 8,
          "content": [{
            "type": "second",
            "time": 15,
            "action": "悬吊",
          }],
          "place": ["三指洞"],
        }, {
          "index": 9,
          "content": [{
            "type": "count",
            "time": 3,
            "action": "L-SIT引体",
          }, {
            "type": "second",
            "time": 5,
            "action": "front lever",
          }],
          "place": ["圆摩擦"],
        }, {
          "index": 10,
          "content": [{
            "type": "second",
            "time": 20,
            "action": "两手指悬吊",
          }, {
            "type": "count",
            "time": 2,
            "action": "两手指引体（注意减重，若需要）",
          }],
          "place": ["三指洞"],
        }, {
          "index": 11,
          "content": [{
            "type": "description",
            "action": "120度曲臂悬吊至力竭",
          }, {
            "type": "description",
            "action": "直臂悬吊至力竭",
          }],
          "place": ["圆摩擦"],
        },
      ]
    })
  },
})
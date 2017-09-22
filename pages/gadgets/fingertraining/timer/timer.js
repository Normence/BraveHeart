// pages/gadgets/fingertraining/timer/timer.js
var timer       // timer received from .setInterval
var timerCount  // counts of timer

const normTime = (i) => (i > 9 ? String(i) : '0' + i)

var showNetwork = false

const soundUrls = {
  ready: 'https://raw.githubusercontent.com/Normence/BraveHeart/master/pages/gadgets/fingertraining/res/sounds/begin-single.wav',
  begin: 'https://raw.githubusercontent.com/Normence/BraveHeart/master/pages/gadgets/fingertraining/res/sounds/begin-dual.wav',
  count: 'https://raw.githubusercontent.com/Normence/BraveHeart/master/pages/gadgets/fingertraining/res/sounds/count.wav',
  break: 'https://raw.githubusercontent.com/Normence/BraveHeart/master/pages/gadgets/fingertraining/res/sounds/break.mp3',
  finish: 'https://raw.githubusercontent.com/Normence/BraveHeart/master/pages/gadgets/fingertraining/res/sounds/finish.wav',
}

Page({
  data: {
    type: '',
    trainSet: [],
    currentIndex: 0,
    currentAct: {},
    oncomingAct: {},
    length: 0,
    display: '00',     // '00 '准备'  'xx' 'x次' '暂停'
    disableReset: true,
    buttonTitle: '开始',  // '开始' '暂停' '继续'
    status: 'stop',    // 'stop' 'running' 'paused'
    noMore: false,
  },

  onLoad(options) {
    const s = require('../detail/detail.js').trainSet

    this.setData({
      type: options.type,
      trainSet: s,
      currentAct: s[this.data.currentIndex],
      oncomingAct: s[this.data.currentIndex + 1],
      length: s.length,
    })
  },

  refreshUI() {
    this.setData({
      currentAct: this.data.trainSet[this.data.currentIndex],
      oncomingAct: this.data.trainSet[this.data.currentIndex + 1] || {},
    })
  },

  handleMainButtonTaped() {
    switch (this.data.status) {
      case 'stop':
        this.setData({
          status: 'running',
          buttonTitle: '暂停',
        })

        timerCount = 60
        this.setData({
          disableReset: false,
        })
        this.forPreparation()
        break

      case 'running':
        this.setData({
          status: 'paused',
          buttonTitle: '继续',
          display: '暂停',
        })
        clearInterval(timer)
        break

      case 'paused':
        this.setData({
          status: 'running',
          buttonTitle: '暂停',
        })
        this.forPreparation()
      default:
        break
    }
  },

  handleResetButtonTaped() {
    if (timer) {
      clearInterval(timer)
    }
    this.setData({
      currentIndex: 0,
      status: 'stop',
      buttonTitle: '开始',
      display: '00',
      disableReset: true,
      noMore: false,
    })
    this.refreshUI()
  },

  forPreparation() {
    this.setData({
      display: '准备',
    })
    this.playSounds(soundUrls.ready)
    let tempCount = 3
    timer = setInterval(() => {
      if (tempCount === 0) {
        this.setData({
          display: '开始',
        })
        this.playSounds(soundUrls.begin)
        tempCount--
      } else if (tempCount < 0) {
        clearInterval(timer)
        this.runTimer()
      } else {
        this.playSounds(soundUrls.count)
        this.setData({
          display: normTime(tempCount--),
        })
      }
    }, 1000)
  },

  runTimer() {
    timer = setInterval(() => {
      if (timerCount === 0 && !this.data.noMore) {
        this.setData({
          display: '下一组',
        })
        timerCount--
      } else if (timerCount < 0) {
        clearInterval(timer)
        this.switchSet()
      } else {
        this.setData({
          display: normTime(timerCount--),
        })
      }
    }, 1000)
  },

  switchSet() {
    this.setData({
      currentIndex: this.data.currentIndex + 1,
    })
    console.log(this.data.currentIndex, this.data.length)
    if (this.data.currentIndex === this.data.length) {
      this.handleResetButtonTaped()
      wx.showModal({
        title: '完成情况',
        content: '恭喜你，全部完成训练',
        showCancel: false,
        confirmText: '',
        confirmColor: '',
      })
    } else {
      if (this.data.currentIndex === this.data.length - 1) {
        this.setData({
          noMore: true,
        })
      }
      this.refreshUI()
      this.setData({
        display: '60',
      })
      timerCount = 60
      this.runTimer()
    }
  },

  playSounds(s) {
    wx.stopBackgroundAudio()
    wx.playBackgroundAudio({
      dataUrl: s,
      fail: function (res) {
        if (!showNetwork) {
          wx.showModal({
            title: '提示音',
            content: '网络差或无网络，可能无法播放提示音',
            showCancel: false,
          })
          showNetwork = true
        }
      },
    })
  },
})
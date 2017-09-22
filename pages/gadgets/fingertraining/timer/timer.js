// pages/gadgets/fingertraining/timer/timer.js
var timer       // timer received from .setInterval
var timerCount  // counts of timer

const normTime = (i) => (i > 9 ? String(i) : '0' + i)
const actConsume = (c) => {
  if (c.type === 'second') {
    return 1
  }
  if (c.action.includes('引体')) {
    return 5
  }
  if (c.action.includes('举膝')) {
    return 3
  }
}  // 引体每个5s，举膝每个3s

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
    const { data } = this
    const { content } = this.data.currentAct
    timer = setInterval(() => {
      if (timerCount === 0 && !data.noMore) {
        // 一组到时
        this.setData({
          display: '下一组',
        })
        this.playSounds(soundUrls.begin)
        timerCount--
      } else if (timerCount < 0) {
        // 切换到下一组
        clearInterval(timer)
        this.switchSet()
      } else {
        const breakTime = data.currentAct.break || 0
        if (timerCount === breakTime && !data.noMore) {
          // 休息提示音
          this.playSounds(soundUrls.break)
        } else if (content.length > 1) {
          // 第二项动作提示音
          if (content[0].type !== 'description'
            && timerCount === 60 - content[0].time * actConsume(content[0])) {
            this.playSounds(soundUrls.ready)
          }
        }
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
    if (this.data.currentIndex === this.data.length) {
      this.handleResetButtonTaped()
      wx.showModal({
        title: '完成情况',
        content: '恭喜你，全部完成训练',
        showCancel: false,
        confirmText: '',
        confirmColor: '',
      })
      this.playSounds(soundUrls.finish)
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
            title: '网络情况',
            content: '网络差或无网络，可能无法播放提示音',
            showCancel: false,
          })
          showNetwork = true
        }
      },
    })
  },
})
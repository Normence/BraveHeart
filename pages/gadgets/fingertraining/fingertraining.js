Page({
  data: {
    timerUrl: './detail/detail'
  },
  handleTapJunior: function() {
    wx.navigateTo({
      url: this.data.timerUrl + '?type=junior',
    })
  },
  handleTapSenior: function () {
    wx.navigateTo({
      url: this.data.timerUrl + '?type=senior',
    })
  },
  handleTapAdvanced: function () {
    wx.navigateTo({
      url: this.data.timerUrl + '?type=advanced',
    })
  },
})
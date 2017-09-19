Page({
  data: {
    imgUrls: [
      './res/images/junior.jpg',
      './res/images/senior.jpg',
      './res/images/advanced.jpg'
    ],
    index: [
      '攀岩 | Rock Climbing'
    ]
  },
  handleTap: function() {
    wx.navigateTo({
      url: './fingertraining/fingertraining',
    })
  }
})
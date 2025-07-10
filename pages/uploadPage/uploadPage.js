const app = getApp();
Page({
  data: {
    swiper1ImageUrl: null,
    swiper2ImageUrl: null,
    leftImageUrl: null,
    rightImageUrl: null,
  },

  async onLoad() {
    // 请求图片url
    const res1 = await app.getImageUrl("爆款创作秘籍-上传页面");
    const res2 = await app.getImageUrl("收益排行榜-上传页面");
    const res3 = await app.getImageUrl("蓝色背景-上传页面");
    const res4 = await app.getImageUrl("绿色背景-上传页面");
    this.setData({
      swiper1ImageUrl: res1,
      swiper2ImageUrl: res2,
      leftImageUrl: res3,
      rightImageUrl: res4,
    })
  },

  handleTapLeft() {
    wx.chooseMessageFile({
      count: 1,
    });
    wx.uploadFile({
      filePath: 'filePath',
      name: 'name',
      url: 'url',
    })
  },

  handleTapRight() {
    wx.chooseMedia()
  },

})


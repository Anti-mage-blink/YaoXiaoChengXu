const app = getApp();
Page({
  data: {
    swiper1ImageUrl: null,
    swiper2ImageUrl: null,
    leftImageUrl: null,
    rightImageUrl: null,
    recordImageUrl: null,
  },

  async onLoad() {
    // 请求图片url
    const res1 = await app.getImageUrl("爆款创作秘籍-上传页面");
    const res2 = await app.getImageUrl("收益排行榜-上传页面");
    const res3 = await app.getImageUrl("蓝色背景-上传页面");
    const res4 = await app.getImageUrl("绿色背景-上传页面");
    const res5 = await app.getImageUrl("录制图标-上传页面");
    this.setData({
      swiper1ImageUrl: res1,
      swiper2ImageUrl: res2,
      leftImageUrl: res3,
      rightImageUrl: res4,
      recordImageUrl: res5,
    })
  },

  handleTapLeft() {
    wx.chooseMessageFile({
      count: 1,
      type: "video",
      success: (res) => {
        const tempFile = res.tempFiles[0];
        app.uploadVideo_chooseMessageFile(tempFile);
      },
      fail: (err) => { error('选择视频失败', err) },
    });
  },

  handleTapRight() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["video"],
      sourceType: ["album"],
      success: (res) => {
        const tempFile = res.tempFiles[0];
        app.uploadVideo_chooseMedia(tempFile);
      },
      fail: (err) => { error('选择视频失败', err) },
    });
  },

  handleTapBottom() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["video"],
      sourceType: ['camera'],
      camera: "back",

      success: (res) => {
        const tempFile = res.tempFiles[0];
        app.uploadVideo_chooseMedia(tempFile);
      },
      fail: (err) => { error('选择视频失败', err) },
    });
  },
})


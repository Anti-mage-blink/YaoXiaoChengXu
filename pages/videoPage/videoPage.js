const app = getApp()
Page({
  data: {
    endPoint: "/api/videos/",
  },

  handleUpload() {
    wx.uploadFile({
      url: app.globalData.baseUrl + this.data.endPoint,
      filePath: "/videos/1010.mp4",
      name: "video_file", // API接口视频文件的字段名
      formData: {
        openid: "azh",
        title: "wx_upload",
      },

      success: (result) => {
        console.log("上传调用成功");
        console.log("状态码: " + result.statusCode);
      },

    })
  }
})
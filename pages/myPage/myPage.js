const app = getApp()

Page({
  data: {
    avatarFilePath: "/images/头像.png",
    nickname: "酸汤水饺",

  },

  onLoad() {
    this.login();
  },

  uploadUserInfo() {
    wx.uploadFile({
      url: app.globalData.baseUrl + "/users/upload",
      filePath: '/images/头像.png',
      name: 'avatar',
      
      formData: {
        openid: app.globalData.openid,
        nickname: this.nickname,
      },
    })
  },

  getOpenid() {
    wx.login({
      success: (res) => {
        if(res.code) { // code
          wx.request({
            url: app.globalData.baseUrl + "/api/login/",
            method: "POST",
            data: {
              code: res.code,
            },
            success: (serverRes) => {
              app.globalData.openid = serverRes.data.openid;
              console.log("获取的openid: " + app.globalData.openid);
            }
          })
        }
      }
    })
  }
})
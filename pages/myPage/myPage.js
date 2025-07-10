const app = getApp()

Page({
  data: {
    openid: "myPage",
    userInfo: {
      openid: null,
      nickname: null,
      avatarUrl: null,
    },

    fansCount: null,
    followCount: null,
  },

  async onLoad() {
    console.log("[myPage]页面加载");
    const res = await app.getUserInfo(this.data.openid);
    // this.login();
    this.setData({
      userInfo: {
        openid: res.openid,
        nickname: res.nickname,
        avatarUrl: res.avatar_url,
      },
    });
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
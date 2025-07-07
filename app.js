// app.js
App({
  globalData: {
    baseUrl: "https://zgllcymhw.com",
    openid: null,
  },

  getSingleVideo() {
    return new Promise( (resolve) => {
      wx.request({
        url: this.globalData.baseUrl + "/api/videos/url_list_by_user/",
        method: "GET",
        data: { openid: "single", },
        success: (res) => {
          console.log("[app.js]res.data.results: " + res.data.results);
          resolve(res.data.results);
        }
      })
    })
  }
})

// app.js
App({
  globalData: { baseUrl: "https://zgllcymhw.com", openid: null, },

  getUserInfo(openid) 
  {
    return new Promise((resolve) => 
    {
      wx.request
      ({
        url: this.globalData.baseUrl + "/api/users/query/",
        method: "GET",
        data: { openid },
        success: (res) => 
        {
          if (res.statusCode === 200 && res.data) 
          {
            const userInfo = 
            {
              openid: res.data.openid,
              nickname: res.data.nickname,
              avatar_url: res.data.avatar_url,
            };
            resolve(userInfo);
          }
        }
      });
    });
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
        },
      })
    })
  },

  getImageUrl(image_name) {
    return new Promise( (resolve) => {
      wx.request({
        url: this.globalData.baseUrl + "/api/images/url/",
        method: "GET",
        data: { image_name: image_name },
        success: (res) => {
          console.log("[app:getImageUrl]res:")
          console.log(res);
          console.log(res.data.image_url);
          resolve(res.data.image_url);
        }
      })
    })
  }
})

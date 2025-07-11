// app.js
App({
  globalData: { 
    baseUrl: "https://zgllcymhw.com", 
    openid: null, 
  },

  onLaunch() {
    console.log("[app:onLaunch]调用getOpenid");
    this.getOpenid();
  },

  getOpenid() {
    // 1. 获取微信临时登录凭证code
    wx.login({
      success: res => {
        if (res.code) {
          // 2. 将code发送到自建后端
          wx.request({
            url: this.globalData.baseUrl + '/api/openid/', // 替换为你的后端API
            method: 'POST',
            data: { code: res.code },
            success: backendRes => {
              if (backendRes.data.openid) {
                console.log('[app:getOpenid]获取openid成功:', backendRes.data.openid)
                // 这里可以存储openid或执行后续逻辑
                this.globalData.openid = backendRes.data.openid;
              }
            },
            fail: err => console.error('请求后端失败', err)
          })
        } else {
          console.error('获取code失败', res);
        }
      }
    })
  },
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

  getVideoUrlList(openid) {
    return new Promise( (resolve) => {
      wx.request({
        url: this.globalData.baseUrl + "/api/videos/url_list_by_user/",
        method: "GET",
        data: { openid: openid, },
  
        success: (res) => {
          const videoUrlList = [];
          if(res.statusCode == 200) {
            videoUrlList = res.data.results;
            resolve(videoUrlList);
          };
        },
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

  uploadVideo_chooseMessageFile(tempFile) {
    // tempFile源于wx.chooseMessageFile
    wx.showLoading({
      title: '上传中...',
      mask: true, // 防止用户在上传过程中进行其他操作
    });
    wx.uploadFile({
      filePath: tempFile.path,
      url: this.globalData.baseUrl + "/api/videos/",
      formData: {
        openid: this.globalData.openid,
        title: tempFile.name,
      },
      name: "video_file",

      success: (res) => {
        console.log('上传成功', res.data);
        wx.hideLoading(); // 上传完成，隐藏 loading
        wx.showToast({
          title: '[app:upV.upF]上传成功',
          icon: 'success',
        });
      },
      fail: (err)  => {
        console.error('[app:upV.upF]上传失败', err);
        wx.hideLoading(); // 上传完成，隐藏 loading
        wx.showToast({
          title: '[app:upV.upF]上传失败',
          icon: 'error',
        });
      },
    });
  },

  uploadVideo_chooseMedia(tempFile) {
    // tempFile源于wx.chooseMedia
    wx.showLoading({
      title: '上传中...',
      mask: true, // 防止用户在上传过程中进行其他操作
    });
    wx.uploadFile({
      filePath: tempFile.tempFilePath,
      url: this.globalData.baseUrl + "/api/videos/",
      formData: {
        openid: this.globalData.openid,
        title: "uploadVideo_chooseMedia",
      },
      name: "video_file",

      success: (uploadRes) => {
        console.log('[app:upV.upF]上传成功', uploadRes.data);
        wx.hideLoading(); // 上传完成，隐藏 loading
        wx.showToast({
          title: '[app:upV.upF]上传成功',
          icon: 'success',
        });
      },
      fail: (err)  => {
        console.error('[app:upV.upF]上传失败', err);
        wx.hideLoading(); // 上传完成，隐藏 loading
        wx.showToast({
          title: '[app:upV.upF]上传失败',
          icon: 'error',
        });
      },
    });
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

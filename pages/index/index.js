// 版权所有©[2025][安贞桦]。保留所有权利。
const app = getApp()
Page({
  data: {
    openid: "mainPage", // 测试用
    userInfo: {
      openid: null,
      nickname: null,
      avatarUrl: null,
    },

    videoUrlList: [],
    endPoint: "/api/videos/url_list_by_user/",
    loadingMtx: false,
    refreshing: false, // 刷新状态
  },

  async onLoad(options) {
    // wx.navigateTo({ url: "/pages/Top3Page/Top3Page", });
    // console.log("[index]页面加载");
    // this.getVideoUrlList();
    // const res = await app.getUserInfo(this.data.openid);
    // this.setData({
    //   userInfo: {
    //     openid: res.openid,
    //     nickname: res.nickname,
    //     avatarUrl: res.avatar_url,
    //   },
    // });
    // console.log("[index:onLoad]Page userInfo.nickname: " + this.data.userInfo.nickname);
  },

  getVideoUrlList(isRefresh = false) {
    if (this.data.loadingMtx) return
    console.log("[index]开始getVideoUrlList...");
    this.setData({ loadingMtx: true }); // 上锁
    wx.request({
      url: app.globalData.baseUrl + this.data.endPoint,
      method: "GET",
      data: {
        openid: this.data.openid,
      },

      success: (res) => {
        if(res.statusCode == 200) {
          console.log("[index]请求成功");
          console.log(res);
          this.setData({
            videoUrlList: this.data.videoUrlList.concat(res.data.results),
          });
        }
      },
      
      complete: () => {
        this.setData({ loadingMtx: false });
        console.log("[index]请求结束 loadingMtx: " + this.data.loadingMtx);
        console.log("[index]videoUrlList长度: " + this.data.videoUrlList.length);
        if(isRefresh) { this.setData({ refreshing: false, }); }
      }
    })
  },

  onReachBottom() {
    console.log("[index]触底了");
    this.getVideoUrlList();
  },

  onRefresh() {
    console.log("[index]下拉刷新了");
    this.setData({ refreshing: true });
    this.setData({ videoUrlList: [], });
    this.getVideoUrlList(true);
    
    console.log("[index]onRefresh处理完了");
  },

  onShareAppMessage() {
    
  }
})
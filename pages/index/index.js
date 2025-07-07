const app = getApp()
Page({
  data: {
    videoUrlList: [],

    endPoint: "/api/videos/url_list_by_user/",

    loadingMtx: false,

    refreshing: false, // 刷新状态
  },

  onLoad(options) {
    wx.navigateTo({ url: "/pages/Top3Page/Top3Page", });
    console.log("页面加载");
    this.getVideoUrlList();
  },

  getVideoUrlList(isRefresh = false) {
    if (this.data.loadingMtx) return
    console.log("开始getVideoUrlList...");
    this.setData({ loadingMtx: true }); // 上锁
    wx.request({
      url: app.globalData.baseUrl + this.data.endPoint,
      method: "GET",
      data: {
        openid: "azh",
      },

      success: (res) => {
        if(res.statusCode == 200) {
          console.log("请求成功");
          console.log(res);
          this.setData({
            videoUrlList: this.data.videoUrlList.concat(res.data.results),
          });
        }
      },
      
      complete: () => {
        this.setData({ loadingMtx: false });
        console.log("请求结束 loadingMtx: " + this.data.loadingMtx);
        console.log("videoUrlList长度: " + this.data.videoUrlList.length);
        if(isRefresh) { this.setData({ refreshing: false, }); }
      }
    })
  },

  onReachBottom() {
    console.log("触底了");
    this.getVideoUrlList();
  },

  onRefresh() {
    console.log("下拉刷新了");
    this.setData({ refreshing: true });
    this.setData({ videoUrlList: [], });
    this.getVideoUrlList(true);
    
    console.log("onRefresh处理完了");
  },

  onShareAppMessage() {
    
  }
})
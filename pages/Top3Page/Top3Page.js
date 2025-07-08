const app = getApp();

Page({
  data: {
    videoUrl: null,
  },
  async onLoad() {
    console.log("调用[Top3Page.js-onLoad]");
    // wx.navigateTo({ url: "/pages/Top2Page/Top2Page", });
    const res = await app.getSingleVideo();
    console.log("[Top3Page.js]result: " + res);
    this.setData({ videoUrl: res, });
  },
})
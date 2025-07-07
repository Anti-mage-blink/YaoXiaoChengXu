const app = getApp();

Page({
  data: {
    videoUrl: null,
  },
  async onLoad() {
    console.log("调用[Top3Page.js-onLoad]");
    // wx.navigateTo({ url: "/pages/Top2Page/Top2Page", });
    const result = await app.getSingleVideo();
    console.log("[Top3Page.js]result: "+result);
    this.setData({ videoUrl: result, });
  },
})
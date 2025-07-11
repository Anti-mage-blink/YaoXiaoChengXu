const app = getApp();

Page({
  data: {
    userList: [],

    userUnit: {
      openid: null,
      userInfo: {
        openid: null,
        nickname: null,
        avatarUrl: null,
      },
      videoUrlList: [],
    },
  },

  async onLoad() {
    const userList = await this.getUserListForShow();
    this.setData({
      userList: userList,
    });
  },

  async getUserListForShow() {
    try {
      // 创建一个数组来存放所有用户的请求 Promises
      const userPromises = [];

      for (let i = 1; i <= 6; i++) {
        const openid = "user" + i + "_followPage"; // 直接用 + 连接字符串
        
        // 将获取一个用户完整信息的逻辑封装成一个 async 函数，然后调用它
        const userPromise = (async () => {
          // 并行获取用户信息和视频列表
          const [userInfo, videoUrlList] = await Promise.all([
            app.getUserInfo(openid),
            app.getVideoUrlList(openid)
          ]);

          const adapt_userInfo = {
            openid: userInfo.openid,
            nickname: userInfo.nickname,
            avatarUrl: userInfo.avatar_url,
          };

          return {
            openid: openid,
            userInfo: adapt_userInfo,
            videoUrlList: videoUrlList,
          };
        })();

        userPromises.push(userPromise);
      }

      // 使用 Promise.all 等待所有请求完成
      const userList = await Promise.all(userPromises);
      console.log("获取到的用户列表:", userList);
      return userList;

    } catch (error) {
      console.error("获取用户列表失败:", error);
      return []; // 出错时返回一个空数组，防止页面报错
    }
  },
})
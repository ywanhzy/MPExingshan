// pages/hotel/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
          camp: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          //获取内容列表
          let contentGroupID = app.globalData.contentGroupID

          let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

          let query = new wx.BaaS.Query()
          query.arrayContains('categories', [1524533051166331])
          MyContentGroup.setQuery(query).find().then(res => {
                  // success
                  console.log(res.data.objects[0].title)

                  this.setData({
                          camp: res.data.objects
                  });
          }, err => {
                  // err
                  console.log(res)
          })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
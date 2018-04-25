//index.js
//获取应用实例
const app = getApp()
let width;
let height;
Page({
        data: {
                imgUrls: [],
                current: 0,
                indicatorDots: true,
                autoplay: true,
                interval: 5000,
                duration: 1000,
                circular: !0,
                mapSrc: null,
                height: null,
                imgheights: [],
                width: 0,
                motto: 'Hello World',
                userInfo: {},
                hasUserInfo: false,
                canIUse: wx.canIUse('button.open-type.getUserInfo')
        },
        //事件处理函数
        bindViewTap: function () {
                wx.navigateTo({
                        url: '../logs/logs'
                })
        },
        onLoad: function () {
                width = app.globalData.width;
                height = app.globalData.height;
                this.setData({
                        width: width,
                });
                let contentGroupID = app.globalData.contentGroupID
                let categoryID = app.globalData.CategoryID
                
                let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

                let query = new wx.BaaS.Query()
                query.arrayContains('categories', [1524626071662657])
                MyContentGroup.setQuery(query).find().then(res => {
                        // success
                        console.log(res.data.objects)

                        this.setData({
                                imgUrls: res.data.objects
                        });
                }, err => {
                        // err
                        console.log(res)
                })

                //获取内容详情

                // let contentGroupID = 1524464040370541
                // let richTextID = 1524533255886219

                // let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
              
                
                // //获取内容列表
                // let query = new wx.BaaS.Query()
                // query.arrayContains('categories', [1524533051166331])
                // MyContentGroup.setQuery(query).find().then(res => {
                //         // success
                //         console.log(res)
                // }, err => {
                //         // err
                //         console.log(res)
                // })


                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true
                        })
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true
                                })
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        wx.getUserInfo({
                                success: res => {
                                        app.globalData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true
                                        })
                                }
                        })
                }
        },
        //等比缩放图片并保存
        imageLoad: function (e) {
                //获取图片真实宽度  
                var imgwidth = e.detail.width,
                        imgheight = e.detail.height,
                        //宽高比  
                        ratio = imgwidth / imgheight;
                // console.log(imgwidth, imgheight);
                //计算的高度值  

                var viewHeight = parseInt(this.data.width) / ratio;
                // console.log(viewHeight);
                var imgheight = viewHeight.toFixed(0);
                // console.log(imgheight);
                var imgheightarray = this.data.imgheights;
                //把每一张图片的高度记录到数组里
                imgheightarray.push(imgheight);
                // console.log(imgheightarray);
                this.setData({
                        imgheights: imgheightarray,
                });
        },
        bindchange: function (e) {
                // console.log(e.detail.current)
                this.setData({ current: e.detail.current })
        },
        previewImage: function (e) {
                var id = e.currentTarget.dataset.id;
                console.log(id)
        },
        getUserInfo: function (e) {
                console.log(e)
                app.globalData.userInfo = e.detail.userInfo
                this.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                })
        }
})

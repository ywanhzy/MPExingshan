//app.js
App({
        onLaunch: function () {

                let that = this

                // 引入 BaaS SDK
                require('./utils/sdk-v1.3.0')

                let clientId = this.globalData.clientId

                wx.BaaS.init(clientId)

                // 展示本地存储能力
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)

                wx.BaaS.login().then(res => {
                        console.log(res)
                }, res => {
                        if (res instanceof Error) {
                                if (res.code === 600) {
                                        console.log('网络已断开')
                                } else if (err.code === 601) {
                                        console.log('请求超时')
                                }
                        } else {
                                console.log('用户拒绝授权')
                                console.log('用户基本信息', res)
                        }
                })

                // // 登录
                // wx.login({
                //         success: res => {
                //                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //         }
                // })
                // // 获取用户信息
                // wx.getSetting({
                //         success: res => {
                //                 if (res.authSetting['scope.userInfo']) {
                //                         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                //                         wx.getUserInfo({
                //                                 success: res => {
                //                                         // 可以将 res 发送给后台解码出 unionId
                //                                         this.globalData.userInfo = res.userInfo

                //                                         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                //                                         // 所以此处加入 callback 以防止这种情况
                //                                         if (this.userInfoReadyCallback) {
                //                                                 this.userInfoReadyCallback(res)
                //                                         }
                //                                 }
                //                         })
                //                 }
                //         }
                // })

                wx.getSystemInfo({
                        success: function (res) {
                                that.globalData.width = res.windowWidth
                                that.globalData.height = res.windowHeight
                                console.log('手机型号：' + res.model + '操作系统版本：' + res.system + '手机品牌：' + res.brand)
                                console.log('设备像素比：' + res.pixelRatio)
                                console.log('窗口宽度：' + res.windowWidth)
                                console.log('窗口高度：' + res.windowHeight)
                                console.log('微信设置的语言：' + res.language)
                                console.log('微信版本号：' + res.version)
                                console.log('客户端平台：' + res.platform + '客户端基础库版本：' + res.SDKVersion)
                        }
                });

        },
        globalData: {
                userInfo: null,
                clientId: '665ec80ab652a9ac22ff', // 从 BaaS 后台获取 ClientID
                contentGroupID:"1524464040370541",
                CategoryIDImage: "1524626071662657",
                width:0,
                height:0,
                tableId: 34069, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
        }
})
<template>
    <div>
        <button @click="clickButton">连接</button>
        <input type="text" v-model="value">
        <button @click="sendButton">发送</button>
    </div>
</template>

<script>
    let ws = null;
    const uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;

            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
export default {
    name: "socketTest",
    data () {
        return {
            value: '',
            msnid: null
        }
    },
    created() {
        this.msnid = "user" + uuid(8, 11);
    },
    methods: {
        clickButton (data) {
            this.connect();
        },
        sendButton () {
            // this.$socket.emit('send', this.value)
        },
        // 连接socket服务端
        connect () {
            ws = new WebSocket("ws://127.0.0.1:1888");
            // 连接状态 1已建立连接
            console.log(ws.readyState)

            //  连接建立时触发
            ws.onopen = this.onopen;

            // 客户端接收服务端数据时触发
            ws.onmessage = this.onmessage;

            // 连接关闭时触发
            ws.onclose = this.onclose;

            //  通信发生错误时触发
            ws.onerror = this.onerror;
        },

        // 通信建立成功
        onopen () {
            var data = "系统消息：建立连接成功";
            console.log(data);
        },

        // 接收客户端的数据,发送数据
        onmessage (e) {
            var data = JSON.parse(e.data);
            console.log(data)

            switch (data.type) {
                case 'handShake':
                    //首次登录，发送登陆数据
                    var user_info = {'type': 'login', 'msg': this.msnid, 'page': 'socketTest'};
                    this.sendMsg(user_info);
                    console.log(user_info);
                    break;
                case 'login':
                    console.log('login',data);
                    // userList(data.user_list);
                    // systemMessage('系统消息: ' + data.msg + ' 已上线');
                    this.authorityJudg(data.user_list);
                    break;
                case 'logout':
                    console.log('logout',data);
                    // userList(data.user_list);
                    // if (data.msg.length > 0) {
                    //     systemMessage('系统消息: ' + data.msg + ' 已下线');
                    // }
                    break;
                case 'system':
                    // systemMessage();
                    break;
            }
        },
        onclose () {
            console.log("连接关闭，定时重连");
            this.connect();
        },

        // websocket 错误事件
        onerror () {
            let data = "系统消息 : 出错了,请退出重试.";
            console.log(data);
        },
        sendMsg (msg) {
            let data = JSON.stringify(msg);
            ws.send(data);
        },
        authorityJudg (userList) {
            console.log(userList);
        }
    },
    // sockets: {
    //     reconnect (data) {
    //         console.log('连接connect', data)
    //         // if (data) {

    //             // getSocketServiceList().then(res => {
    //             //     if (res.code) {
    //             //         this.$socket.emit("authentication", {authCode: res.code});
    //             //     }
    //             // })
    //         // }
    //     },
    //     STREAM_STATUS(data) {// 后端按主题名推送的消息数据
    //       console.log('Page：' + data)
    //     },
    //     message (data) {
    //         console.log(data);
    //     }
    // },
    // mounted(){
    //     console.log('page mounted')
    //     // this.$socket.emit('connect', 1)// 在页面加载时发起订阅，“STREAM_STATUS”是你跟后端约定好的主题名
    //     this.$socket.emit('STREAM_STATUS', { subscribe: true })
    // }
}
</script>

<style>

</style>
new Vue({
    el: '#footer-vue',

    data: {
        ws: null, // Our websocket
        loginParams:{}
    },
    created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function(e) {

            var msg = JSON.parse(e.data);
            console.log('msg',msg)
        });
        document.getElementById('wsstatus').addEventListener('click',function () {
            self.send()
        })
    },
    methods: {
        send: function () {
            var vm = this
            this.loginParams.username = document.forms[0].username.value
            this.loginParams.password = document.forms[0].password.value
                this.ws.send(
                    JSON.stringify(vm.loginParams)
                );
                // this.newMsg = ''; // Reset newMsg

        },

    }
});

new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
        nowindex:0,
        method:1
    },
    mounted:function () {//钩子函数
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function () {//默认显示
            return this.addressList.slice(0, this.limitNum)
        }
    },
    methods:{
        getAddressList:function () {//获取后台数据
            var _this=this;
            this.$http.get('data/address.json',{"id":123}).then(function (response) {
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                }
            });
        },
        loadMore:function () {
            if(this.limitNum=3){
                this.limitNum=this.addressList.length;
            }else{
                this.limitNum=3;
            }
        },
        setDefault:function (addressId) {//默认地址设置
            this.addressList.forEach(function (address,index) {
               if(address.addressId==addressId){
                   address.isDefault=true;
               }else {
                   address.isDefault=false;
               }
            });
        }
    }
})

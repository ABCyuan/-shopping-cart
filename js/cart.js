var vm=new Vue({
    el:"#app",
    data:{
        productList:[],
        checkAllFlag:false,
        deleFlage:false,
        nowIndex:-100
    },
    filters:{//自定义过滤器
        formatMoney:function (value) {
            return "￥"+value.toFixed(2);
        }
    },
    mounted:function () {//钩子函数
        this.cartView();
    },
    methods:{
    cartView:function () {
        var _this=this;
        this.$http.post("data/cartData.json",{"id":123}).then(function (res) {
            _this.productList=res.data.result.list;
        },function () {
            alert(1)
        });
    },
    changeMoney:function (product,way) {
        if(way>0){
            product.productQuantity++;
        }else {
            product.productQuantity--;
            if(product.productQuantity<2){
                product.productQuantity=1;
            }
        }
    } ,
    selectProduct:function (item) {//选择商品
        if(typeof item.checked=="undefined"){
            //Vue.set(item,"checked",true)//全局设置
            this.$set(item,"checked",true)//局部设置
        }else {
            item.checked=!item.checked;
        }
    },
    checkAll:function (flag) {//全选
        this.checkAllFlag=flag;
        var _this=this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked=="undefined"){
                    //Vue.set(item,"checked",_this.checkAllFlag)//全局设置
                    _this.$set(item,"checked",_this.checkAllFlag)//局部设置
                }else {
                    item.checked=_this.checkAllFlag;
                }
            });
    },
    deleItem:function () {
        this.deleFlage=!this.deleFlage;
    },
    deletProduct:function (n) {
        this.productList.splice(n,1)
    }
    },
    computed:{//商品总价
        totalMoney:function () {
            var money=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    money+=item.productPrice*item.productQuantity;
                }
            });
            return money
        }
    }
});

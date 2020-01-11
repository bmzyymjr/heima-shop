<template>
  <div id="app">
    <!-- 头部 -->
    <header>黑马商城
      <div class="box">
        <span>
        <span @click="goBack" v-show="info"><van-icon  name="arrow-left" />返回</span>
        </span>
        <span class="addss" v-show="add" @click="$router.push('/addgoods')">添加</span>
      </div>
    </header>
    <!-- 路由占位符 -->
      <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar route v-show="showft">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/member">会员</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :info="shopnum" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search" >搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: true,
      shopnum: 0,
      showft:true,
      add:false
    };
  },

  created(){
    this.shopnum=0
        var val=JSON.parse(window.localStorage.getItem("shopsMsg"))
        val.forEach(item=>{
            this.shopnum+=item.num
        })
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

  watch: {
    $route(to,from){
      if(to.path === '/home'){
        this.shopnum=0
        var val=JSON.parse(window.localStorage.getItem("shopsMsg"))
        val.forEach(item=>{
            this.shopnum+=item.num
        })
        this.info = false
        this.showft=true
        this.add=false
        return 
      }else if(to.path==='/goods/detail'){
        // this.shopnum=JSON.parse(window.localStorage.getItem("shopsMsg")).num
        this.showft=false
        return
      }else if(to.path==='/search'){
        console.log(123)
        this.info = true
        this.add= true
        this.showft=true
        return
      }
      this.showft=true
      this.add=false
      // this.shopnum=JSON.parse(window.localStorage.getItem("shopsMsg")).num
      this.info = true
    }
  }
};
</script>

<style lang="less" scoped>
header {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #1989fa;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.box{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content:space-between;
}
</style>
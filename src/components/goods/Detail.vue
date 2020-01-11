<template>
  <div class="bigbox">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品详情 -->
    <div class="goodsInfo" v-for="item in goodsDetail" :key="item.id">
      <!-- 商品标题 -->
      <div class="goods_title">{{item.title}}</div>
      <van-divider :style="{borderColor: '#ccc'}" />
      <!-- 商品价格 -->
      <div class="price">
        <p>
          市场价：
          <i class="marketPrice">￥{{item.market_price}}</i>
          <i class="sell_price">销售价：￥{{item.sell_price}}</i>
        </p>
      </div>
      <!-- 购买数量 -->
      购买数量
      <van-stepper v-model="value" integer />
      <van-button type="info" size="small">立即购买</van-button>
      <van-button type="danger" size="small" @click="addShopCars(item.id)">加入购物车</van-button>
      <!-- 添加商品弹出层 -->
    </div>

    <!-- 商品参数 -->
    <div class="goodsParams" v-for="(item, i) in goodsDetail" :key="i">
      <div class="title">商品参数</div>
      <van-divider :style="{borderColor: '#ccc'}" />
      <!-- 商品货号 goods_no-->
      <p class="goods_no">商品货号：{{item.goods_no}}</p>
      <!-- 库存情况 -->
      <p class="stock_quantity">库存情况: {{item.stock_quantity}}件</p>
      <!-- 上架时间 -->
      <p class="add_time">上架时间: {{item.add_time | fordate}}</p>
      <van-divider :style="{borderColor: '#ccc'}" />
      <!-- 按钮 -->
      <van-button class="introduct" plain hairline type="primary" size="large" @click="toIntroductPage(item.id)">图文介绍</van-button>
      <van-button class="comment" plain hairline type="danger" size="large" @click="toCommentPage(item.id)">商品评论</van-button>
    </div>

    <!-- 底部导航栏 -->
     <!-- 底部导航栏 -->
    <van-tabbar route  class="test">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/member">会员</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :info="shopnum" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>

  
</template>

<script>

export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      goodsDetail: [],
      value: 0,
      show: true,
      shopCarInfo: [],
      sj:{},
      shopnum:0

    }
  },

  created() {
    this.getgoodsDetail();
    var val=JSON.parse(window.localStorage.getItem("shopsMsg"))
    console.log(Array.isArray(val))
    if(Array.isArray(val)){
      val.forEach(item=>{
        this.shopnum+=item.num
      })
    }
  },

  methods: {
    async getgoodsDetail(id) {
      const { data: res } = await this.$http.get(
        `/api/goods/getinfo/${this.$route.query.id}`
      );
      console.log(res);
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取商品详情失败！" });
      }
      this.$notify({ type: "success", message: "获取商品详情成功" });
      this.goodsDetail = res.message;
      this.sj.title = res.message[0].title
      this.sj.id = res.message[0].id
      this.sj.price = res.message[0].sell_price
    },
    // 添加商品的事件函数
    addShopCars(id) {
      this.shopCarInfo=JSON.parse(window.localStorage.getItem('shopsMsg'))
      this.shopnum+=this.value
      console.log(this.value)
      if(Array.isArray(this.shopCarInfo)){
          var index=this.shopCarInfo.findIndex(item=>{
            return item.id==id
          })
          if(index==-1){
            this.sj.num=this.value
            this.shopCarInfo.push(this.sj)
            window.localStorage.setItem("shopsMsg", JSON.stringify(this.shopCarInfo))
            this.$toast.success('已添加到购物车')
          }else{
            this.shopCarInfo[index].num+=this.value
            window.localStorage.setItem("shopsMsg", JSON.stringify( this.shopCarInfo))
            this.$toast.success('已添加到购物车')
          }
        } else{
              this.shopCarInfo=[]
              this.sj.num=this.value
              this.shopCarInfo.push(this.sj)
              window.localStorage.setItem("shopsMsg", JSON.stringify(this.shopCarInfo))
              this.$toast.success('已添加到购物车')
        }
    },

    // 点击图文介绍跳转到图文介绍组件
    toIntroductPage(id){
      this.$router.push({path: '/goods/describe', query: {id: id}})
    },
    // 点击评论按钮跳转到评论组件
    toCommentPage(id){
      this.$router.push({path: '/goods/comment', query: {id: id}})
    }
  },
};
</script>

<style lang="less" scoped>
.bigbox{
  background-color: #fff;
}
.van-swipe-item {
  width: 100%;
}
img {
    width: 100%;
}

.goodsInfo {
  width: 100%;
  height: 212px;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.goodsParams {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 70px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

p {
  padding-left: 20px;
  font-size: 14px;
  color: #8f8f94;
}

.marketPrice {
  text-decoration: line-through;
}

.sell_price {
  margin-left: 10px;
  color: red;
  font-weight: 600;
}

.van-button {
  margin-top: 15px;
}

.van-stepper {
  margin-top: 10px;
}

.title {
  font-size: 18px;
}

.introduct {
  // position: absolute;
  // bottom: 19px;
  // left: 0;
  margin-top:10px;
  border-radius: inherit
}
.comment {
//  position: absolute;
//   bottom: -36px;
//   left: 0;
  border-radius: inherit

}

</style>
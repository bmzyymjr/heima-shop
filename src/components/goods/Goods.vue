<template>
  <div class="bigbox">
    <div class="phoneBox" v-for="item in goodsList" :key="item.id" @click="goodsDetail(item.id, item.img_url)">
      <van-image  width="100%" height="160" :src="item.img_url" />
      <p class="describe">{{item.title}}</p>
      <div class="detail">
        <div class="price">
          <span class="sellPrice">￥{{item.sell_price}}</span> <span class="marketPrice">￥{{item.market_price}}</span>
        </div>
        <div class="hot">
          <span class="hoting">热卖中</span> <span class="num">剩余{{item.stock_quantity}}件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      goodsImg: ''
    };
  },

  created() {
    this.getgoodList();
  },
  methods: {
    // 获取商品列表
    async getgoodList() {
      const { data: res } = await this.$http.get("/api/getgoods?pageindex=1");
      console.log(res);
      if(res.status !==0){
        return this.$notify({type: 'danger', message: '获取商品列表失败！'})
      }
      this.goodsList = res.message;
    },
    // 跳转到商品详情页
    goodsDetail(id,url){
      this.$router.push({path: '/goods/detail', query: {id: id}})
      // 将图片地址保存到本地
      this.goodsImg = url
      window.localStorage.setItem("images", this.goodsImg)
    }
  }
};
</script>

<style lang="less" scoped>
.bigbox{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
.van-card {
  width: 50px;
  height: 100px;
}

.phoneBox {
  position: relative;
  float: left;
  margin-top: 10px;
  width: 45%;
  height: 350px;
  border: 1px solid #ccc;
  text-align: center;
  box-sizing: border-box;
}

.describe {
  width: 100%;
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
margin-top: 61px;
}
.phoneBox img {
  width: 167px;
  height: 167px;
}

.detail {
  height: 60px;
  background-color: #ccc;
}

.price {
  height: 30px;
  position: relative;
}
.sellPrice {
  position: absolute;
  color: red;
  font-size: 16px;
  left: 27px;
  top: 5px;
}

.marketPrice {
  height: 30px;
  position: absolute;
  text-decoration: line-through;
  font-size: 14px;
  right: 40px;
  top: 6px;
}

.hot {
  position: relative;
  font-size: 14px;
}

.hoting {
  position: absolute;
  left: 25px;
}

.num {
  position: absolute;
  right: 25px;
}
</style>
<template>
  <div>
        <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 九宫格 -->
    <van-grid :column-num="3" square>
      <van-grid-item to="/newslist">
        <img src="../assets/menu1.png" alt />
        <p>新闻资讯</p>
      </van-grid-item>

      <van-grid-item to="/photo/list">
        <img src="../assets/menu2.png" alt />
        <p>图片分享</p>
      </van-grid-item>

      <van-grid-item to="/goods/list">
        <img src="../assets/menu3.png" alt />
        <p>商品购买</p>
      </van-grid-item>

      <van-grid-item to="/liuyan">
        <img src="../assets/menu4.png" alt />
        <p>留言反馈</p>
      </van-grid-item>

      <van-grid-item to="/video">
        <img src="../assets/menu5.png" alt />
        <p>视频专区</p>
      </van-grid-item>

      <van-grid-item to="/kefu">
        <img src="../assets/menu6.png" alt />
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swipeList: []
    }
  },
  created () {
    this.getswipeList()
  },
  methods: {
    async getswipeList () {
      const { data: res } = await this.$http.get('/api/getnewslist')
      console.log(res)
      if (res.status !== 0) {
        return this.$message.error('获取轮播图失败')
      }
      this.swipeList = res.message
      console.log(this.swipeList)
    }
  }
}
</script>

<style lang="less" scoped>

.van-swipe {
  width: 100%;
  height: 200px;
}

.van-swipe-item {
  width: 100%;
  height: 100%;
}

.van-swipe-item img {
  width: 100%;
}

.van-grid-item img {
  width: 60px;
  height: 60px;
}

.van-grid-item p {
  font-size: 14px;
}
</style>

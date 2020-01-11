<template>
  <div class="bigbox">
    <div class="box" v-for="item in goodsIntroList" :key="item.id">
      <h4 class="title">{{item.title}}</h4>
      <van-divider :style="{borderColor: '#1989fa'}" />
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsIntroList: []
    };
  },

  created() {
    this.getgoodsIntroduct();
  },

  methods: {
    async getgoodsIntroduct() {
      const { data: res } = await this.$http.get(
        `/api/goods/getdesc/${this.$route.query.id}`
      );
      console.log(res);
      if (res.status !== 0) {
        this.$notify({ type: "danger", message: "获取图文详情失败！" });
      }
      this.goodsIntroList = res.message;
    }
  }
};
</script>

<style lang="less" scoped>
.bigbox{
  background-color: #fff;
  overflow: hidden;
  p{
    line-height: 2;
  }
}
.title {
  width: 100%;
  height: 20px;
  margin: 15px 0;
  color: #226aff;
  text-align: center;
  font-weight: 700;
}

.box {
  padding: 0 5px;
}
</style>
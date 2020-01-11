<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-card
        v-for="item in newsList"
        :key="item.id"
        @click="newsId(item.id)"
        :title="item.title"
        :thumb="item.img_url"
      >

        <div slot="bottom" class="conten">
          <span class="time">发表时间:{{item.add_time | fordate}}</span>
          <span class="clibt">点击:{{item.click}}</span>
        </div>
      </van-card>
      <van-divider />
    </van-pull-refresh>
    <router-view></router-view>
  </div>
</template>



<script>
export default {
  data() {
    return {
      // isLoading: false,
      newsList: [],
      isLoading: false
    };
  },
  mounted() {
    this.getNewsList();
    this.$notify("");
  },
  methods: {
    async getNewsList() {
      const { data: res } = await this.$http.get("/api/getnewslist");
      // console.log(res.data);
      // console.log(res)
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取失败" });
      }
      this.$notify({ type: "success", message: "获取成功" });
      this.newsList = res.message;
      // console.log(res.message.title);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    newsId(id) {
      this.$router.push({ path: "/news", query: { id: id } });  
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.van-card:not(:first-child){
  margin: 0;
}
.van-card__title {
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  color: #000;
}
.van-card__thumb {
  width: 42px;
  height: 42px;
}
.van-card {
  width: 100%;
  height: 68px;
  margin: 0;
  background: #fff;
  box-sizing: border-box;
}
.van-card__header {
  width: 100%;
  height: 47px;
}
.van-card__content {
  min-height: 47px !important;
}

.van-card__price-currency{
  display: none
}
.time{
  color: #226aff;
}
.clibt{
  color: #226aff;
  margin: 0;
}
.conten{
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  span{
    font-size: 12px;
  }
}
</style>>

<template>
  <div>
    <van-search
      :autofocus="true"
      placeholder="请输入搜索关键词"
      v-model="searchKeys"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="clearSearch">取消</div>
    </van-search>
    <van-cell-group v-if="searchKeys.trim().length!==0">
      <van-cell
        :key="item.id"
        v-for="item in searchResult"
        :title="item.name"
        :value="'商品上架时间:'+item.ctime.split('T')[0]"
      />
    </van-cell-group>
    <van-cell v-else>
      <div class="historyText">
        <span>搜索历史</span>
        <van-icon name="delete" size="16px" color="#1989fa" @click="deleteHistory" />
      </div>
      <div class="historyList" v-if="searchHistory.length!==0">
        <van-tag
          :key="index"
          v-for="(item,index) in searchHistory"
          @click="selectHistory(item)"
        >{{item}}</van-tag>
      </div>
      <div v-else>
        <van-divider>暂无搜索历史</van-divider>
      </div>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 保存用户输入的搜索关键字
      searchKeys: "",
      //保存获得到的搜索结果
      searchResult: [],
      //保存用户的搜索记录
      searchHistory: []
    };
  },
  async created() {
    console.log(this.searchHistory);
    if (window.localStorage.getItem("history")) {
      this.searchHistory = JSON.parse(window.localStorage.getItem("history"));
    }
  },
  methods: {
    //   用户点击取消时触发
    clearSearch() {
      this.searchKeys = "";
      this.searchResult = [];
    },
    // 点击回车时触发
    async onSearch() {
      //   获取搜索列表
      const { data: res } = await this.$http.get("/api/getprodlist");
      if (res.status !== 0) return;
      console.log(res);
      this.searchResult = res.message;
      const result = this.searchHistory.findIndex(
        item => item === this.searchKeys
      );
      if (result === -1) {
        this.searchHistory.push(this.searchKeys);
        window.localStorage.setItem(
          "history",
          JSON.stringify(this.searchHistory)
        );
      }
    },
    // 点击删除历史记录时触发
    deleteHistory() {
      window.localStorage.setItem("history", "");
      this.searchHistory = [];
    },
    // 点击历史标签时触发
    selectHistory(val) {
      this.searchKeys = val;
    }
  }
};
</script>
<style lang="less" scoped>
.historyText {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 16px;
  }
}
.van-icon {
  padding-top: 5px;
}
.historyList {
  margin-top: 15px;
}
.van-tag {
  margin: 0 5px;
}
.van-divider {
  color: #000;
}
</style>
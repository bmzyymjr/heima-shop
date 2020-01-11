<template>
  <div>
    <div class="body">
      <van-cell-group>
        <van-field placeholder="请输入商品名称" v-model="names" />
      </van-cell-group>
      <van-button type="info" id="addgoods" @click="add">添加商品</van-button>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      names: "",
      
    };
  },
  created() {},
  methods: {
    async add() {
      if (this.names === "") {
        Notify({ type: "danger", message: "请输入商品名称" });
      } else {
        const { data: res } = await this.$http.post("/api/addproduct", {
          name: this.names
        });
        if (res.status !== 0) {
          Notify({ type: "danger", message: "添加商品失败" });
          return
        }
          Notify({ type: "success", message: "添加成功" });

      }
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  background-color: #1989fa;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
#goback {
  float: left;
  height: 40px;
}
.van-icon {
  text-align: center;
}
.body {
  margin: 5px 10px;
}
#addgoods {
  width: 100%;
  margin-top: 50px;
}
#nav {
  padding: 0 !important;
}
</style>






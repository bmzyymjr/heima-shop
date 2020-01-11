<template>
  <div class="bigbox">
    <header>
      <h4>反馈中心</h4>
      <span class="title">用户留言:</span>
      <van-button type="info" @click="show=true">我要留言</van-button>
      <van-list :finished="true" finished-text="没有更多留言了">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </header>
    <van-popup v-model="show" position="right" :style="{ width: '70%',height:'370px'}" >
      <footer>
      <h4>留言</h4>
      <van-field
        v-model="message"
        rows="10"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button type="info" @click="send">发表留言</van-button>
    </footer>
    </van-popup>
    
  </div>
</template>


<script>
export default {
  data() {
    return {
      show:false,
      list: [],
      message: ""
    };
  },
  created() {
    var i = window.localStorage.getItem("msg");
    i = i.split(",");
    console.log(i);
    this.list.push(...i);
  },
  methods: {
    send() {
      if (this.message.trim().length == 0) {
        return this.$toast("请输入留言内容");
      }
      this.list.unshift(this.message.trim());
      this.list;
      window.localStorage.setItem("msg", this.list);
      this.show=false;
      this.message='';
      this.$toast.success("留言成功");
    }
  }
};
</script>


<style lang="less" scoped>
.bigbox{

  margin-bottom: 50px;
}
header{
    background-color: #f8f8f8;
    .title{
    font-size: 20px;
    line-height: 44px;
    color: red;
}
}
.van-button{
    float: right;
}
h4 {
  font-size: 20px;
  padding: 10px 0;
  margin: 0;
  text-align: center;
  background-color: #fff;
}
footer {
  width: 100%;
  .van-field{
    width: 100%;
  }
  .van-button {
    width: 100%;
  }
}
</style>
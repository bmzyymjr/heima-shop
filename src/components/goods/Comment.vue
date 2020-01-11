<template>
  <div class="commentBox">
    <p>发表评论</p>
    <van-divider />
    <!-- 留言板 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="commentBtn" type="info" size="large" @click="addComment">提交评论</van-button>
    <div class="commentList" v-for="(item, i) in contentList" :key="i">
      <div class="title">
        <span>第{{i+1}}楼 用户：{{item.user_name}}</span>
        <span>发表时间：{{item.add_time | fordate}}</span>
      </div>
      <div class="content">{{item.content}}</div>
    </div>
    <van-button class="more" plain type="danger" size="large" @click="loadMore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: { pageindex: 1 },
      contentList: [],
      message: '',
    };
  },

  created() {
    this.commentList();
  },
  methods: {    
    async commentList() {
      const { data: res } = await this.$http.get(
        `/api/getcomments/${this.$route.query.id}`,
        { params: this.queryInfo }
      );
      console.log(res);
      if(res.status !== 0){
        return this.$notify({type: 'danger', message: '获取评论列表失败！'})
      }
      if(res.message.length === 0){
        return this.$notify({type: 'warning', message: '没有更多评论啦！'})
      }
      this.contentList.push(...res.message)

    },
    // 添加评论
    async addComment(){
      // 先判断评论列表是否为空
      if(this.message.trim().length==0){
        return this.$notify({type:'warning', message: '评论内容不能为空'})
        return
      }
      console.log(this.message);
      const{data: res} = await this.$http.post(`/api/postcomment/${this.$route.query.id}`, "content=" + this.message
      )
      console.log(res);
      if(res.status !== 0){
        return this.$notify({type: 'danger', message: '提交评论失败！'})
      }
      this.$notify({type: 'success', message: '提交评论成功！'})
      // 重新获取评论列表
      this.contentList.unshift({
        content: this.message,
        add_time: '2020-01-12',
        user_name: '匿名用户'
      })
      this.message = ''

    },
    loadMore(){
      this.queryInfo.pageindex++
      this.commentList()
    }
  }
};
</script>

<style lang="less" scoped>
.van-field {
  border: 1px solid skyblue;
}

.commentBtn {
  margin-top: 5px;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 30px;
  background-color: #ccc;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 10px;
}

.content {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
}

.more {
  margin-bottom: 50px;
}

.commentBox {
  padding: 0 5px;
}
</style>
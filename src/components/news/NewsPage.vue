<template>
  <div class="bigbox">
    <div v-for="item in newsPageList" :key="item.id">
      <h3 class="tit">{{item.title}}</h3>
      <div class="info">
        <span class="time">发表时间:{{item.add_time | fordate}}</span>
        <span class="times">点击次数:{{item.click}}</span>
        <van-divider />
      </div>
      <!-- 内容区域 -->
      <div class="content" v-html="item.content"></div>
    </div>

    <!-- 留言 -->
    <div style="width:100%;">
      <h4>发表评论</h4>
      <van-divider />
      <van-cell-group :border="false">
        <van-field v-model="message" rows="2" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit/>
      </van-cell-group>
      <van-button type="info" style="margin-bottom:10px" @click="showComments">发布评论</van-button>

      <div v-for="(item,i) in commentsList" :key="i" style="width:100%;" >
        <div class="list">
          <span class="user">用户:{{item.user_name}}</span>
          <span class="usertime">发表时间:{{item.add_time | fordate}}</span>
        </div>
        <div class="contents">{{item.content}}</div>
      </div>
      <van-button plain hairline type="danger" @click="showmore">加载更多</van-button>
    </div>
  </div>
</template>


<script>
import { log } from 'util';
export default {
  data() {
    return {
      newsPageList: [],
      // loading:false
      query:{
        pageindex:1
      },
      commentsList:[],
      message:"",  
    };
  },
  created() {
    this.getnewsPage();
    this.getComments()
  },
  methods: {
    async getnewsPage() {
      const { data: res } = await this.$http.get(
        `/api/getnew/${this.$route.query.id}`
      );
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取失败" });
      }
      this.newsPageList = res.message;
    },
    async getComments(){    
      const {data:res}=await this.$http.get(`/api/getcomments/${this.$route.query.id}`,{params:{pageindex:this.query.pageindex}})
      if(res.status!==0){
        return this.$notify({ type: "danger", message: "获取失败" });
      }
      if(res.message.length==0){
        return this.$notify({ type: "danger", message: "已经没有更多评论了" });
      }
      this.commentsList.push(...res.message)
    },
    async showComments(){
      if(this.message.trim().length==0) {
        return this.$notify({ type: "danger", message: "请输入评论内容" });
      }
      const {data:res}=await this.$http.post(`/api/postcomment/${this.$route.query.id}`, `content=${this.message}`)
      if(res.status!==0){
      return this.$notify({ type: "danger", message: "获取失败" });
      }
      this.$notify({ type: "success", message: "评论成功" });
      this.commentsList.unshift({
        user_name:'匿名用户',
        add_time:'2020-01-12',
        content:this.message
      })
      this.message=''
    },
    showmore(){
      this.query.pageindex++
      this.getComments();
    }
  }
};
</script>

<style lang="less" scoped>
.bigbox{
  margin-bottom: 50px;
}
.tit {
  color: #1989fa;
  font-size: 14px;
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 40px;
  padding-top:20px;
}
.time {
  font-size: 13px;
  color: #1989fa;
  margin-left: 10px;
}
.times {
  font-size: 13px;
  color: #1989fa;
  position: absolute;
  right: 10px;
}
.van-divider {
  color: #ccc;
}
.info {
  height: 30px;
}
.content {
  width: 100%;
  padding:0 10px;
  box-sizing: border-box;
}
.textrea {
  border: none;
  height: 24px;
}
.van-cell-group {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
}
.van-button {
  width: 100%;
  height: 44px;
  margin-top: 8px;
}
.list{
  width: 100%;
  font-size: 14px;
  background: #ccc;
  margin-top: 10px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  margin: 0;
}
.user{
  margin-right: 12px;
}
.contents{
  background: #fff;
  height: 35px;
  border: 0;
  padding-left: 20px;
  line-height: 35px;
  box-sizing: border-box;
}
</style>
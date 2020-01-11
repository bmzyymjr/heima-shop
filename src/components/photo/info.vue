<template>
  <div class="bigbox">
    <h5>{{info.title}}</h5>
    <p class="fubiaoti">
      <span>发表时间 : {{info.add_time | fordate}}</span>
      <span>点击 : {{info.click}}</span>
    </p>
    <van-divider />
    <ul class="imglist">
      <li :key="index" v-for="(item,index) in imglist">
        <van-image :src="item.src" alt lazy-load  @click="showimg"/>
      </li>
    </ul>
    <p v-html="info.content"></p>
    <h4>发表评论</h4>
    <van-divider />
    <van-cell-group>
      <van-field v-model="message" rows="2" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit/>
    </van-cell-group>
    <van-button type="info" @click="addpinglun">发表评论</van-button>
    <van-list v-for="(item,index) in pinglun" :key="index">
        <div class="plhead">
            <span>第 {{index+1}} 楼</span>
            <span>用户 : {{item.user_name}}</span>
            <span>发布时间 : {{item.add_time | fordate}}</span>
        </div>
        <div class="plbody">
            {{item.content}}
        </div>
    </van-list>
    <van-button plain type="primary" @click="onload">加载更多评论</van-button>
    
  </div>
</template>

<script>
import {ImagePreview} from 'vant'
export default {
  data () {
    return {
      info: {},
      imglist: [],
      // 评论列表
      pinglun: [],
      yema: 1,
      message: ''
    }
  },
  created () {
    this.getimglist()
    this.getinfo()
    this.getpinglun()
  },
  methods: {
    async getimglist () {
      const { data: res } = await this.$http.get(
        '/api/getthumimages/' + this.$route.params.id
      )
      this.imglist = res.message
    },
    async getinfo () {
      const { data: res } = await this.$http.get(
        '/api/getimageInfo/' + this.$route.params.id
      )
      console.log(res)
      this.info = res.message[0]
    },
    async getpinglun () {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.$route.params.id}?pageindex=` + this.yema)
      console.log(res)
      if (res.message.length == 0) {
        this.$toast('评论已经加载到底啦~')
        return false
      }
      this.pinglun.push(...res.message)
    },
    onload () {
      console.log(1)
      this.yema++
      this.getpinglun()
    },
    async addpinglun () {
      if (this.message.trim().length == 0) {
        this.$toast('评论不可以为空')
      } else {
        const { data: res } = await this.$http.post(`/api/postcomment/${this.$route.params.id}`,`content=${this.message}`)
        if (res.status != 0) return this.$toast('请求失败')
        console.log(new Date())
        this.pinglun.unshift({
          user_name: "匿名用户", add_time:'2019-01-12', content: this.message
        })
        this.message=''
        this.$toast('评论成功')
      }
    },
    showimg(){
      var datulist=[]
      for(var k in this.imglist){
        
      }
      this.imglist.forEach(item=>{
        datulist.push(item.src)
      })
      ImagePreview(datulist)

    }
  }
}
</script>

<style lang="less" scoped>
.bigbox {
  overflow: hidden;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  margin-bottom: 60px;
}
h5 {
  text-align: center;
  color: #26a2ff;
  font-size: 15px;
  margin: 20px 0;
}
.fubiaoti {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #8f8f94;
}
.imglist {
  width: 100%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  li {
    width: 33.3333%;
  }
}
.van-list{
    margin:5px 0;
}
.van-button{
    width: 100%;
    margin-top: 10px;
}
.plhead{
    display: flex;
    justify-content:space-between;
    width: 100%;
    height: 30px;
    background-color: skyblue;
    font-size: 12px;
    line-height: 30px;
}
.plbody{
    text-indent: 2em;
    min-height: 35px;
    line-height: 35px;
    font-size: 12px;
}
</style>

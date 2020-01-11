<template>
  <div>
    <header class="header">
      <h5 class="tit">客服中心</h5>
    </header>
    <div class="message">
      <div class="time">今日</div>
      <div :class="item.user==0?'send':'show'" :key="index" v-for="(item,index) in sendneirong">
        
        <div class="msg" >
          <img v-if="item.user==0" src="../../assets/touxiangm.png" alt />
          <img v-else src="../../assets/touxiang.png" alt />
          <p>
            <i class="msg_input"></i>{{item.msg}}
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="../../assets/hua.png" alt />
      <img src="../../assets/xiaolian.png" alt />
      <input type="text" v-model="msg"/>
      <p :class="{'isvalue':isvalue}" @click="sendmsg">发送</p>
    </div>
  </div>
</template>

<script>
import '../../assets/robot/js/flexible.js'
import '../../assets/robot/chat.css'
export default {
  data() {
    return {
      isvalue:false,
      msg:"",
      sendneirong:[],
      ltk: {
        '您好': "您好呀~,我是小钱,请问有什么可以帮您?",
        '前端技术哪家强':'中国合肥找黑马!',
        '哪个组最强':'那当然是六组了,这还用说嘛?',
      }
    };
  },
  created() {},
  methods:{
    sendmsg(){
      if(!this.isvalue){
        return false
      }
      this.sendneirong.push(
        {
            msg:this.msg,
            user:1
          }
      )
     
      for(var k in this.ltk){
        if(this.msg==k){
           this.msg='';
          setTimeout(()=>{
            this.sendneirong.push({
            msg:this.ltk[k],
            user:0
          })
          },800)
          return
        }
      }
      
      this.msg='';
      setTimeout(()=>{
        this.sendneirong.push({
         msg:'很抱歉~小钱没有听懂您的意思哦~',
         user:0
      })
      },800)
    }
  },
  watch:{
    msg(val,oldval){
      console.log(123)
      if(this.msg!=''){
        this.isvalue=true
        return
      }
        this.isvalue=false

    }
  }
};
</script>

<style lang="less" scoped>
  .isvalue{
    background: rgb(17, 79, 142);
  }
</style>
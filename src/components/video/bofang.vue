<template>
    <div class="bigbox">
        <iframe :src="url" allowfullscreen="" frameborder="0" class="video"></iframe>
        <h4><span>家庭幽默录像:</span>{{videoinfo.title}}</h4>
        <p><span>邹佳俊于 {{videoinfo.time}} 上传</span> <span>播放次数:{{videoinfo.cishu}}</span></p>
        <van-divider />
        <h5>猜你喜欢:</h5>
        <van-card :key="index" v-for="(item,index) in other" :title="item.title" :thumb="item.imgurl" @click="xihuan(item.id)">
        <div slot="num">
            播放:{{item.cishu}}
        </div>
        <div slot="tags" class="leibie">
            <van-tag plain type="danger">搞笑视频</van-tag>
        </div>
        <div slot="price" >
            发表时间：{{item.time}}
        </div>
    </van-card>
    </div>
</template>


<script>
export default {
    data(){
        return{
            vlist:[
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/l0810sbby83_496_280/0',
                    id:'l0810sbby83',
                    title:'最有趣同桌排行榜，看完不许笑！',
                    time:'2019-12-09',
                    cishu:15204
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/y080826qsgx_496_280/0',
                    id:'o0033ttkbos',
                    title:'整整两年了，你怀的是哪吒吗',
                    time:'2019-12-09',
                    cishu:43241
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/l05341th3qd_496_280/0',
                    id:'l05341th3qd',
                    title:'不同人眼中的幸福',
                    time:'2019-12-05',
                    cishu:12312
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/d0822jutu6a_496_280/0',
                    id:'d0822jutu6a',
                    title:'真是太搞笑了，我还能看十遍！',
                    time:'2019-01-03',
                    cishu:32341
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/i0810p0zme3_496_280/0',
                    id:'i0810p0zme3',
                    title:'最有趣的学习瞬间，看完好想笑！',
                    time:'2019-12-09',
                    cishu:15323
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/r0013facpy3_496_280/0',
                    id:'r0013facpy3',
                    title:'家庭最搞笑幽默视频',
                    time:'2016-03-31',
                    cishu:18843
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/f0019pxzuj7_496_280/0',
                    id:'f0019pxzuj7',
                    title:'逗比搞笑视频，你能忍住不笑？',
                    time:'2019-12-09',
                    cishu:19422
                },
                {
                    imgurl:'https://puui.qpic.cn/qqvideo_ori/0/y0817ywx80z_496_280/0',
                    id:'y0817ywx80z',
                    title:'最减压的笑容排行榜，有的人回眸一笑百媚生！优秀',
                    time:'2018-12-04',
                    cishu:15512
                }
            ],
            other:[],
            url:`https://v.qq.com/iframe/player.html?vid=${this.$route.params.id}`,
            videoinfo:{}
        }
    },
    created(){
    },
    mounted(){
        this.getinfo(this.$route.params.id)
        
        
    },
    methods:{
        xihuan(id){
            console.log(id)
            this.url=`https://v.qq.com/iframe/player.html?vid=${id}`
            this.getinfo(id)
        },
        getinfo(id){
            const index = this.vlist.filter(item =>{
                return item.id==id
            })
            const ot = this.vlist.filter(item =>{
                return item.id!=id
            })
            this.videoinfo=index[0]
            this.other=ot
        }
    }
}
</script>


<style lang="less" scoped>
.bigbox{
    width: 100%;
    margin-bottom: 60px;
}
h4{ 
    
    background-color: #409eff;
    padding: 0 10px 5px 10px;
    color: #fff;
    margin: 0;
    span{
        color: red;
    }
}
p{
    display: flex;
    
    background-color: #409eff;
    justify-content: space-between;
    padding: 0 10px 10px 10px;
    margin: 0;
     span{
         font-size: 12px;
         color:red;
     }
}
    iframe{
        width: 100%;
        margin: 0;
    }
    h5{
        margin: 5px 0;
    }
</style>
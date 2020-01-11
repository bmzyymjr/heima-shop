<template>
  <div class="bigbox">
    <van-card tag="热" :key="index" v-for="(item,index) in vlist" :title="item.title" :thumb="item.imgurl" @click="$router.push('/bofang/'+item.id)">
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
            ]
        }
    }
};
</script>


<style lang="less" scoped>
.bigbox{
    margin-bottom: 60px;
}
.van-card__title{
    font-size: 16px;
    margin-top: 15px
}
.leibie{
    margin-top: 10px
}
.van-card__title{
    color: red;
}
</style>
<template>
  <div>
    <loading v-if="!diarys.length"></loading>
    <div class="pro"
         v-for="item in diarys"
         :key="item.id"
         @mousemove="mouseMove"
         @mouseout="mouseOut"
         @click="run(item.id)">
      <div class="pro-thumb" :style="'background-image:url('+item.img+')'" data-scroll-reveal></div>
      <h4 class="pro-title" data-scroll-reveal="after 0.1s">
        <span class="pro-title-c">{{item.title}}</span>
        <span class="pro-time">PHOTO {{item.time}}</span>
      </h4>
      <p class="pro-desc" data-scroll-reveal="after 0.2s">{{item.outline}}</p>
    </div>
  </div>
</template>

<script type="javascript">
  import Loading from './Loading.vue'
  import router from '../router'

  export default {
    components: {Loading},
    props: ['diarys'],
    data() {
      return {

      }
    },
    watch: {
      diarys(){
        this.$nextTick(() => {
          // http://www.dowebok.com/134.html

          new scrollReveal({reset: true});
        })
      }
    },
    methods: {
      run(id) {
        router.push('diary/v/' + id)
      },
      mouseMove(e) {
        let x = e.pageX - e.currentTarget.offsetLeft,
                y = e.pageY - e.currentTarget.offsetTop,
                w = e.currentTarget.clientWidth / 2,
                h = e.currentTarget.clientHeight / 2,

                yy = x <= w ? -(1 - x / w) : (x - w) / w,
                xx = y <= h ? 1 - y / h : -(y - h) / h,

                ex = w - Math.abs(x - w),
                ey = h - Math.abs(y - h),
                rl = ex > ey ? 1 - ey / h : 1 - ex / w,
                deg = rl * 14

        e.currentTarget.style.webkitTransform = 'perspective(1500px) rotate3d( ' + xx + ', ' + yy + ', 0, ' + deg + 'deg)'
        e.currentTarget.style.transform = 'perspective(1500px) rotate3d( ' + xx + ', ' + yy + ', 0, ' + deg + 'deg)'
      },
      mouseOut(e) {
        e.currentTarget.style.webkitTransform = 'perspective(1500px) rotate3d( 0, 0, 0, 0deg)'
        e.currentTarget.style.transform = 'perspective(1500px) rotate3d( 0, 0, 0, 0deg)'
      }
    }
  }
</script>

<style lang="stylus">
  .pro
    position relative
    display block
    margin-bottom: 20px
    cursor pointer
    padding: 5px
    transition all .2s linear
    z-index: 5
    border-radius 3px

    &:hover
      background: #fff
      box-shadow 0 6px 12px rgba(0, 0, 0, .08)
    &-thumb
      width: 100%
      height: 246px
      -webkit-background-size: cover
      background-size: cover
      background-color: #ddd
      background-position: center
      border-radius 3px
    &-title
      position relative
      width: 100%
      box-sizing border-box
      margin 5px 0
      font-weight: 400
      &-c
        display block
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 116px;
    &-time
      position absolute
      right: 0
      top: 0
      font-size: 12px
      color: #777
      font-weight: 400
      vertical-align middle
      margin-left: 35px
    &-desc
      margin 0 0 5px 0
      font-size: 12px
      color: #777
</style>
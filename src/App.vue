<template>
  <div id="app">
    <div class="container">
      <aside class="aside">
        <logo></logo>
        <nav class="nav">
          <router-link
                  v-for="item in nav"
                  :to="item.to"
                  :key="item.to"
                  class="nav-link"
                  active-class="active"
                  :title="item.tit"
                  :exact="item.exa">{{item.val}}
          </router-link>
        </nav>
      </aside>
      <mobile-nav></mobile-nav>
      <transition name="move">
        <!-- keep-alive -->
          <router-view class="content" :diarys="diarys"></router-view>
      </transition>
    </div>
  </div>
</template>

<script type="javascript">
  import Logo from './components/Logo'
  import mobileNav from './components/MobileNav'
  import vFooter from './components/Footer'

  export default {
    name: 'app',
    components: {Logo, vFooter, mobileNav},
    created() {
      this.$http.get('static/diary.json').then(response => {
        this.diarys = response.body.content.reverse()
      })
    },
    data() {
      return {
        nav: [
          {to: '/', val: 'Home', tit: '首页', exa: true},
          {to: '/diary', val: 'Diary', tit: '日记'},
          {to: '/about', val: 'About', tit: '关于我'}
        ],
        diarys: {}
      }
    }
  }
</script>

<style lang="stylus">
  .aside
    position fixed
    width: 80px
    text-align right
    float: left;
    padding: 5px 10px 0 0
    z-index 10
    .nav-link
      font-size: 14px
      display block

  .content
    width 640px
    float right
    margin-bottom: 60px

  .nav
    &-link
      margin-bottom: 30px
      color: #333
      transition all .2s ease
      &:hover
        text-decoration underline
      &.active
        font-weight bold

  .move-enter-active, .move-leave-active
    transition: all .3s ease-in-out
  .move-enter-active
    transition-delay: .3s
  .move-enter, .move-leave-active
    opacity: 0;
    transform: translateX(40px)
</style>

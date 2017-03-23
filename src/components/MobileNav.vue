<template>
  <div class="mobile-nav">
    <logo class="mobile-logo" norun="true"></logo>
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
  </div>
</template>

<script type="javascript">
  import Logo from './Logo'

  export default {
    components: { Logo },
    data() {
      return {
        nav: [
          {to: '/', val: 'Home', tit: '首页', exa: true},
          {to: '/diary', val: 'Diary', tit: '日记'},
          {to: '/about', val: 'About', tit: '关于我'}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .mobile-nav
    display none
    padding 25px 5px 15px 10px
    .nav
      display flex
      flex 1
      margin-left: 15px
      vertical-align top
      box-sizing border-box
      line-height: 36px
      height: 36px
      &-link
        display block
        flex 1
        text-align center
  .mobile-logo
    margin 0
    flex: 36px 0 0;
</style>

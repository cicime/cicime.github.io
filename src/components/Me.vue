<template>
  <div>
    <h1 class="about-title">ABOUT ME</h1>
    <hr class="about-line">
    <div class="about-head">
      <div class="avatar"></div>
      <ul class="about-head-list">
        <li class="about-head-list-i">姓名：CiCi, Toma</li>
        <li class="about-head-list-i">职业：FE</li>
        <li class="about-head-list-i">E-mail：toma_zhao@163.com</li>
        <li class="about-head-list-i">其他信息：27岁 ♂ 北京 天盖星人</li>
      </ul>
    </div>
    <div class="ability">
      <h4 class="ability-title">语言技能</h4>
      <ul class="ability-list">
        <li class="ability-list-i">ECMA Script &nbsp;&nbsp;<small>Babel, TypeScript, CommonJS</small></li>
        <li class="ability-list-i">HTML &nbsp;&nbsp;<small>Pug, EJS, Markdown, XHTML</small></li>
        <li class="ability-list-i">CSS &nbsp;&nbsp;<small>SASS, LESS, Stylus, Postcss</small></li>
        <li class="ability-list-i">Node.js </li>
        <li class="ability-list-i">PHP </li>
        <li class="ability-list-i">Python </li>
      </ul>
    </div>
    <div class="ability">
      <h4 class="ability-title">设计工具</h4>
      <ul class="ability-list">
        <li class="ability-list-i">Photoshop</li>
        <li class="ability-list-i">Illustrator </li>
        <li class="ability-list-i">AfterEffects</li>
        <li class="ability-list-i">CINEMA4D </li>
      </ul>
    </div>
  </div>
</template>

<script type="javascript">
  export default {
    props: ['diarys'],
    created() {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="stylus">
  .about-title
    font-size: 30px
    padding-left: 15px
    margin: 0
  .about-line
    border 0
    border-bottom 1px solid #fff
    border-top 1px solid #ddd
  .about-head
    .avatar
      display inline-block
      width: 262px
      height: 240px
      background: url(../static/head.png) no-repeat center/ 80%
    &-list
      display inline-block
      vertical-align top
      margin-top: 54px
      &-i
        line-height: 2.4

  .ability
    margin-bottom: 30px
    &-title
      line-height: 2.5
      padding-left: 15px
      color: #4c8c96
      background: #eae9ef
    &-list
      &-i
        line-height: 2.4
        small
          color: #aaa
</style>
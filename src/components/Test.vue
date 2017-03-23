<template>
  <div>
    <h1>实验室</h1>

    <div class="loading-ico">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="-160 91 46 46" style="enable-background:new -160 91 46 46;" xml:space="preserve">
      <line class="st1-hk" x1="-127.4" y1="119.8" x2="-146.7" y2="119.8"/>
      <path class="st0" d="M-114.2,98.1c0-3.7-4-5.4-8.9-5.4c-2,0-4,0.3-5.7,0.9c-2.5-1-5.3-1.6-8.2-1.6s-5.7,0.5-8.3,1.5
        c-1.7-0.6-3.7-0.9-5.7-0.9c-4.9,0-8.9,1.7-8.9,5.4c0,1.9,1.2,3.7,2.9,5.2c-1.7,3.3-2.8,6.9-2.8,10.8c0,12.1,10.2,22,22.8,22
        s22.8-9.8,22.8-22c0-3.9-1.1-7.6-2.9-10.7C-115.4,101.8-114.2,100-114.2,98.1z M-137,130.4c-9.7,0-17.5-4.7-17.5-10.6
        c0-5.9,7.8-10.5,17.5-10.5s17.5,4.7,17.5,10.5C-119.5,125.6-127.3,130.4-137,130.4z"/>
      </svg>
    </div>
  </div>
</template>

<script type="javascript">
  import router from '../router'

  export default {
    props: ['diarys'],
    created(){
      window.scrollTo(0, 0)
    },
    methods: {},
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .loading-ico
    width 40px
    .st0
      fill: #ddd
    .st1-hk
      fill: none
      stroke: #ddd
      stroke-width: 6
      stroke-linecap: round
      stroke-miterlimit: 10
      stroke-dasharray: 14
      stroke-dashoffset: 0
      animation: dash 1s linear infinite;
      @keyframes dash
        0%
          stroke-dashoffset: 0
        100%
          stroke-dashoffset: 29
</style>
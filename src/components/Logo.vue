<template>
  <h1 class="logo" title="仰望星空的CICI">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 46 46" style="enable-background:new 0 0 46 46;" xml:space="preserve">
    <circle class="eye" :cx="cx" :cy="cy" r="3.8"/>
    <path class="head" d="M45.8,7.1c0-3.7-4-5.4-8.9-5.4c-2,0-4,0.3-5.7,0.9C28.7,1.6,25.9,1,23,1s-5.7,0.5-8.3,1.5
      c-1.7-0.6-3.7-0.9-5.7-0.9c-4.9,0-8.9,1.7-8.9,5.4c0,1.9,1.2,3.7,2.9,5.2C1.3,15.5,0.2,19.1,0.2,23c0,12.1,10.2,22,22.8,22
      s22.8-9.8,22.8-22c0-3.9-1.1-7.6-2.9-10.7C44.6,10.8,45.8,9,45.8,7.1z M23,39.4c-9.7,0-17.5-4.7-17.5-10.6S13.3,18.3,23,18.3
      S40.5,23,40.5,28.8S32.7,39.4,23,39.4z"/>
  </svg>
  </h1>
</template>

<script type="javascript">
  const mlX = 13.5
  const mtY = 23.8
  const mw = (32.5 - mlX) / 2
  const mh = (32.8 - mtY) / 2
  const wW = window.innerWidth
  const wH = window.innerHeight

  const wx = ((wW <= 780 ? 790 : wW) - 780 ) / 2 + 46
  const wy = 70

  export default {
    props: ['norun'],
    created(){
      if (!this.norun) {
        window.addEventListener('mousemove', this.mouseMove)
      }
      // window.removeEventListener('mousemove', this.mouseMove)
    },
    methods: {
      mouseMove(e) {
        let x = e.clientX
        let y = e.clientY

        if (x < wx + mw) {
          this.cx = (x / (wx + mw)) * mw + mlX
        }
        if (y < wy + mh) {
          this.cy = (y / (wy + mh)) * mh + mtY
        }
        if (x > wx + mw) {
          this.cx = ((x - wx - mw) / (wW - wx - mw)) * mw + mw + mlX
        }
        if (y > wy + mh) {
          this.cy = ((y - wy - mh) / (wH - wy - mh)) * mh + mh + mtY
        }
      }
    },
    data () {
      return {
        cx: 30.5,
        cy: 28.8
      }
    }
  }
</script>

<style lang="stylus">
  .logo
    display inline-block
    width 36px
    height 36px
    margin: 0 0 30px 0
    cursor pointer
    z-index: 90
    .head
      fill #383C3F
    .eye
      fill #FF3366;
</style>
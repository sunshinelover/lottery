<template>

    <div class='main'>
    <div class="title">
      <img src="~assets/group-2@3x.png">
    </div>
    <!-- <img src="assets/1.png"> -->
    <div class="lottery-box">
      <ul :class="illumination">
        <li style="transform: rotate(0deg) translateY(-45vw);"></li>
        <li style="transform: rotate(36deg) translateY(-45vw);"></li>
        <li style="transform: rotate(72deg) translateY(-45vw);"></li>
        <li style="transform: rotate(108deg) translateY(-45vw);"></li>
        <li style="transform: rotate(144deg) translateY(-45vw);"></li>
        <li style="transform: rotate(180deg) translateY(-45vw);"></li>
        <li style="transform: rotate(216deg) translateY(-45vw);"></li>
        <li style="transform: rotate(252deg) translateY(-45vw);"></li>
        <li style="transform: rotate(288deg) translateY(-45vw);"></li>
        <li style="transform: rotate(324deg) translateY(-45vw);"></li>
      </ul>
      <ul class="lottery-sector">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul class="lottery-gift">
        <li>{{one}}</li>
        <li>{{two}}</li>
        <li>{{three}}</li>
        <li>{{four}}</li>
        <li>{{five}}</li>
        <li>{{six}}</li>
        <li>{{seven}}</li>
        <li>{{eight}}</li>
        <li>{{nine}}</li>
        <li>{{ten}}</li>
      </ul>
    </div>
    <div class='pointer' @click="chou">
      <img src='~assets/2.png'>
    </div>
  <div class='result'>{{result}}</div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  // default
  // layout: 'default',
  head: {
    title: '抽奖'
  },
  data() {
    return {
      illumination: 'illumination1',
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
      seven: '',
      eight: '',
      nine: '',
      ten: '',
      result: '',
      deg: 0
    }
  },
  mounted: function() {
    axios
      .get('api/lottery/lottery')
      .then(response => {
        let n = parseInt(response.data)
        this.one = response.data.data[0].name
        this.two = response.data.data[1].name
        this.three = response.data.data[2].name
        this.four = response.data.data[3].name
        this.five = response.data.data[4].name
        this.six = response.data.data[5].name
        this.seven = response.data.data[6].name
        this.eight = response.data.data[7].name
        this.nine = response.data.data[8].name
        this.ten = response.data.data[9].name
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    // rnd(n, m) {
    //   return Math.floor(Math.random() * (m - n) + n)
    // },
    async chou() {
      let myPanel = document.getElementsByClassName('lottery-box')[0]
      let myMain = document.querySelector('.main')
      myMain.style.height = document.querySelector('body').height
      this.illumination = 'illumination2'
      myPanel.style.transition = 'none'
      myPanel.style.transform = 'rotate(0)'
      await axios
        .get('api/lottery/lottery')
        .then(response => {
          // let n = 4
          let n = parseInt(response.data.result)
          this.result = '结果马上出来～'
          let deg = 0 //实际要转的角度
          window.setTimeout(() => {
            this.illumination = 'illumination1'
            // this.result = '恭喜获得：50积分'
          }, 7000)
          switch (n) {
            case 0: //给指针定到转多少度时是安慰奖
              deg += [0, 144, 252][Math.floor(Math.random() * 3)]
              // deg = this.rnd(0, 3) * 60 + 120
              window.setTimeout(() => {
                this.result = '😄谢谢参与，也许好运就在下次哦😄'
                // this.illumination = 'illumination1'
              }, 5000)
              break
            case 1: //给指针定到转多少度时是一等奖（100元话费）
              deg = 180
              window.setTimeout(() => {
                this.result = '😊牛逼了！恭喜获得：100元话费😊'
                // this.illumination = 'illumination1'
              }, 5000)
              break
            case 2: //给指针定到转多少度时是二等奖（1元现金）
              deg = 36 * 11
              window.setTimeout(() => {
                // this.illumination = 'illumination1'
                this.result = '恭喜获得：1元现金'
              }, 5000)
              break
            case 3: //给指针定到转多少度时是三等奖（10元话费）
              deg = -36 * 2
              // deg = this.rnd(0, 3) * 63
              window.setTimeout(() => {
                // this.illumination = 'illumination1'
                this.result = '恭喜获得：10元话费'
              }, 5000)
              break
            case 4:
              deg = -36
              // deg = this.rnd(0, 3) * 63
              window.setTimeout(() => {
                // this.illumination = 'illumination1'
                this.result = '哎呦不错哦，恭喜获得：50积分'
              }, 5000)
              break
          }
          // deg = this.rnd(3, 6) * 360 + deg
          this.deg = deg + 1080 - 360
          myPanel.style.transition = '5s ease-in-out'
          myPanel.style.transform = 'rotate(' + this.deg + 'deg)'
          //myPointer.style.transform = 'rotate(' - deg + 'deg)';
          // alert(n);
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  async asyncData({ req, app }) {
    await app.$axios.$post('/api', {
      name: 'name',
      hi: 'xx'
    })
    const data = await app.$axios.$get('/api')
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { data, server: !!process.server, userAgent }
  }
}
</script>
<style scoped lang="stylus">
// @import '~assets/helper.styl';
// @import '~assets/reset.styl';
@keyframes twinkling {
  0% {
    background: #fefdfc;
    border: 1px solid #fefdfc;
  }

  25% {
    background: #fefdfc;
    border: none;
    box-shadow: 0px 0px 0 2px #eb6f21;
  }

  75% {
    background: #fefe00;
    border: 1px solid #fefe00;
  }

  100% {
    background: #fefe00;
    border: none;
    box-shadow: 0px 0px 0 2px #eb6f21;
  }
}

@keyframes twinkling2 {
  0% {
    background: #fefdfc;
    border: 1px solid #fefdfc;
  }

  25% {
    background: #fefdfc;
    border: none;
    box-shadow: 0px 0px 0 2px yellow;
  }

  75% {
    background: #eb6f21;
    border: 0 solid #eb6f21;
  }

  100% {
    background: #eb6f21;
    border: none;
    box-shadow: 0px 0px 0 2px yellow;
  }
}

html, body {
  width: 100%;
  height: 100%;
}

.main {
  position: relative;
  overflow: hidden;
  width: auto;
  height: 1400px;
  background-color: rgb(215, 73, 73); /* background: url(assets/1.png) no-repeat; */
  background: radial-gradient(white, red);
}

.lottery-box {
  position: absolute;
  left: 2.5vw;
  top: 65vw;
  border-radius: 50%;
  border: 15px rgb(193, 56, 32);
  width: 720px;
  height: 720px;
  background-color: rgb(193, 56, 32);
  transition: 5s ease-in-out;
  /* z-index: 99; */
}

.title {
  position: fixed;
  font-size: 100px;
  top: 10%;
  color: white;
  width: 80vw;
  left: 50%;
  margin-left: -40vw;
  font-style: italic;
}

.illumination1 {
  list-style: none;
}

.illumination1 li:nth-child(even) {
  display: block;
  width: 30px;
  height: 30px;
  background: #fff;
  position: absolute;
  top: 49%;
  left: 48.5%;
  margin: -4px 0 0 -4px;
  border-radius: 15px;
  // animation: twinkling 1.2s infinite ease-in-out;
}

.illumination1 li:nth-child(odd) {
  display: block;
  width: 30px;
  height: 30px;
  background: #fff;
  position: absolute;
  top: 49%;
  left: 48.5%;
  margin: -4px 0 0 -4px;
  border-radius: 15px;
  // animation: twinkling2 1.2s infinite ease-in-out;
}

.illumination2 {
  list-style: none;
}

.illumination2 li:nth-child(even) {
  display: block;
  width: 30px;
  height: 30px;
  background: #fff;
  position: absolute;
  top: 49%;
  left: 48.5%;
  margin: -4px 0 0 -4px;
  border-radius: 15px;
  animation: twinkling 1.2s infinite ease-in-out;
}

.illumination2 li:nth-child(odd) {
  display: block;
  width: 30px;
  height: 30px;
  background: #fff;
  position: absolute;
  top: 49%;
  left: 48.5%;
  margin: -4px 0 0 -4px;
  border-radius: 15px;
  animation: twinkling2 1.2s infinite ease-in-out;
}

.lottery-sector {
  list-style: none;
  width: 630px;
  height: 630px;
  position: absolute;
  overflow: hidden;
  top: 45px;
  left: 45px;
  border-radius: 50%;
  /* border: 4px solid #febd04; */
}

.lottery-sector li {
  margin: 0;
  width: 315px;
  height: 315px;
  position: absolute;
  transform-origin: 100% 100%;
}

.lottery-sector li:nth-child(1) {
  background-color: #fff;
  transform: rotate(0deg) skew(54deg);
}

.lottery-sector li:nth-child(2) {
  background-color: rgb(254, 246, 225);
  transform: rotate(36deg) skew(54deg);
}

.lottery-sector li:nth-child(3) {
  background-color: #fff;
  transform: rotate(72deg) skew(54deg);
}

.lottery-sector li:nth-child(4) {
  background-color: rgb(254, 246, 225);
  transform: rotate(108deg) skew(54deg);
}

.lottery-sector li:nth-child(5) {
  background-color: #FFF;
  transform: rotate(144deg) skew(54deg);
}

.lottery-sector li:nth-child(6) {
  background-color: rgb(254, 246, 225);
  transform: rotate(180deg) skew(54deg);
}

.lottery-sector li:nth-child(7) {
  background-color: #FFF;
  transform: rotate(216deg) skew(54deg);
}

.lottery-sector li:nth-child(8) {
  background-color: rgb(254, 246, 225);
  transform: rotate(252deg) skew(54deg);
}

.lottery-sector li:nth-child(9) {
  background-color: #FFF;
  transform: rotate(288deg) skew(54deg);
}

.lottery-sector li:nth-child(10) {
  background-color: rgb(254, 246, 225);
  transform: rotate(324deg) skew(54deg);
}

.lottery-gift {
  list-style: none;
  width: 630px;
  height: 630px;
  position: absolute;
  top: 4.8vw;
  left: 45px;
}

.lottery-gift li {
  position: absolute;
  display: block;
  margin: 0;
  width: 300px;
  height: 300px;
  color: #F44336;
  font-size: 4vw;
  line-height: 1.4;
  font-weight: bold;
  text-align: center;
  list-style: none;
  left: 22.7vw;
  padding-top: 40px;
  transform-origin: 50% 100%;
}

.lottery-gift li:nth-child(1) {
  top: 28px;
  transform: rotate(0deg);
}

.lottery-gift li:nth-child(2) {
  top: 28px;
  transform: rotate(36deg);
}

.lottery-gift li:nth-child(3) {
  top: 28px;
  transform: rotate(72deg);
}

.lottery-gift li:nth-child(4) {
  top: 28px;
  transform: rotate(108deg);
}

.lottery-gift li:nth-child(5) {
  top: 28px;
  transform: rotate(144deg);
}

.lottery-gift li:nth-child(6) {
  top: 28px;
  transform: rotate(180deg);
}

.lottery-gift li:nth-child(7) {
  top: 28px;
  transform: rotate(216deg);
}

.lottery-gift li:nth-child(8) {
  top: 28px;
  transform: rotate(252deg);
}

.lottery-gift li:nth-child(9) {
  top: 28px;
  transform: rotate(288deg);
}

.lottery-gift li:nth-child(10) {
  top: 28px;
  transform: rotate(324deg);
}

.pointer {
  position: fixed;
  top: 98vw;
  left: 41vw;
  width: 150px;
  height: 183px;
  z-index: 105;
  /* transform-origin: 75px 108px; */
}

img {
  height: 100%;
  width: 100%;
}

.result {
  position: fixed;
  color: white;
  font-size: 40px;
  top: 93%;
  left: 30px;
}
</style>

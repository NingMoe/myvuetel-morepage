<template>
  <scroll class="scroll" :data="scrollData">
    <div class="wrapper">
      <div class="header">
        <div class="back" @click="back">
          <img src="./back.png" alt="" width="20" height="20">
        </div>
        <span class="text">K码兑换日日赢DDW</span>
      </div>
      <div class="top-bg"></div>
      <div class="content-wrapper">
        <div class="content">
          <div class="line">
            <span class="left">K值余额</span>
            <span class="right">{{kAccount}}</span>
          </div>
          <div class="line">
            <span class="left" :class="{'grey':rate==='获取兑换价格','blue':rate!=='获取兑换价格'}">{{rate}}</span>
            <span class="time grey" v-show="timeShow">{{second}}s后重新获取</span>
            <span class="right" :class="{'blueBtn':!timeShow,'greyBtn':timeShow}" @click="clickGetRate">
            </span>
          </div>
          <div class="line border-none">
            <span class="left">可兑换DDW</span>
            <span class="right">{{rateDDw}}</span>
          </div>
          <div class="line border-none">
            <span class="left grey small">可兑换DDW = K值余额 / 兑换价格
              <span v-show="discount && discount!=1">/ 折扣</span>
              <!-- <span>/ 折扣</span> -->
            </span>
          </div>
          <div class="line border-none">
            <span class="left">DDW账户可用余额：</span>
            <span class="right">{{nowUseDDw}}</span>
          </div>
          <div class="line border-none">
            <span class="left">DDW账户冻结余额：</span>
            <span class="right">{{nowDongDDw}}</span>
          </div>
          <div class="line border-none">
            <span class="left grey small">冻结时间为{{dongDays}}天</span>
          </div>
          <div class="line border-none confirm" @click="_exchange">
          </div>
        </div>
      </div>
      <div class="footer">
        <a href="https://iosapp.phicomm.com/">
          <img src="./secondcode.png" alt="">
        </a>
        <span>扫描二维码下载日日赢APP</span>
        <span>查看当前兑换到账情况</span>
      </div>
      <div class="bottom" style="height:25px">
      </div>
      <div class="loading-container" v-show="loadingShow">
        <loading :title="'拼命加载中...'"></loading>
      </div>
      <middle-tip ref="middleTip" :textTitle="tipTitle" :textContent="tipContent"></middle-tip>
    </div>
  </scroll>

</template>

<script type='text/ecmascript-6'>
import { myLocalStorageSet } from '@utils/myStorage';
import {
  getRate,
  getNowDDw,
  exchange,
  getKNumAndDiscount
} from '../../../api/kcode.js';
import Loading from '@Base/Loading';
import MiddleTip from '@Base/middle-tip';
import Scroll from '@Base/scroll';
export default {
  name: 'Conversion',
  created() {
    const params = this.hrefToObj(window.location.href);
    const token = params.token;
    const kcode = params.kcode;
    if (!token) {
      return;
    }
    if (!kcode) {
      return;
    }
    this.kcode = kcode;
    myLocalStorageSet('token', token);
  },
  mounted() {
    // const params = this.hrefToObj(window.location.href);
    // const token = params.token;
    // const kcode = params.kcode;
    // if (!token) {
    //   this.tipTitle = 'token未传入';
    //   this.tipContent = '';
    //   this.$refs.middleTip.show();
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(() => {
    //     window.history.back(-1);
    //   }, 3100);
    //   return;
    // }

    // if (!kcode) {
    //   this.tipTitle = 'kcode未传入';
    //   this.tipContent = '';
    //   this.$refs.middleTip.show();
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(() => {
    //     window.history.back(-1);
    //   }, 3100);
    //   return;
    // }

    this.loadingShow = true;

    this.$nextTick(() => {
      // 获取兑换前的ddw
      this._getNowDDw();
      // 获取k值，以及折扣
      this._getKNumAndDiscount();
    });
  },
  data() {
    return {
      loadingShow: false,
      timeShow: false,
      second: 60,
      iTimer: null,
      tipTitle: '',
      tipContent: '',
      kAccount: '',
      rate: '获取兑换价格',
      rateDDw: 0,
      nowUseDDw: 0,
      nowDongDDw: 0,
      secondDDw: false,
      scrollData: [],
      kcode: '',
      discount: '',
      dongDays: ''
    };
  },

  methods: {
    // toDetail() {
    //   this.$router.push({
    //     name: 'Detail',
    //     params: {
    //       id: 'gsp',
    //       data: [{ name: 'name1' }, { name: 'name2' }]
    //     }
    //   });
    // },
    back() {
      window.history.back(-1);
    },
    hrefToObj(str) {
      const index = str.indexOf('?');
      const newStr = str.substr(index + 1);
      const arr = newStr.split('&');
      let obj = {};
      arr.forEach(item => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        if (!obj[key]) {
          obj[key] = value;
        }
      });
      return obj;
    },
    clickGetRate() {
      if (this.timeShow) {
        return;
      }
      this.loadingShow = true;
      getRate()
        .then(res => {
          if (res && res.error === '0' && res.data) {
            this.rate = res.data.rate - 0;
            // this.premium = res.data.premium - 0;
            this.timeShow = true;
            this.tipTitle = '获取兑换价格成功！';
            this.tipContent = '';
            this.$refs.middleTip.show();
            this.goSeconds();
            this.getRateDDW();
          } else {
            this.tipTitle = res.msg;
            this.tipContent = '';
            this.$refs.middleTip.show();
            this.timeShow = false;
          }
          this.loadingShow = false;
        })
        .catch(error => {
          console.log(error);
          this.tipTitle = '网络问题，请刷新页面重试';
          this.tipContent = '';
          this.loadingShow = false;
          this.$refs.middleTip.show();
          this.timeShow = false;
        });
    },
    _getNowDDw() {
      this.loadingShow = true;
      setTimeout(() => {
        this.scrollData = [{ name: 'gsp' }];
      }, 20);
      getNowDDw()
        .then(res => {
          if (res && res.error === '0' && res.data) {
            // 下面这2行要改
            this.nowDongDDw = res.data.blockedBalance - 0;
            this.nowUseDDw = res.data.availableBalance - 0;
            // debugger;
            if (this.secondDDw) {
              this.tipTitle = '兑换成功!!';
              this.tipContent = `DDW账户总额:${this.nowDongDDw +
                this.nowUseDDw}`;
              this.$refs.middleTip.show();
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                window.history.back(-1);
              }, 4500);
            }
          } else {
            this.tipTitle = res.msg;
            this.tipContent = '';
            this.$refs.middleTip.show();
          }
          this.loadingShow = false;
        })
        .catch(error => {
          console.log(error);
          this.tipTitle = '网络问题，请刷新页面重试';
          this.tipContent = '';
          this.loadingShow = false;
          this.$refs.middleTip.show();
        });
    },
    _exchange() {
      if (!this.kAccount && this.kAccount !== 0) {
        this.tipTitle = 'K值余额获取失败，无法计算可兑换DDw，请刷新页面';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      if (!this.discount && this.discount !== 0) {
        this.tipTitle = 'K值余额获取失败，无法计算可兑换DDw，请刷新页面';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      if (this.rate === '获取兑换价格' && this.rate !== 0) {
        this.tipTitle = '请先获取兑换价格！';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      // if (!this.premium && this.premium !== 0) {
      //   this.tipTitle = '兑换价格获取失败，请重新获取';
      //   this.tipContent = '';
      //   this.$refs.middleTip.show();
      //   return;
      // }

      // k值 用新的接口获取
      const money = this.kAccount - 0;
      // 兑换价格，这个不变
      const rate = this.rate - 0;
      // 可以兑换的ddw，=k值/this.rate/this.premium/it的折算率
      const amount = this.rateDDw - 0;
      const kcode = this.kcode;

      this.loadingShow = true;

      exchange(money, rate, amount, kcode)
        .then(res => {
          if (res && res.error === '0') {
            this.loadingShow = false;
            this.secondDDw = true;
            this._getNowDDw();
          } else {
            this.loadingShow = false;
            this.tipTitle = res.msg;
            this.tipContent = '';
            this.$refs.middleTip.show();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              window.history.back(-1);
            }, 3100);
          }
        })
        .catch(error => {
          console.log(error);
          this.tipTitle = '网络问题，请刷新页面重试';
          this.tipContent = '';
          this.loadingShow = false;
          this.$refs.middleTip.show();
        });
    },
    // 跑秒
    goSeconds() {
      this.timeShow = true;
      this.second = 60;
      clearInterval(this.iTimer);
      this.iTimer = setInterval(() => {
        this.second--;
      }, 1000);
    },
    // 获取可以兑换的DDW，需要保留4位小数
    getRateDDW() {
      if (!this.kAccount && this.kAccount !== 0) {
        this.tipTitle = 'K值余额获取失败，无法计算可兑换DDw，请刷新页面';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      if (!this.discount && this.discount !== 0) {
        this.tipTitle = 'K值余额获取失败，无法计算可兑换DDw，请刷新页面';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      if (this.rate === '获取兑换价格' && this.rate !== 0) {
        this.tipTitle = '兑换价格获取失败，请重新获取';
        this.tipContent = '';
        this.$refs.middleTip.show();
        return;
      }

      // if (!this.premium && this.premium !== 0) {
      //   this.tipTitle = '兑换价格获取失败，请重新获取';
      //   this.tipContent = '';
      //   this.$refs.middleTip.show();
      //   return;
      // }

      const kAccount = this.kAccount - 0;
      const rate = this.rate - 0;
      // const premium = this.premium - 0;
      const discount = this.discount - 0;
      this.rateDDw = (kAccount / rate / discount).toFixed(4) - 0;
    },
    // 获取k值与discount，以及冻结天数
    _getKNumAndDiscount() {
      this.loadingShow = true;
      getKNumAndDiscount(this.kcode)
        .then(res => {
          if (res && res.error === '0') {
            this.loadingShow = false;
            this.kAccount = res.data.money - 0;
            this.discount = res.data.exratio - 0;
            this.dongDays = res.data.days;
          } else {
            this.loadingShow = false;
            this.tipTitle = 'k值余额获取失败，请刷新页面重试';
            this.tipContent = '';
            this.$refs.middleTip.show();
          }
        })
        .catch(error => {
          console.log(error);
          this.tipTitle = '网络问题，请刷新页面重试';
          this.tipContent = '';
          this.loadingShow = false;
          this.$refs.middleTip.show();
        });
    }
  },
  watch: {
    second(newSecond) {
      if (newSecond === 0) {
        clearInterval(this.iTimer);
        this.timeShow = false;
      }
    }
  },
  components: {
    Loading,
    MiddleTip,
    Scroll
  }
};
</script>

<style scoped rel='stylesheet/scss' lang='scss'>
@import '@scss/variable.scss';
@import '@scss/mixin.scss';
// .loading-container {
//   position: fixed;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   z-index: 10000;
//   background-color: rgba(0, 0, 0, 0.8);
// }
.scroll {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    height: 44px;
    position: relative;
    text-align: center;
    line-height: 44px;
    font-size: 17px;
    color: #3e4248;
    letter-spacing: 1px;
    font-weight: 600;
    .back {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 20px;
      height: 20px;
      padding: 10px;
    }
    img {
      position: absolute;
      left: 10px;
      top: 12px;
    }
  }
  .top-bg {
    height: 100px;
    width: 100%;
    @include bg-image('topbg');
    background-size: cover;
    background-position: center center;
  }
  .content-wrapper {
    width: 100%;
    height: 420px;
    // background-color: $color-background;
    padding: 15px;
    box-sizing: border-box;
    .content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: -1px 1px 2px #ccc;
      padding-top: 20px;
      .line {
        margin-top: 10px;
        margin: 0 auto;
        width: 92%;
        height: 42px;
        position: relative;
        // @include border-1px-bottom(rgba(0, 0, 0, 0.1));
        &.border-none {
          @include border-none();
        }
        &.confirm {
          margin-top: 30px;
          @include bg-image('confirm');
          background-size: cover;
          background-position: center center;
          border-radius: 5px;
        }
        .left {
          position: absolute;
          left: 0px;
          top: 0;
          height: 42px;
          line-height: 42px;
          font-size: 0.8rem;
          color: #3e4248;
          letter-spacing: 1px;
          font-weight: 500;
          &.grey {
            color: rgba(0, 0, 0, 0.6);
          }
          &.blue {
            color: #0597fd;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            left: 20px;
          }
          &.small {
            font-size: 0.7rem;
          }
        }
        .time {
          position: absolute;
          right: 84px;
          top: 0;
          height: 42px;
          line-height: 42px;
          font-size: 14px;
          color: #3e4248;
          letter-spacing: 1px;
          font-weight: 500;
          &.grey {
            color: rgba(0, 0, 0, 0.5);
          }
        }
        .right {
          position: absolute;
          right: 0px;
          top: 0;
          height: 42px;
          line-height: 42px;
          font-size: 16px;
          color: #3e4248;
          font-weight: 600;
          letter-spacing: 1px;
          &.blueBtn {
            top: 5px;
            width: 80px;
            height: 30px;
            @include bg-image('bluePriceBtn');
            background-size: cover;
            background-position: center center;
          }
          &.greyBtn {
            top: 5px;
            width: 80px;
            height: 30px;
            @include bg-image('greyPriceBtn');
            background-size: cover;
            background-position: center center;
          }
          &.grey {
            top: 5px;
          }
        }
      }
    }
  }
  .footer {
    margin-top: 20px;
    margin-bottom: 20px;
    a {
      display: block;
      width: 120px;
      height: 120px;
      margin: 0 auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    span {
      margin-top: 5px;
      display: block;
      width: 100%;
      height: 14px;
      line-height: 14px;
      text-align: center;
      color: #3e4248;
      font-size: 14px;
    }
  }
}
</style>

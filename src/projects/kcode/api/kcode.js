// import { myJsonp } from '@utils/myJsonp';
import { myLocalStorageGet } from '@utils/myStorage';
import { myAxios } from '@utils/myAxios';
import qs from 'qs';
import { myJqAjaxPromise } from '@utils/myJqAjaxPromise';
// const dev = process.env.NODE_ENV !== 'production';

// function getRecommend() {
//   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
//   const params = Object.assign({}, commonParams, {
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   });

//   return myJsonp(url, params, options);
// };



function getRate() {
  const url = 'https://accountsym.phicomm.com​/ddwservice/v1/ddwrate';
  // const url = 'http://172.17.84.239:80/ddwservice/v1/ddwrate';
  const time = Date.now();
  const params = { _: time, activityID: '2' };
  // return myAxios.get(url, {
  //   params: params
  // })
  // .then((res) => {
  //   return Promise.resolve(res.data);
  // });

  return new Promise((resolve, reject) => {
    myAxios({
      method: 'get',
      url: url,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': myLocalStorageGet('token', '')
      }
    }).then((res) => {
      resolve(res.data);
    })
      .catch(err => reject(err));
  });
};

function getNowDDw() {
  // const url = 'https://accountsym.phicomm.com/ddwservice/v1/balance';
  const url = 'ddwservice/v1/balance';
  // const url = 'http://172.17.84.239:80/ddwservice/v1/balance';
  const time = Date.now();
  const params = { _: time, activityID: '2' };
  // return myAxios.get(url, {
  //   params: params
  // })
  // .then((res) => {
  //   return Promise.resolve(res.data);
  // });

  return new Promise((resolve, reject) => {
    myAxios({
      method: 'get',
      url: url,
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': myLocalStorageGet('token', '')
      }
    }).then((res) => {
      resolve(res.data);
    })
      .catch(err => reject(err));
  });
};

function exchange(money, rate, amount, kcode) {
  // const url = 'https://accountsym.phicomm.com/ddwexchange/v1/exchange';
  const url = 'https://kcodeddw.phicomm.com​/ddwexchange/v1/exchange';
  const time = Date.now();
  const params = { _: time };
  // return myAxios.get(url, {
  //   params: params
  // })
  // .then((res) => {
  //   return Promise.resolve(res.data);
  // });

  return new Promise((resolve, reject) => {
    myAxios({
      method: 'post',
      url: url,
      data: qs.stringify({
        money: money,
        rate: rate,
        amount: amount,
        kcode: kcode
      }),
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': myLocalStorageGet('token', '')
      }
    }).then((res) => {
      resolve(res.data);
    })
      .catch(err => reject(err));
  });
};

function getKNumAndDiscount(kcode) {
  // const url = 'https://accountsym.phicomm.com/ddwexchange/v1/exchange';
  const url = 'https://kcodeddw.phicomm.com​/ddwexchange/v1/kmoneyAndExratio';
  const time = Date.now();
  const params = { _: time };
  // return myAxios.get(url, {
  //   params: params
  // })
  // .then((res) => {
  //   return Promise.resolve(res.data);
  // });

  return new Promise((resolve, reject) => {
    myAxios({
      method: 'post',
      url: url,
      data: qs.stringify({
        kcode: kcode
      }),
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': myLocalStorageGet('token', '')
      }
    }).then((res) => {
      resolve(res.data);
    })
      .catch(err => reject(err));
  });
};


function testJqPromise() {
  const apiBaseUrl = 'http://localhost:9999';
  const url = '/api/paihang';

  return new Promise((resolve, reject) => {
    myJqAjaxPromise(apiBaseUrl, url, {
      type: 'post',
      data: {
        awardCode: 'codeText'
      },
      contentType: 'application/x-www-form-urlencoded'
      // headers: { Authorization: 'gsp-love-changhui' }
    })
      .then((res) => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

export { getRate, getNowDDw, exchange, getKNumAndDiscount, testJqPromise };

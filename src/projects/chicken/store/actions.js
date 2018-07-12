import * as types from './mutation-types';
console.log(types);
// import { playMode } from '@js/config';
// import { myShuffle } from '@utils/myHandleArr';

// { commit, state }, { list, index }---后面的{list,index}是提交的新的数据
export const selectPlay = function ({ commit, state }, { list, index }) {
  // commit(types.SET_SEQUENCE_LIST, list);
  // // 如果此时的播放模式是随机播放的话
  // if (state.mode === playMode.random) {
  //   let randomList = myShuffle(list);
  //   commit(types.SET_PLAY_LIST, randomList);
  //   index = findIndex(randomList, list[index]);
  // } else {
  //   commit(types.SET_PLAY_LIST, list);
  // }

  // commit(types.SET_CURREENT_INDEX, index);
  // commit(types.SET_FULL_SCREEN, true);
  // commit(types.SET_PLAYING_STATE, true);
};

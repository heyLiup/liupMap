
export default {

  namespace: 'example',

  state: {
    position:{  //定位信息
        locX:114.02597366,
        locY:22.54605355,
        city:"北京"
    },
    search:{  //搜索内容
        val:""
    },
    iptsShow:{ //切换搜索框或者导航框
      searchInput:true,  //搜索框显示
    },
    guide:{ //导航
      startLoc:"",
      endLoc:"",
      guideType:""
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    currentLoc(state,{ payload: {...position} }) {
      console.log(position);
      // return state.position=position
      return {...state,position}
    },
    search(state,{ payload: {val:search} }){
      console.log(search);
      return {...state,search}
    },
    toogleInput(state,{payload:{...iptsShow}}){
      console.log(iptsShow);
      return {...state,iptsShow}
    }
  },

};


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
    guide:{ //导航参数
      startLoc:"",
      endLoc:"",
    },
    guideType:{  //导航类型
      guideType:"bus"
    },
    guideResult:{ //导航结果
      show:false
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
      // return state.position=position
      return {...state,position}
    },
    search(state,{ payload: {val:search} }){
      return {...state,search}
    },
    toogleInput(state,{payload:{...iptsShow}}){
      return {...state,iptsShow}
    },
    toggleGuideResult(state,{payload:{...guideResult}}){
      return {...state,guideResult}
      
    },
    handleGuideType(state,{payload:{...guideType}}){
      return {...state,guideType}
    }
  },

};

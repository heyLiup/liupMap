
export default {

  namespace: 'example',

  state: {
    position:{
        locX:114.02597366,
        locY:22.54605355,
        city:"深圳市"
    },
    search:{
        val:""
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
    currentLoc(state,{ payload: position }) {
      console.log(position);
      return state.position=position
    },
    search(state,{ payload: val }){
      console.log(val);
      
      return state.search=val
    }
  },

};

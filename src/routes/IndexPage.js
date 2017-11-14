import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Input } from 'antd';
const Search = Input.Search;
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'

class IndexPage extends React.Component{
	constructor(props){
		super(props)
	}

	getLocation(){
		var geolocation = new BMap.Geolocation();
		var _this=this;
		geolocation.getCurrentPosition(function (r) {
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				var point = new BMap.Point(r.point.lng, r.point.lat);
				var overLay=map.getOverlays();
				overLay.forEach(function(v,i){  //清除标注
					map.removeOverlay(v);
				})
				map.centerAndZoom(point, 15);
				var marker = new BMap.Marker(point);  // 创建标注
				map.addOverlay(marker);               // 将标注添加到地图中
				//marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				marker.enableDragging();
				map.addEventListener("click", function(e){    
					// point = new BMap.Point(e.point.lng , e.point.lat);
					// marker = new BMap.Marker(point);  // 创建标注
					// map.addOverlay(marker); 
					console.log(e);
				}) 
				_this.props.dispatch({
					type:"example/currentLoc",
					payload:{
						locX:r.point.lng,
						locY:r.point.lat,
						city:r.address.city
					}
				})
			} else {
			}
		})
		
	
	}
	handelSearch(val){
		this.props.dispatch({
			type:"example/search",
			payload:{
				val:val
			}
		})
		//搜索
		var local = new BMap.LocalSearch(map, {
			renderOptions:{map: map}
		});
		local.search(val);
		
	}
	componentWillMount(){
		this.getLocation();
	}
	componentDidMount(){
		this.getLocation();
		
		var BMap = window.BMap
		window.map = new BMap.Map("allmap"); // 创建Map实例
		var _this=this;
		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		map.centerAndZoom(new BMap.Point(114.02597366, 22.54605355), 14); // 初始化地图,设    置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl( {type: BMAP_ANCHOR_BOTTOM_RIGHT} )); //添加地图类型控件
		map.addControl(new BMap.ScaleControl( {type: BMAP_ANCHOR_TOP_LEFT} )); //添加地图类型控件
		map.setCurrentCity(this.props.example.city); // 设置地图显示的城市 此项是必须设置的
		map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_LARGE}));
	}
	componentWillUpdate(){
		map.centerAndZoom(new BMap.Point(this.props.example.locX, this.props.example.locY), 14); 
		//定位
		var _this=this;
		var geolocationControl = new BMap.GeolocationControl();
		geolocationControl.addEventListener("locationSuccess", function(e){  //点击定位
			_this.getLocation();
		});
		geolocationControl.addEventListener("locationError",function(e){
		// 定位失败事件
			alert(e.message);
		});
		map.addControl(geolocationControl);
		
	}

		
	render(){
		return (
			<div className={styles.normal}>
				<Search
					placeholder="输入位置"
					style={{ width: '80%'}}
					onSearch={value => this.handelSearch(value)}
					className={styles.SearchInput}
				/>
				{/* <Search
					placeholder="输入终点"
					style={{ width: '80%',marginTop:"3%"}}
					onSearch={value => this.handelSearchEnd(value)}
					className={styles.SearchInput}
				/> */}
				<div id="allmap" className={styles.myMap}>
				</div>
			
			</div>
		);
	}
}

function mapStateToProps({example}) {
	return {example};
  }
  
  export default connect(mapStateToProps)(IndexPage);
  

import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Input ,Select,Button} from 'antd';
const Search = Input.Search;
const InputGroup = Input.Group;
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import Menu from "./Menu.js";

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
				}) 
				var position={
					locX:r.point.lng,
					locY:r.point.lat,
					city:r.address.city
				}
				console.log(position);
				_this.props.dispatch({
					type:"example/currentLoc",
					payload:position
				})
			} else {
			}
		})
	}
	handelSearch(val){
		var value=val;
		this.props.dispatch({
			type:"example/search",
			payload:{
				val:value
			}
		})
		//搜索
		var local = new BMap.LocalSearch(map, {
			renderOptions:{map: map}
		});
		local.search(val?val:"深圳");
		
	}
	handelSearchWayEnd(endLoc){
		// var startLoc=this.refs.startLoc;
		var startLoc= ReactDOM.findDOMNode(this.refs.startLocs).value;
		console.log(endLoc+startLoc);
		var transit = new BMap.TransitRoute(map, {
			renderOptions: {map: map, panel: "r-result"}, 
			// onResultsHtmlSet : function(){$("#r-result").show()}  	
		});
		transit.search(startLoc,endLoc);
	}
	componentWillMount(){
		// this.getLocation();
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
		map.centerAndZoom(new BMap.Point(this.props.example.position.locX, this.props.example.position.locY), 14); 
		//定位
		var _this=this;
		var opts = {type: BMAP_NAVIGATION_CONTROL_LARGE,anchor:BMAP_ANCHOR_TOP_RIGHT}  
		var geolocationControl = new BMap.GeolocationControl(opts);
		geolocationControl.addEventListener("locationSuccess", function(e){  //点击定位
			_this.getLocation();
		});
		geolocationControl.addEventListener("locationError",function(e){
		// 定位失败事件
			alert(e.message);
		});
		map.addControl(geolocationControl);
		console.log(this.props.example);
	}
	render(){
		return (
			<div className={styles.normal}>
					<Search
						placeholder="深圳"
						style={{ width: '80%'}}
						onSearch={value => this.handelSearch(value)}
						className={this.props.example.iptsShow.searchInput?styles.show:styles.hidden}
					/>
							
					<InputGroup compact style={{ width: '30%'}} className={!this.props.example.iptsShow.searchInput?styles.show:styles.hidden}>
						<Input
							placeholder="输入起点"
							style={{ width: '85%'}}
							/* onSearch={value => this.handelSearchWayStart(value)} */
							/* className={!this.props.example.iptsShow.searchInput?styles.show:styles.hidden} */
							ref="startLocs"
						/>
						<Select style={{ width: '15%' }} defaultValue="公交" >
							<Select.Option value="bus">公交</Select.Option>
							<Select.Option value="bike">骑行</Select.Option>
							<Select.Option value="foot">步行</Select.Option>
							<Select.Option value="car">驾车</Select.Option>
						</Select>
					</InputGroup>

					<InputGroup compact style={{ width: '30%',marginTop:"40px"}} className={!this.props.example.iptsShow.searchInput?styles.show:styles.hidden}>
						<Search
							placeholder="输入终点"
							style={{ width: '100%'}}
							onSearch={value => this.handelSearchWayEnd(value)}
						/> 
				
						
					</InputGroup>

					
				<div className={styles.Menus}>
					<Menu/>
				</div>
			
				<div id="allmap" className={styles.myMap}>
				</div>
				<div id="r-result" ref="r-result" className={styles.result}></div>
			
			</div>
		);
	}
}

function mapStateToProps({example}) {
	return {example};
  }
  
export default connect(mapStateToProps)(IndexPage);
  

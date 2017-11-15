import React from 'react';
import { connect } from 'dva';
import styles from './Menu.css';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

class Menus extends React.Component{
  constructor(props){
    super(props); //super关键字用于访问和调用一个对象的父对象上的函数。 在this之前调用
    this.state={ collapsed: true};
    window. _this=this
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  calcRoute({ item, key, keyPath }){  
    console.log(key);
    var myDis = new BMapLib.DistanceTool(map);
    if(key==2){
      myDis.open();
        //myDis.close();  //关闭鼠标测距大
    }
    else if(key==1){
      myDis.close();
      var iptsShow={searchInput:true}
      _this.props.dispatch({
        type:"example/toogleInput",
        payload:iptsShow
      })
    }
    else if(key==4){
      myDis.close();
      var iptsShow={searchInput:false}
      _this.props.dispatch({
        type:"example/toogleInput",
        payload:iptsShow
      })
    }
  }
  // test({ key, domEvent }){
  //   console.log(key);
  // }
  render() {
    return (
      <div style={{ width: 200}}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 ,marginLeft:-120}}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={this.calcRoute}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>查询地图</span>
          </Menu.Item>
          <Menu.Item key="2" >
            <Icon type="desktop" />
            <span>测量距离</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="pushpin-o" />
            <span>增加标记</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="compass" />
            <span>导航</span>
          </Menu.Item>
          {/* <SubMenu key="sub1" title={<span><Icon type="compass" /><span>导航</span></span>}>
            <Menu.Item key="5">步行导航</Menu.Item>
            <Menu.Item key="6">骑行导航</Menu.Item>
            <Menu.Item key="7">开车导航</Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}
function mapStateToProps({example}) {
	return {example};
}
export default connect(mapStateToProps)(Menus);

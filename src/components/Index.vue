<template>
<div id="body">
  <div id="left">
    <div class="left-title">
      <div :class="ischeck == true ? 'equipmentcheck':'equipment'" @click="checkequipment">
						<div class="equipment-text">
							<span>设备列表</span>
						</div>
			</div>
			<img class="bline" src="../assets/img/line1.png"/>
    </div>
    <div class="left-ul">     
        <ul>
          <li v-for="datas in alldevice" :key="datas.created_time" :class="liischeck === 'a'+datas.created_time ? 'lichecked':''" @click="lichangecheck(datas)" :id="'a'+datas.created_time">
            <div class="left-list"> 
              <div class="ul-text">
              <img class="devimg" src="../assets/img/device.jpg">
              <span>{{datas.name}}</span>
              </div>
            </div>
           <img class="bline" src="../assets/img/line1.png"/> 
          </li>
        </ul>    
    </div>
    <div class="left_code">
        <img v-show="isotherlogo == false" class="lcodeimg" src="../assets/img/qr_code.png"/>
				<img v-show="isotherlogo == true" class="lcodeimg" :src="leftcode"/>
		</div>
  </div>
  <div id="right">
    <div class="top">
				<div class="top_title">
					<div class="title">
						<img v-show="isotherlogo == true" class="title_logo" :src="logoimgsrc"/>
            <img v-show="isotherlogo == false" class="title_logo" src="../assets/img/logo.png"/>
						<label id="title_text" class="title_text">{{toptitle}}</label>
					</div>
				</div>
				
				<div class="information">
					<div class="adate">
						<img class="addrmark" src="../assets/img/mark.png" />
						<span id="maddress">广东省 深圳市</span>
						<span id="dweek" class="dweek">{{realdate}}</span>
					</div>
					<div class="time">
						<span id="timehour" class="timehour">{{realtime}}</span>
            <img class="weather" :src="getWeatherImgUrl(weather)" />         
					</div>
					<div class="outdoor">
						<ul>
							<li>
								<span class="tleft">温度</span>
								<span class="tright">
									<span id="tdata1">{{citytemperature}}</span>
									<span class="extra">℃</span>									
								</span>
							</li>
							<li>
								<span class="tleft">湿度</span>
								<span class="tright">
									<span id="tdata2">{{cityhumidity}}</span>
									<span class="extra">%</span>
								</span>
							</li>
							<li>
								<span class="tleft">PM2.5</span>
								<span class="tright">
									<span id="tdata3">{{citypm25}}</span>
									<span class="extra">μg/m³</span>
								</span>
							</li>
						</ul>
					</div>
					<div class="out"><img src="../assets/img/outlogin.png" class="outimg" @click="dialogVisible = true"/></div>
					<div class="mapLink">
						
							<img src="../assets/img/map.png" id="mapLink"/>	
						
					</div>
					
				</div>
				<!-- <div class="qr_code">
					<img class="codeimg" id="codeimg" src="img/qr_code.png" />
				</div>
				<div class="clear"></div> -->
				<div class="top_cir">
					<div class="otop_cir1">
						<div class="top_cir1">
							<div class="top_data1 top_data">
								<p class="v1">PM2.5</p>
								<p class="v2" :style="{'color':computed25Color(pm25)}">{{pm25}}</p>
								<p class="v3">μg/m³</p>
								<p class="v4">{{pm25severity}}</p>
							</div>
						</div>
					</div>
					<div class="otop_cir2">
						<div class="top_cir2">
							<div class="top_data2 top_data">
								<p class="v1">{{types}}</p>
								<p class="v2" :style="{'color':fontcolors}">{{typesvalue}}</p>
								<p class="v3">{{typesunit}}</p>
								<p class="v4">{{typesseverity}}</p>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="mobileout" id="mobileout">
						<img src="img/outlogin.png" />	
				</div> -->
				
			</div>

      <div class="timetype">
				<ul>
					<li><span class="stime">{{histime}}</span></li>
				</ul>
			</div>
			<div class="datatype">
				<ul>
					<li :class="histype == 'tvoc'? 'special':''" @click="curvetvoccheck"><span class="sdata">TVOC</span></li>
					<li :class="histype == 'hcho'? 'special':''" @click="curvehchocheck"><span class="sdata">HCHO</span></li>
					<li :class="histype == 'co2'? 'special':''" @click="curveco2check" ><span class="sdata">CO2</span></li>
					<li :class="histype == 'pm25'? 'special':''" @click="curvepm25check" id="hispm25"><span class="sdata">PM2.5</span></li>
				</ul>
			</div>

      <div class="middle" id="middle"></div>
      <div class="bottom">
        <div :class="isotherdatalist == true ? 'otherdatalist': 'datalist'">
					<div :class="btlicheck == 'temperature'? 'btonclick': 'temperature'" @click="temperaturecheck">
						<img src="../assets/img/line.png" class="bhimg" />
						<div class="child">
							<img src="../assets/img/datalist/temp.png" class="bicon" />
							<label :class="btlicheck == 'temperature'? 'btextcheck': 'btext'">温度</label>
							<label :class="btlicheck == 'temperature'? 'clabel2check' : 'clabel2'">℃</label>
							<p id="btemp" class="clabel1">{{temperature}}</p>
						</div>
					</div>
					<div :class="btlicheck == 'humidity'? 'btonclick': 'humidity'" @click="humiditycheck">
						<img src="../assets/img/line.png" class="img_line bhimg" />
						<div class="child">
							<img src="../assets/img/datalist/humi.png" class="bicon" />
							<label :class="btlicheck == 'humidity'? 'btextcheck': 'btext'">湿度</label>
							<label :class="btlicheck == 'humidity'? 'clabel2check' : 'clabel2'">%RH</label>
							<p id="bhumi" class="clabel1">{{humidity}}</p>
						</div>
					</div>
					<div :class="btlicheck == 'co2'? 'btonclick': 'co2'" @click="co2check" id="co2">
						<img src="../assets/img/line.png" class="img_line bhimg" />
						<div class="child">
							<img src="../assets/img/datalist/co2.png" class="bicon" />
							<label :class="btlicheck == 'co2'? 'btextcheck': 'btext'">CO2</label>
							<label :class="btlicheck == 'co2'? 'clabel2check' : 'clabel2'">μg/m³</label>
							<p id="bco2" class="clabel1">{{co2}}</p>
						</div>
					</div>
					<div :class="btlicheck == 'tvoc'? 'btonclick': 'tvoc'" @click="tvoccheck">
						<img src="../assets/img/line.png" class="img_line bhimg" />
						<div class="child">
							<img src="../assets/img/datalist/tvoc.png" class="bicon bicon4" />
							<label :class="btlicheck == 'tvoc'? 'btextcheck': 'btext'">TVOC</label>
							<label :class="btlicheck == 'tvoc'? 'clabel2check' : 'clabel2'">mg/m³</label>
							<p id="btvoc" class="clabel1">{{tvoc}}</p>
						</div>
					</div>
					<div :class="btlicheck == 'hcho'? 'btonclick': 'hcho'" @click="hchocheck">
						<img src="../assets/img/line.png" class="img_line bhimg" />
						<div class="child">
							<img src="../assets/img/datalist/hcho.png" class="bicon bicon5" />
							<label :class="btlicheck == 'hcho'? 'btextcheck': 'btext'">HCHO</label>
							<label :class="btlicheck == 'hcho'? 'clabel2check' : 'clabel2'">mg/m³</label>
							<p id="bhcho" class="clabel1">{{hcho}}</p> 
						</div>
					</div>
					<div :class="btlicheck == 'bpm10'? 'btonclick': 'bpm10'" @click="bpm10check">
						<img src="../assets/img/line.png" class="img_line bhimg"/>
						<div class="child">
							<img src="../assets/img/datalist/pm10.png" class="bicon bicon6" />
							<label :class="btlicheck == 'bpm10'? 'btextcheck': 'btext'">PM10</label>
							<label :class="btlicheck == 'bpm10'? 'clabel2check' : 'clabel2'">μg/m³</label>
							<p id="bpm10" class="clabel1">{{bpm10}}</p>
						</div>
						
					</div>
				</div>
				<marquee id="rolling" class="rolling" contenteditable="false" onstart="this.firstChild.innerHTML+=this.firstChild.innerHTML;" direction=left behavior=scroll loop=-1 scrollamount=6 scrolldelay=10 align=top onmouseover=this.stop() onmouseout=this.start()>
					{{rollingtext}}</marquee>
      </div>
  </div>
        <el-dialog
        title="退出登录"
        :visible.sync="dialogVisible"
        >
        <span>你确定退出登录吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
</div>
  
</template>

<script>
import mainServices from "@/services/mainServices.js"
import moment from 'moment'
export default {
  name: 'Index',
  data () {
    return {
      ischeck:false,
      user_id:0,
      device:"",
      timeArray:[],
      lineArray:[],
      ctitle:"",
      identity:"0",
      alldevice:[],
      firstlicheck:"",
      liischeck:"",
      logoimgsrc:"",
      //../assets/img/logo.png
      toptitle:"华盛昌云空气监控系统",
      leftcode:"",
      isotherlogo:false,
      isotherdatalist:false,
      rollingtext:"欢迎光临华盛昌!",
      weatherimgsrc:"",
      temperatureischeck:false,
      humidityischeck:false,
      btlicheck:"",
      temperature:"",
      humidity:"",
      co2:"",
      tvoc:"",
      hcho:"-.--",
      bpm10:"",
      pm25:"",
      city:"",
      citytemperature:"",
      cityhumidity:"",
      citypm25:"",
      weather:"sunny",
      pm25severity:"",
      types:"",
      typesvalue:"",
      typesunit:"",
      typesseverity:"",
      fontcolors:"#135be0",
      realdate:"",
      realtime:"",
      histime:"24h",
      histype:"",
      dialogVisible:false
    }
  },
  mounted() {
        // if(this.alldevice != []){
        //   document.getElementById(this.firstlicheck).click;
        // }
        //获得实时时间
        this.getrealdate();
        //获得设备列表
        this.getAddress();
        setInterval(this.getAddress,1000*60*1);
        setInterval(this.getrealdate,1000);
        setInterval(this.getHisdata, 30 * 60 * 1000);
        this.timer();
  },
  methods:{
   
//     isObjectValueEqual(a, b) {
//       // Of course, we can do it use for in Create arrays of property names
//       var aProps = Object.getOwnPropertyNames(a);
//       var bProps = Object.getOwnPropertyNames(b);
//       // If number of properties is different, objects are not equivalent
//       if (aProps.length != bProps.length) {
//         return false;
//       }
//       for ( var i = 0; i < aProps.length; i++ ) {
//         var propName = aProps[i];
//         // If values of same property are not equal, objects are not equivalent
//         if (a[propName] !== b[propName]) {
//           return false;
//         }
//       }
//       // If we made it this far, objects are considered equivalent
//       return true;
//     },
//     unique(arr) { // 根据唯一标识orderId来对数组进行过滤
//  　　　　　　const res = new Map();  //定义常量 res,值为一个Map对象实例
// 　　　　　　//返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
// 　　　　　　return arr.filter((arr) => !res.has(arr.OrderId) && res.set(arr.OrderId, 1)) 
//     },
    ld(count){
      var c = []	
      for (var b = 1; b <= count; b++){
        c.push(0)
      }
      return c
    },
    ls(count){
      var a = [],
          b = 1;
        for (var i = (count + 1); i < 24; i++) {
          a.push(i + ":00");
        }
        a.push("00:00");
        for (; b <= count; b++) {
          if (b < 10) {
            b = "0" + b;
          }
          a.push(b + ":00");
        }
        return a;
    },
    //切换曲线列表
    curvetvoccheck(){
      this.histype = 'tvoc'
      this.ctitle = 'TVOC'
      this.getHisdata()
    },
    curvehchocheck(){
      this.histype = 'hcho'
      this.ctitle = 'HCHO'
      this.getHisdata()
    },
    curveco2check(){
      this.histype = 'co2'
      this.ctitle = 'CO2'
      this.getHisdata()
    },
    curvepm25check(){
      this.histype = 'pm25'
      this.ctitle = 'PM2.5'
      this.getHisdata()
    },
    getrealdate(){
      let date = new Date();
      let realdate = moment(date).format("yyyy.M.D");
      let weeknum = moment(date).format("d");
      let week;
      if(parseInt(weeknum) == 1){
          week = "星期一"
      }else if(parseInt(weeknum) == 2){
          week = "星期二"
      }else if(parseInt(weeknum) == 3){
          week = "星期三"
      }else if(parseInt(weeknum) == 4){
          week = "星期四"
      }else if(parseInt(weeknum) == 5){
          week = "星期五"
      }else if(parseInt(weeknum) == 6){
          week = "星期六"
      }else if(parseInt(weeknum) == 0){
          week = "星期天"
      }
      this.realdate = realdate +" "+week;
      this.realtime = moment(date).format("kk:mm");
      //console.log(this.realdate,this.realtime) 
    },
    getWeatherImgUrl (img) {
      //console.log(img);
      return require("@/assets/img/" + img+ ".png");
    },
    computed25Color(data){
                  let pm25 = data;
                  let color = ''
                  if (0 <= parseInt(pm25) && parseInt(pm25) <= 35) {
                      color = "#135be0";
                    } else if (35 < parseInt(pm25) && parseInt(pm25) <= 75) {
                      color = "#ffe698";
                    } else if (75 < parseInt(pm25) && parseInt(pm25) <= 115) {
                      color = "#ffc28b";
                    } else if (115 < parseInt(pm25) && parseInt(pm25) <= 150) {
                      color = "#ff8e8e";
                    } else if (150 < parseInt(pm25) && parseInt(pm25) <= 250) {
                      color = "#ff8fe9";
                    } else if (250 < parseInt(pm25)) {
                      color = "#c580ff";
                    }else{
                      color = "#135be0";
                    }
                    return color;
    },
    //echarts绘图
    createEcharts(){
      //--- 折柱 ---
      var myChart = this.$echarts.init(document.getElementById('middle'), 'macarons');
			myChart.setOption({
				tooltip: {
					trigger: 'axis' //'item'
				},
				grid: {
					x: 58, //左上角x边距
					y: 55, //左上角y边距
					x2: 48, //右下角x边距
					y2: 35, //右下角y边距
					borderWidth: 0,
					containLabel: true
				},
				backgroundColor: '#2989eb',
				calculable: false, //设置无数据的点(数据为'-')是否显示
				addDataAnimation: false, //设置图表无数据时是否加载loading动画
				animation: false, //设置曲线init时是否有从x轴跳动的动画
				noDataLoadingOption: {
					text: '暂无数据',
					effect: 'bubble',
					effectOption: {
						effect: {
							n: 0 //气泡个数为0 
						}
					}
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false, //坐标轴两端空白策略，false为曲线离y轴无距离,[0,0]则为曲线起点不在y轴上
					data: this.timeArray, //a,//timedata.reverse(), //['1月','','','2月','3月','4月','5月','6月']
					axisLabel: {
						interval: 'auto', //'auto', //刻度间隔[x轴上显示间隔为1小时]
						textStyle: {
							color: "white", //x轴坐标文字颜色
							fontSize: 15
						},
						margin: 8 //设置坐标轴文本标签与坐标轴的间距
					},
					axisLine: {
						lineStyle: {
							color: 'white', //'#8A8A8A', //x轴线颜色
							width: 1, //x轴线宽度
							onZero: true
						}
					},
					axisTick: {
						show: true, //去掉x轴刻度线
						interval: 0,
						lineStyle: {
							color: "#ffffff"
						}
					},
					splitLine: {
						show: false //是否显示网格线
					},
					splitArea: {
						show: false //是否保留网格区域，若保留会出现div块状排列
					}
				}],
        yAxis: [{
					axisTick: {
						alignWithLabel: true,
					},
					//interval: 'auto',
					type: 'value',
					show: true,
					//name: ctitle,
					nameTextStyle: {
						color: 'white',
						fontSize: 15
					},
					splitArea: {
						show: false //是否保留网格区域
					},
					splitLine: {
						show: true, //是否显示网格线
						lineStyle: {
							color: "#8b9094",
							//type: 'dashed',
							width: 1
						}
					},
					axisLabel: {
						textStyle: {
							color: "white",
							fontSize: 15
						},
						margin: 5
          },
          min:5,
					splitNumber: 5, //设置y轴刻度间隔(为5时y轴刻度被平分为5等分)
					axisLine: {
						lineStyle: {
							color: 'white', //'#8A8A8A', //y轴线颜色
							width: 1, //y轴线宽度
							onZero: true
						}
					}
				}],
				series: [{
					name: this.ctitle,
					type: 'line',
					symbol: 'none', //'circle', //去掉曲线上的点
					symbolSize: 1, //设置鼠标悬浮时选中点的大小
					data: this.lineArray, //linedata, //[2.6,23,45, 5.9, 9.0, 26.4, 28.7, 70.7,78,78,56,57,97,46]
					itemStyle: {
						normal: {
							color: '#00f5a4', //设置曲线上标示点的颜色
							lineStyle: {
								color: 'white', //'#0a29ac' 
								width: 2
							}
						}
					} 
				}]
			});
			myChart.hideLoading();
    },
    //获得设备列表
    getAddress(){
        //this.alldevice = [];
        this.user_id=this.$Request.user_id;
        //console.log("this.id",this.user_id);
        mainServices.getAddress(this.identity,this.user_id)
        .then(Response =>{
          if(Response.res_code === "E_0000"){
            //console.log(Response.alldevice)
            this.firstlicheck = 'a'+Response.alldevice[0].created_time;
            this.alldevice = Response.alldevice;
            // for (var i = 0; i < Response.alldevice.length; i++) {
            //     if(i == 0){
            //       this.firstlicheck = 'a'+Response.alldevice[0].created_time;
            //       this.alldevice.push(Response.alldevice[0]); 
            //     }else{
            //       this.alldevice.push(Response.alldevice[i]); 
            //     }              
            // }
            //this.alldevice = this.unique(this.alldevice);
            //console.log(this.alldevice);          
            this.$nextTick(() =>{
                document.getElementById(this.firstlicheck).click()
                document.getElementById('hispm25').click()
            })
          }
        })
        .catch(error =>{
          console.log(error);     
        })
    },
    //获得历史曲线图
    getHisdata(){
      mainServices.getHisdata(this.device,this.histime,this.histype)
      .then(Response =>{
        if(Response.res_code === "E_0000"){
          if (Response.data.length <= 0) {
						this.lineArray = this.ld(24);
					} else {
						for (var i = 0; i < 24; i++) {
							this.lineArray[i] = Response.data[i].value;
						}
          }
          this.timeArray = this.ls((new Date).getHours());
          this.createEcharts();
          
        }
      })
      .catch(error =>{
          console.log(error);     
      })
    },
    //获得设备实时数据
    getRealdata(){
      //console.log("getRealdata");
      mainServices.getRealdata(this.device)
      .then(Response =>{
        if(Response.res_code === "E_0000"){
           let city = Response.city;
					if (city == "" || city == null) {
					 this.citytemperature =	Response.temperature;
					 this.cityhumidity =	Response.humidity;
					 this.citypm25 =	Response.pm25;
					} else {

						if (city.indexOf("省") > 0) { //city带省
							let start = city.indexOf("省") + 1;
							let stop = city.indexOf("市") + 1;
							this.city = city.substring(start, stop);
						} else if (city.indexOf("区") > 0) { //city为自治区或城区(北京市北京城区)
							if (city.indexOf("区") > city.indexOf("市")) {//(北京市北京城区)
								let stop = city.indexOf("市") + 1;
								this.city = city.substring(0, stop);
							} else {//(内蒙古自治区呼和浩特市)
								let start = city.indexOf("区") + 1;
								let stop = city.indexOf("市") + 1;
								this.city = city.substring(start, stop);
							}
						} else {
              //city为直辖市不作任何处理
               this.city = city;
						}
          }
           this.temperature =	Response.temperature;
					 this.humidity =	Response.humidity;
            if (Response.type == "DT-968") {
              this.co2 = "---";
              this.tvoc = "-.--";
              this.hcho = "-.--";
            } else {
             this.co2 = Response.co2;
             this.tvoc = Response.tvoc;
             this.tvoc = Response.hcho;
            }
            this.pm25 =	Response.pm25;
            this.bpm10 = Response.pm10;

            let pm25 = Response.pm25;
                  if (0 <= parseInt(pm25) && parseInt(pm25) <= 35) {
                      this.pm25severity = "优";
                    } else if (35 < parseInt(pm25) && parseInt(pm25) <= 75) {
                      this.pm25severity = "良";
                    } else if (75 < parseInt(pm25) && parseInt(pm25) <= 115) {
                      this.pm25severity = "轻";
                    } else if (115 < parseInt(pm25) && parseInt(pm25) <= 150) {
                      this.pm25severity = "中";
                    } else if (150 < parseInt(pm25) && parseInt(pm25) <= 250) {
                      this.pm25severity = "重";
                    } else if (250 < parseInt(pm25)) {
                      this.pm25severity = "严重";
                    }//end with elesif
          this.$nextTick(() =>{
                    document.getElementById("co2").click()
                  })
           this.getWeather();        
        }
      })
      .catch(error =>{
          console.log(error);     
      })
    },
     timer:function(){
      return setInterval(()=>{
        this.getRealdata();
      },1000*1*60);
    },
    getWeather(){
      //获取室外pm2.5,温度等数据函数
      mainServices.getWeather(this.city)
            .then(Response =>{
              if(Response.res_code === "E_0000"){
                  this.citytemperature =	Response.temperature;
                  this.cityhumidity =	Response.humidity;
                  this.citypm25 =	Response.pm25;

                  let condition = Response.weather;
                  if (condition.indexOf("转") >= 0) { //天气描述中存在“转”字
                    condition = condition.substr(0, condition.indexOf("转"));
                    if (condition.indexOf("晴") >= 0) {
                      this.weather = "sunny";
                    } else if (condition.indexOf("雨") >= 0) {
                      this.weather = "rain";
                    } else if (condition.indexOf("多云") >= 0) {
                      this.weather = "cloudy";
                    } else if (condition.indexOf("阴") >= 0) {
                      this.weather = "moon";
                    }
                  } else { //天气描述中不存在“转”字
                    if (condition.indexOf("晴") >= 0) {
                      this.weather = "sunny";
                    } else if (condition.indexOf("雨") >= 0) {
                      this.weather = "rain";
                    } else if (condition.indexOf("多云") >= 0) {
                      this.weather = "cloudy";
                    } else if (condition.indexOf("阴") >= 0) {
                      this.weather = "moon";
                    }
                  }
                  
                  
              } else {
                  alert("请求数据失败！");
                  console.log("接口返回错误信息:" + Response.res_msg);
              }
            })
            .catch(error =>{
              console.log(error);     
            }) 
    },
    checkequipment(){
      this.ischeck = true;
      this.liischeck = "";
    },
    //设备列表点击
    lichangecheck(datas){
      this.liischeck = 'a'+datas.created_time;
      this.ischeck = false;
      this.device = datas.device_mac;
      //console.log(this.liischeck);
      this.getRealdata();
    },
    //底部天气列表切换
    temperaturecheck(){
      this.btlicheck = "temperature"
      this.types = "温度"
      this.typesvalue = this.temperature
      this.typesunit = "℃"
      this.typesseverity = "优"
      this.fontcolors = "#135be0"

    },
    humiditycheck(){
      this.btlicheck = "humidity"
      this.types = "湿度"
      this.typesvalue = this.humidity
      this.typesunit = "%RH"
      this.typesseverity = "优"
      this.fontcolors = "#135be0"
    },
    co2check(){
      this.btlicheck = "co2"
      this.types = "CO2"
      this.typesvalue = this.co2
      this.typesunit = "μg/m³"
      let co2 = this.typesvalue
						if (0 <= parseInt(co2) && parseInt(co2) <= 800) {
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
						} else if (800 < parseInt(co2) && parseInt(co2) <= 1500) {
              this.typesseverity = "良"
              this.fontcolors = "#FFDC35"
						} else if (1500 < parseInt(co2)) {
              this.typesseverity = "差"
              this.fontcolors = "red"
						}else{
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
            }
    },
    tvoccheck(){
      this.btlicheck = "tvoc"
      this.types = "TVOC"
      this.typesvalue = this.tvoc
      this.typesunit = "mg/m³"
      let tovc = this.typesvalue
						if (0 <= parseInt(tvoc) && parseInt(tvoc) <= 0.6) {
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
						} else if (0.6 < parseInt(tvoc) && parseInt(tvoc) <= 1.8) {							
              this.typesseverity = "良"
              this.fontcolors = "#FFDC35"
						} else if (1.8 < parseInt(tvoc)) {							
              this.typesseverity = "差"
              this.fontcolors = "red"
						}else{
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
            }
    },
    hchocheck(){
      this.btlicheck = "hcho"
      this.types = "HCHO"
      this.typesvalue = this.hcho
      this.typesunit = "mg/m³"
      let hcho = this.typesvalue
						if (0 <= parseInt(hcho) && parseInt(hcho) <= 0.1) {
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
						} else if (0.1 < parseInt(hcho) && parseInt(hcho) <= 0.3) {
							this.typesseverity = "良"
              this.fontcolors = "#FFDC35"
						} else if (0.3 < parseInt(hcho)) {
							this.typesseverity = "差"
              this.fontcolors = "red"
						}else{
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
            }
    },
    bpm10check(){
      this.btlicheck = "bpm10"
      this.types = "PM10"
      this.typesvalue = this.bpm10
      this.typesunit = "μg/m³"
      let pm10 = this.typesvalue
						if (0 <= parseInt(pm10) && parseInt(pm10) <= 35) {
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
						} else if (35 < parseInt(pm10) && parseInt(pm10) <= 75) {
              this.fontcolors = "#ffe698"
						} else if (75 < parseInt(pm10) && parseInt(pm10) <= 115) {
              this.fontcolors = "#ffc28b"
              this.typesseverity = "轻"
						} else if (115 < parseInt(pm10) && parseInt(pm10) <= 150) {
              this.fontcolors = "#ff8e8e"
              this.typesseverity = "中"
						} else if (150 < parseInt(pm10) && parseInt(pm10) <= 250) {
              this.fontcolors = "#ff8fe9"
              this.typesseverity = "重"
						} else if (250 < parseInt(pm10)) {
              this.fontcolors = "#c580ff"
              this.typesseverity = "严重"
						}else{
              this.typesseverity = "优"
              this.fontcolors = "#135be0"
            }
    }
  },
  created(){
      this.user_id=this.$Request.user_id;
      mainServices.getLogo(this.user_id)
      .then(Response => {
          if(Response.res_code === "E_0000"){
                 if (Response.hasguest == "1") {
                   this.isotherlogo = true;
                   this.logoimgsrc = Response.guest_info.imgs[0];
                   this.toptitle = Response.guest_info.title;
                   this.leftcode = Response.guest_info.qrcode;        
                   this.isotherdatalist = true;
                   document.title = Response.guest_info.title;
                  }else {
                    document.title = "华盛昌云空气监控系统";
                  }

                  mainServices.getText(this.user_id)
                  .then(Response => {
                      if(Response.res_code === "E_0000"){
                            this.rollingtext = Response.text;
                          } else {
                              console.log("接口返回错误信息:" + Response.res_msg);
                          }
                  })
                  .catch(error =>{
                      console.log(error);     
                  })
              } else {
                  alert("请求数据失败！");
                  console.log("接口返回错误信息:" + Response.res_msg);
              }
      })
      .catch(error =>{
          console.log(error);     
      })          
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../assets/css/index.css';
</style>

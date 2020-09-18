<template>
    <div class="wrapper">
        <!-- <div class="droplist">
            <span class="font-title-medium" style="margin:70px;">区域</span>
            <span class="font-title-medium" style="margin:110px;">时间粒度</span>
            <br>
            <el-select v-model="value1" placeholder="请选择">
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div> -->
        <el-card class="filter-container" shadow="never">
            <el-form :inline="true" :model="form" size="small" label-width="140px">
                <el-form-item label="区域">
                    <el-select v-model="form.region" placeholder="请选择区域" style="width: 60%;">
                        <el-option label="海淀区" value="海淀区"></el-option>
                        <el-option label="朝阳区" value="朝阳区"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 60%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="时间粒度">
                    <el-select v-model="form.time" placeholder="请选择区域" style="width: 60%;">
                        <el-option label="5分钟" value="5"></el-option>
                        <el-option label="10分钟" value="10"></el-option>
                        <el-option label="30分钟" value="30"></el-option>
                        <el-option label="60分钟" value="60"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="map" id="map">
        </div> 
        <div class="block">
            <el-slider 
                v-model="value3"
                :step="10"
                show-stops
                :show-tooltip="false"
                :marks="marks"
                @change="pickTime"
            >
            </el-slider>
        </div>
    </div>
    
</template>

<script>
    import * as L from "leaflet";
    import leafletheat from './leaflet-heat.js';
    import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
    import addressPoints_1 from '@/assets/data/heatmap/data0-5.js';
    import addressPoints_2 from '@/assets/data/heatmap/data6-10.js';
    import addressPoints_3 from '@/assets/data/heatmap/data11-15.js';
    import addressPoints_4 from '@/assets/data/heatmap/data16-20.js';
    import addressPoints_5 from '@/assets/data/heatmap/data21-25.js';
    import addressPoints_6 from '@/assets/data/heatmap/data26-30.js';
    import addressPoints_7 from '@/assets/data/heatmap/data31-35.js';
    import addressPoints_8 from '@/assets/data/heatmap/data36-40.js';
    import addressPoints_9 from '@/assets/data/heatmap/data41-45.js';
    import addressPoints_10 from '@/assets/data/heatmap/data46-50.js';
    import addressPoints_11 from '@/assets/data/heatmap/data51-55.js';

    export default {
        name: 'HeatMap',
        data () {
            return {
                // latlngs: addressPoints1,
                value1: '',
                value2: '',
                value3: [0,100],
                time: null,
                map: null,
                heatmapLayer: null,
                points: null,
                addressPoints: [],
                overlays: null,
                marks: {
                    0: '00:00',
                    10: '01:00',
                    20: '02:00',
                    30: '03:00',
                    40: '04:00',
                    50: '05:00',
                    60: '06:00',
                    70: '07:00',
                    80: '08:00',
                    90: '09:00',
                    100: '10:00',
                },
                form: {
                    region: '',
                    time: '',
                    date: ''
                }
            }
        },
        mounted () {
            var myurl1 = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                myurl2 = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaXRzZGF3biIsImEiOiJjazBrYTdjNDUwamxpM2Jud3Q1bThoNzZnIn0.mTZ_TJgsCGQLlUgAEZ2e2Q',
                myattr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

            var mapscale1 = L.tileLayer(myurl1, {attribution: myattr});
            var mapscale2 = L.tileLayer(myurl2, {id: 'mapbox.satellite',attribution: myattr});
            var mapscale3 = L.tileLayer(myurl2, {id: 'mapbox.dark',attribution: myattr});
            
            this.addressPoints.push(addressPoints_1);
            this.addressPoints.push(addressPoints_2);
            this.addressPoints.push(addressPoints_3);
            this.addressPoints.push(addressPoints_4);
            this.addressPoints.push(addressPoints_5);
            this.addressPoints.push(addressPoints_6);
            this.addressPoints.push(addressPoints_7);
            this.addressPoints.push(addressPoints_8);
            this.addressPoints.push(addressPoints_9);
            this.addressPoints.push(addressPoints_10);
            this.addressPoints.push(addressPoints_11);

            this.points = L.layerGroup();

            var baseLayers = {
                "Street": mapscale1,
                "Satellite":mapscale2,
                "Dark":mapscale3
            };
            var overlays = {
                "Points": this.points
            }

            this.map = L.map('map',{
                center: [39.916954,116.455589],
                zoom: 14,
                layers: [mapscale1,this.points]
            });
            L.control.layers(baseLayers,overlays).addTo(this.map);
        },
        methods: {
            pickTime: function(callback){
                this.time =  callback;
                console.log("in pickTime, time is:",this.time);
                let get_points = this.points;
                get_points.eachLayer(function (layer){
                    get_points.removeLayer(layer);
                });
                let get_time = this.time/10;
                console.log(this)
                L.heatLayer(this.addressPoints[get_time], {radius: 15}).addTo(this.points);
                console.log("points:", this.points)
                L.control.layers(this.overlays).addTo(this.map);
            },
            onSubmit() {
                console.log("sumbit!");
            }
        }
    }
</script>


<style scoped>
    .wrapper {
        position: relative;
        height:750px;
        width: 1000px;
        MARGIN-RIGHT: auto; 
        MARGIN-LEFT: auto;
    }
    .map {
        height: 80%;
        width: 100%;
    }
    .leaflet-control-layers-toggle:after{ 
        background-color: darkseagreen;
        color:#000 ;
    }
    .leaflet-control-layers-toggle{ 
        width:auto;
        background-color:whitesmoke;
        background-position:3px 50% ;
        padding:3px;
        padding-left:36px;
        text-decoration:none;
        line-height:36px;
    }
    .leaflet-touch .leaflet-control-layers-toggle {
        background-color:whitesmoke;
    }
    .leaflet-control-layers-expanded {
        color: darkseagreen;
        background-color:whitesmoke;
    }
</style>

<template>
    <div class="wrapper">
        <div class="map" id="map">
        </div>
        <div class="block">
            <el-slider
                v-model="value1"
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
    import test from '@/assets/data/realtime/data2.geojson';
    import colordata from '@/assets/data/realtime/data2.geojson'
    // import test from '@/assets/data/real_time/data.geojson';
    // import data from '@/assets/data/real_time/car_data.json';
    export default {
        name: 'realTime',
        data () {
            return {
            // latlngs: addressPoints1,
                value1: [0,100],
                map: null,
                time: null,
                points: null,
                json_data: [],
                color: [],
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
            L.control.layers(baseLayers).addTo(this.map);

            this.json_data.push(test);
            
            L.geoJSON(this.json_data).addTo(this.map);
        },
        methods: {
        //     pickTime: function(callback){
        //         this.time = callback;
        //         let get_points = this.points;
        //         get_points.eachLayer(function (layer){
        //             get_points.removeLayer(layer);
        //         });
        //         let get_time = this.time*36;
        //         console.log("in pickTime, time is:",get_time);
        //         L.geoJSON(this.test).addTo(this.map);
        // }
//to be continued, the base color is added to the map, 
//then we should change the color using data which comes from our database
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

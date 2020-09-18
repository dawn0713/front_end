<template>
    <div>
        <l-map 
            style="width: 100%; height: calc(100vh - 50px);" 
            :zoom="zoom" :center="center" 
            :options="{zoomControl: false}"
        >
            <l-control-layers position="topright"></l-control-layers>
            <l-control-scale position="bottomleft"></l-control-scale>
            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="attribution"
                :id="tileProvider.id"
                layer-type="base"
            ></l-tile-layer>
            <l-control-zoom position="bottomright"></l-control-zoom>
            <!-- <l-control position="topleft">
                <el-card 
                    class="box-card"
                    shadow="hover"
                >
                    <div class="text">
                        Center: {{ center }}
                        <br>
                        Bounds: {{ bounds }}
                    </div>
                </el-card>
            </l-control> --> 
        </l-map>
    </div>
</template>

<script>
    import { LMap, LTileLayer, LControlZoom, LControl, LControlScale, LControlLayers } from 'vue2-leaflet';
    export default {
        name: 'GetMap',
        components: {
            LMap,
            LTileLayer,
            LControlZoom,
            LControl, 
            LControlScale,
            LControlLayers
        },
        data () {
            return {
                zoom: 14,
                center: [39.916954,116.455589],
                tileProviders: [
                    {
                        name: 'Street',
                        visible: true,
                        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    },
                    {
                        name: 'Satellite',
                        visible: false,
                        url:'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXRzZGF3biIsImEiOiJjazBrYTdjNDUwamxpM2Jud3Q1bThoNzZnIn0.mTZ_TJgsCGQLlUgAEZ2e2Q',
                        // url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaXRzZGF3biIsImEiOiJjazBrYTdjNDUwamxpM2Jud3Q1bThoNzZnIn0.mTZ_TJgsCGQLlUgAEZ2e2Q',
                    },
                    {
                        name: 'Dark',
                        visible: false,
                        url:'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXRzZGF3biIsImEiOiJjazBrYTdjNDUwamxpM2Jud3Q1bThoNzZnIn0.mTZ_TJgsCGQLlUgAEZ2e2Q',
                        // url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaXRzZGF3biIsImEiOiJjazBrYTdjNDUwamxpM2Jud3Q1bThoNzZnIn0.mTZ_TJgsCGQLlUgAEZ2e2Q',
                    }
                ],
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                bounds: null
            }
        },
        methods: {
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            boundsUpdated (bounds) {
                this.bounds = bounds;
            }
        }
    }
</script>


<style scoped>
    .text {
        font-size: 14px;
    }
    .box-card {
        width: 300px;
        /* position: absolute;
        left: 100px;
        top: 200px;
        z-index: 100; */
    }
</style>

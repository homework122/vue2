<template>
<div>
    <h3>深圳南山区仓</h3>
    <p>
    当前仓库经度：{{ this.circlePath.center.lng }}当前仓库纬度{{
        this.circlePath.center.lat
    }}
    </p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="半径">
        <el-input v-model="formInline.radius" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item><span>单位为公里，默认半径62.5公里</span></el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
    </el-form>
    <baidu-map
    @on-cancel="cancel"
    v-model="showMapComponent"
    width="800"
    :closable="false"
    :mask-closable="false"
    >
    <baidu-map
        v-bind:style="mapStyle"
        class="bm-view"
        ak="4GzfdmqBbAI805r09m5m931txne42I6X"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @click="getClickInfo"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom"
    >
        <bm-circle
        :center="circlePath.center"
        :radius="this.circlePath.radius"
        stroke-color="blue"
        fillColor="blue"
        :fillOpacity="0.1"
        :stroke-opacity="0.8"
        :stroke-weight="2"
        @lineupdate="updateCirclePath"
        :editing="true"
        >
        </bm-circle>
        <bm-view style="width: 100%; height:500px;"></bm-view>
        <bm-marker
        :position="{ lng: circlePath.center.lng, lat: circlePath.center.lat }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        >
        </bm-marker>
        <bm-control :offset="{ width: '1px', height: '1px' }" :zoom="11">
        <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
            <input
            type="text"
            placeholder="请输入搜索地名"
            class="serachinput"
            />
        </bm-auto-complete>
        </bm-control>

        <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        style="width:0px;height:0px;overflow: hidden;"
        ></bm-local-search>
    </baidu-map>
    <!-- 
            <div slot="footer" style="margin-top: 0px;"> -->
    <!-- <Button @click="cancel" type="ghost"-->
    <!--style="width: 60px;height: 36px;">取消-->
    <!--</Button>-->
    <!--<Button type="primary" style="width: 60px;height: 36px;" @click="confirm">确定</Button> -->
    <!-- </div> -->
    </baidu-map>
</div>
</template>
<script>
import {
BaiduMap,
BmControl,
BmView,
BmAutoComplete,
BmLocalSearch,
BmMarker
} from "vue-baidu-map";
export default {
components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
},
data: function() {
    return {
    op: 0.5,
    showMapComponent: this.value,
    keyword: "",
    radius: "",
    mapStyle: {
        width: "100%",
        height: this.mapHeight + "px"
    },
    center: { lng: 113.92, lat: 22.52 },
    zoom: 10,
    circlePath: {
        center: {
        lng: 116.404,
        lat: 39.915
        },
        radius: 62500
    },

    formInline: {
        radius: "",
        region: ""
    }
    };
},
watch: {
    value: function(currentValue) {
    this.showMapComponent = currentValue;
    if (currentValue) {
        this.keyword = "";
    }
    }
},
props: {
    value: Boolean,
    mapHeight: {
    type: Number,
    default: 500
    }
},
mounted() {
    this.getMap();
},
methods: {
    getMap() {
    this.$axios
        .post(
        "/api/sys/showEFence.do",
        {
            area_no: 1
        },
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
        )
        .then(res => {
        console.log(res);
        console.log(res.data.msg);
        this.circlePath.center.lat = res.data.data[0].efence_row;
        this.circlePath.center.lng = res.data.data[0].efence_lon;
        this.circlePath.radius = res.data.data[0].efence_radius * 1000;
        console.log(res.data.data[0].efence_radius);
        console.log(this.circlePath);
        console.log(this.circlePath.center.lng);
        console.log(this.circlePath.radius);
        this.$set(this.circlePath.radius);
        });
    },
    updateCirclePath(e) {
    this.circlePath.center = e.target.getCenter();
    this.circlePath.radius = e.target.getRadius();
    },
    onSubmit() {
    console.log("submit!");
    this.circlePath.radius = Number(this.formInline.radius) * 1000;
    console.log(this.center.radius);
    this.formInline.radius = "";
    this.zoom = 10;
    // this.$set(this.center.radius,this.formInline.radius)
    },

    /***
        * 地图点击事件。
        */

    getClickInfo(e) {
    this.center.lng = e.point.lng;
    this.center.lat = e.point.lat;
    console.log(this.center.lng);
    console.log(this.center.lat);
    console.log(this.op);
    },
    syncCenterAndZoom(e) {
    const { lng, lat } = e.target.getCenter();
    this.center.lng = lng;
    this.center.lat = lat;
    this.zoom = e.target.getZoom();
    },
    /***
        * 确认
        */
    confirm: function() {
    this.showMapComponent = false;
    this.$emit("map-confirm", this.center);
    },
    /***
        * 取消
        */
    cancel: function() {
    this.showMapComponent = false;
    this.$emit("cancel", this.showMapComponent);
    }
}
};
</script>

<style scoped>
* {
margin-top: 0;
margin-left: 5px;
}

.el-form-item span {
color: #666;
font-size: 12px;
}
.serachinput {
width: 300px;
box-sizing: border-box;
padding: 9px;
border: 1px solid #dddee1;
line-height: 20px;
font-size: 16px;
height: 38px;
color: #333;
position: relative;
border-radius: 4px;
-webkit-box-shadow: #666 0px 0px 10px;
-moz-box-shadow: #666 0px 0px 10px;
box-shadow: #666 0px 0px 10px;
}
</style>

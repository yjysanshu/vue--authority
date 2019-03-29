<template>
    <div :style="{height:height,width:width}" ref="myEchart">
    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        chartConfig:{
            type: Object,
            default: ()=>({
                title: null,
                color: null,
                tooltip: null,
                legend: null,
                toolbox: null,
                xaxis: null,
                dataZoom: null,
                series:null
            }),
        }

    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
        //this.initChart();
    },
    beforeDestroy() {
        this.destroyChart();
    },
    watch: {
        chartConfig() {
            this.destroyChart();
            this.initChart();
        },
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            console.log(this.chartConfig)
            this.chart.setOption({
                title: this.chartConfig.title,
                color: this.chartConfig.color,
                tooltip: this.chartConfig.tooltip,
                legend: this.chartConfig.legend,
                toolbox: this.chartConfig.toolbox,
                calculable: true,
                xAxis: this.chartConfig.xaxis,
                yAxis: [{
                    type: 'value'
                }],
                dataZoom: this.chartConfig.dataZoom,
                series: this.chartConfig.series
            })
        },
        destroyChart() {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
        },
    }
}
</script>

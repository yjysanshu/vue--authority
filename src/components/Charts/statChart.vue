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
                backgroundColor: '#6a7985',
                legendData: null,
                xAxisData: null,
                seriesData: null,
                yAxisData:null,
                axisPointer:null
            }),
        }

    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
        this.initChart();
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
            this.chart.setOption({
                title: {
                    text: this.chartConfig.title
                },
                tooltip:{
                    trigger: 'axis',
                    axisPointer: this.chartConfig.axisPointer ? this.chartConfig.axisPointer : {type:'cross'} ,
                } ,
                legend: {
                    data: this.chartConfig.legendData,
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.chartConfig.xAxisData,
                    }
                ],
                //y轴的处理 ，对应多y轴 或者无y轴的情况
                yAxis: this.chartConfig.yAxisData && this.chartConfig.yAxisData.length != 0 ? this.chartConfig.yAxisData : [
                    {
                        type:'value'
                    }
                ],
                series: this.chartConfig.seriesData,
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

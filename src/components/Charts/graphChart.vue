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
        chartConfig: {
            type: Object,
            default: () => ({
                title: null,
                links: null,
                data: null,
                formatter: null,
                labelFormatter: null,
                nodeLabelFormatter: null,
                calcPercet: null
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
            // 把配置和数据放这里
            this.chart.setOption({
                title: {
                    text: this.chartConfig.title,
                },
                tooltip: {
                    //悬浮提示
                    formatter: this.chartConfig.formatter,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            normal: this.chartConfig.nodeLabelFormatter,
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        data: this.chartConfig.data,
                        links: this.chartConfig.links,
                        lineStyle: {
                            normal: {
                                opacity: 0.9,
                                width: 2,
                                curveness: 0
                            }
                        }
                    }
                ]
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

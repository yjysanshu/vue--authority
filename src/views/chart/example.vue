<template>
  <div class="components-container">
    <div id="text" style="width:100%">
        <el-date-picker v-model="datepicker" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholde="开始日期" end-placeholde="结束日期" aria-placeholder="-"></el-date-picker>
        <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
        <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
        <div style="width:100%;height:20px;"></div>

        <stat-chart width="95%" height="600px" :chartConfig="chartConfig"></stat-chart>
        <!-- <div id="echarts" style="width:95%;height:600px;" class="charts" ref="myEchart"></div> -->
    </div>
  </div>
</template>
<script>
import statChart from '../../components/Charts/statChart'
import { formatTime, getDayAgo } from '../../utils'

export default {
    components: {
      statChart
    },
    data() {
        return {
            tableQuery: {
                start: null, 
                end: null
            },
            datepicker: [],
            chartConfig: null,
        };
    },
    mounted() {
        this.getChartConfig()
    },
    methods: {
        getChartConfig() {
          if (this.datepicker.length <= 0) {
            this.datepicker = [getDayAgo(7), formatTime(new Date(), 'yyyy-MM-dd')]
          }
          this.tableQuery.start = this.datepicker[0]
          this.tableQuery.end = this.datepicker[1]
          this.$api.module.chart.example({
              data: this.tableQuery
          }).then(response => {
              this.chartConfig = response.data.data
          }).catch(error => {
              console.log(error);
          });
        },
        handleFilter() {
          this.getChartConfig()
        },
        handleReset() {
          this.getChartConfig()
        }
    }
}
</script>

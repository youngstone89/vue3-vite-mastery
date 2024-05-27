<template>
    <div ref="chartContainer" id="highcharts-vue-chart"></div>
</template>

<script setup lang="ts">
import Highcharts from 'highcharts';
import { onMounted, ref } from 'vue';

const chartContainer = ref(null);

onMounted(() => {
    if (chartContainer.value) {
        Highcharts.chart(chartContainer.value, {
            chart: {
                type: 'column',
                plotBackgroundColor: '#FFFFFF' // Initial background color

            },
            title: {
                text: 'Sample Stacked Vertical Bar Chart'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Temperature (°C)'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    },
                    point: {
                        events: {
                            mouseOver: function () {
                                let point = this,
                                    chart = point.series.chart,
                                    padding = 20, // Space around the column
                                    rectX = point.plotX + point.series.xAxis.left - padding,
                                    rectY = point.plotY + point.series.yAxis.top - padding,
                                    rectWidth = point.pointWidth + padding,
                                    rectHeight = (point.series.yAxis.height - point.plotY) + padding;

                                // Add a rectangle shape around the column
                                chart.highlightRect = chart.renderer.rect(rectX, rectY, rectWidth, rectHeight)
                                    .attr({
                                        fill: 'rgba(128, 128, 128, 0.3)', // Semi-transparent gray
                                        zIndex: 1
                                    })
                                    .add();
                            },
                            mouseOut: function () {
                                let chart = this.series.chart;
                                // Remove the rectangle when mouse out
                                if (chart.highlightRect) {
                                    chart.highlightRect.destroy();
                                    chart.highlightRect = null;
                                }
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    }
});
</script>

<style scoped>
#highcharts-vue-chart {
    border: 2px solid red;
    padding: 10px;
    background-color: #f9f9f9a2;
    /* Example: Adding a background color */
    margin: 20px;
    /* Example: Adding margin */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Example: Adding shadow for better visibility */
}
</style>
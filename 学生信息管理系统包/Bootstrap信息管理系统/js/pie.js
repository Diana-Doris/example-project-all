/*
 * @Author: your name
 * @Date: 2020-12-06 21:50:59
 * @LastEditTime: 2020-12-16 23:19:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \循环迭代项目HTML5 + Css3\js\pie.js
 */
(function(){
    let pie = {
        init(){//初始化
            this.getData();
            this.option = {
                title:{
                    text: '',
                    subtext: '纯属虚构',
                    left: 'center',
                },
                legend: {
                    data: [],
                    orient: 'vertical',
                    left: 'left'
                },
                series: {
                    name: '',
                    type: 'pie',
                    data: [],
                    radius: '55%',
                    center: ['50%', '60%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,.5)'
                        }
                    }
                }
            }
            
        },
        async getData(){//请求数据
            let data = await fetch('http://open.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764')
            let respon_data = await data.json()
            // console.log(data)
            this.areaChart(respon_data.data);
            this.sexChart(respon_data.data)
        },
        areaChart(data){
            // console.log(data);
            let myChart = echarts.init($('.areaChart')[0]);
            let lengenData = [];
            let seriesData = [];
            let newData = {};
            data.forEach(function (item) {
                if (!newData[item.address]) {
                    newData[item.address] = 1;
                    lengenData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            for (var prop in newData) {
                seriesData.push({
                    value: newData[prop],
                    name: prop
                });
            }

            this.option.title.text = '渡一性别统计';
            this.option.legend.data = lengenData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;
            
            myChart.setOption(this.option)

        },
        sexChart(data){
            // console.log(data);
            let myChart = echarts.init($('.sexChart')[0]);
            let lengenData = ['male','female'];
            let newData = {}
            data.forEach(ele => {
                if(!newData[ele.sex]){
                    newData[ele.sex] = 1
                }else{
                    newData[ele.sex]++
                }
            });
            var seriesData = [
                {name: 'male', value: newData[1]},
                {name: 'female', value: newData[0]}
            ];

            this.option.title.text = '渡一性别统计';
            this.option.legend.data = lengenData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;
            
            myChart.setOption(this.option)
        }
    }
    pie.init()
})()

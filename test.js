var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost/data",
  "method": "GET"
}

$.ajax(settings).done(function (response) {
  option = {
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      //给定数据
      data: response.data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  //获取你要初始化的div
  var pie = document.getElementById("pie");
  //初始化div
  var ech = echarts.init(pie);
  //添加选项
  ech.setOption(option);
});

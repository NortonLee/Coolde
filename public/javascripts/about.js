$(function () {
    var chartInit = false;
    var mySwiper = new Swiper('.swiper-container', {
        parallax: true,
        direction: 'vertical',
        effect: 'coverflow',
        mousewheelControl: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows: true
        },
        watchSlidesProgress: true,
        onSlideChangeEnd: function (swiper) {
            if (swiper.activeIndex == 4 && !chartInit) {//工作技能
                loadKnowlegeChart();
            }
        }
    });

    var subSwiper = new Swiper('.sub-swiper-container', {
        effect: 'flip',
        loop: true,
        slidesPerView: 2,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        flip: {
            slideShadows: true,
            limitRotation: true,
        },
        onInit: function (swiper) {
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd:function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })

    function loadKnowlegeChart() {
        var myChart = echarts.init(document.getElementById('konwlege-echart'));
        myChart.showLoading();
        $.get('/api/getKnowlegeChart', function (xml) {
            setTimeout(myChart.hideLoading(), 30000);
            chartInit = true;

            var graph = echarts.dataTool.gexf.parse(xml);
            var categories = [{ name: '前端' }, { name: '后端' }, { name: '数据库' }, { name: '代码管理' }, { name: 'IDE' }];
            graph.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.symbolSize = 10;
                node.value = node.symbolSize;
                node.category = node.attributes.modularity_class;
                // Use random x, y
                node.x = node.y = null;
                node.draggable = true;
            });
            option = {
                backgroundColor: '#eee',
                title: {
                    text: 'Knowlege Chart',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {},
                legend: [{
                    // selectedMode: 'single',
                    data: categories.map(function (a) {
                        return a.name;
                    })
                }],
                animation: false,
                series: [
                    {
                        name: 'Knowlege Chart',
                        type: 'graph',
                        layout: 'force',
                        data: graph.nodes,
                        links: graph.links,
                        categories: categories,
                        roam: true,
                        label: {
                            normal: {
                                position: 'right'
                            }
                        },
                        force: {
                            repulsion: 100
                        }
                    }
                ]
            };

            myChart.setOption(option);
        }, 'xml')
    }

})
$(document).ready(function() {


    AllTaskChartsAjaxCall()

    DoneTaskChartsAjaxCall()

    GetPresentageAjax()

    DoneTaskCardsAjax()

    AllTaskCardsAjax()
    //Ajax//
    function DoneTaskChartsAjaxCall() {
        $.ajax({
            type: 'GET',
            url: "/api/DashBoardApi/ChartData",
            data: { Type: 'Done' }
        }).done(function (result) {

            


            PieChartCreator('chart-container2', result)

        })
    }


    function DoneTaskCardsAjax() {
        $.ajax({
            type: 'GET',
            url: "/api/DashBoardApi/TasksCount",
            data: { Checked: 'true' }
        }).done(function (result) {

            

            jQuery('<h3>', {
                id: 'DoneTask',
                
            }).appendTo('.DoneTask');

            $("#DoneTask").append(
                result
            )
           

        })
    }


    function AllTaskCardsAjax() {
        $.ajax({
            type: 'GET',
            url: "/api/DashBoardApi/TasksCount",
            data: { Checked: 'false' }
        }).done(function (result) {

            console.log(result)

            jQuery('<h3>', {
                id: 'AllTask',

            }).appendTo('.AllTask');

            $("#AllTask").append(
                result
            )


        })
    }

    function GetPresentageAjax() {
        $.ajax({
            type: 'GET',
            url: "/api/DashBoardApi/CheckedTaskPresentage",
        }).done(function (result) {

 
            jQuery('<div>', {
                id: 'TaskDiv',
                Class:'progress'
            }).appendTo('#ProgDiv');

            $("#TaskDiv").append(
                `<div class="progress-bar" role = "progressbar" style = "width: ${result}%;" aria - valuenow="${result}" aria - valuemin="0" aria - valuemax="100" > ${result} %</div>`
            )

        })
    }


    function AllTaskChartsAjaxCall()
    {
        $.ajax({
            type: 'GET',
            url: "/api/DashBoardApi/ChartData",
            data: { Type: 'All' }
        }).done(function (result) {

            PieChartCreator('chart-container',result)

        })
    }



    //PieChart//
    function PieChartCreator(ChartId,result)
    {

        var dom = document.getElementById(ChartId);
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};

        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 30,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: result

                }
            ]
        };

        if(option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

    }


})
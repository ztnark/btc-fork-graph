$.ajax({
    url: '/entries',
    method: 'GET',
    success: function(response){
        var bchRatios = [];
        var btcRatios = [];
        var dates = [];
        _.each(response["BCH"],function(bch,index){
            bchRatios.push((bch["profit_index"] / response["BTC"][index]["profit_index"])*100);
            var time = moment(bch["created_at"]);
            dates.push(time.format('LT'));
        });
        _.each(response["BTC"],function(btc,index){
            btcRatios.push((btc["profit_index"] / response["BCH"][index]["profit_index"])*100);
        });
        var dataSets = [{data: bchRatios, backgroundColor:'rgb(255, 99, 132)', borderColor:'rgb(255, 99, 132)',fill: false, label: "BCH/BTC"}, {data: btcRatios, borderColor:'rgb(54, 162, 235)', backgroundColor:'rgb(54, 162, 235)', fill: false, label: "BTC/BCH"}];
        drawChart(dataSets,dates);
    }
})

var drawChart = function(dataSets, labels){
var ctx = document.getElementById("myChart").getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data:{labels: labels, datasets: dataSets},
    options: {
            responsive: true,
            scales: {
                 xAxes: [{
                        display: true,
                        scaleLabel: {
                                display: true,
                                labelString: 'Time'
                        }
                }],
                yAxes: [{
                        display: true,
                        scaleLabel: {
                                display: true,
                                labelString: 'Miner Profitability %'
                        },
                        ticks: {
                                min: 0,
                                steps: 10,
                                stepValue: 5,
                                max: 200
                        }
                }]
            }
    }
});
}

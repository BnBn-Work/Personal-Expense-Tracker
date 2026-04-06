const backButton = document.getElementById("back");
const testPlot = document.getElementById('tester');

backButton.addEventListener("click",e=>{
    window.location.href = "homepage.html";


})


Plotly.newPlot( testPlot, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], {
    margin: { t: 0 } } );
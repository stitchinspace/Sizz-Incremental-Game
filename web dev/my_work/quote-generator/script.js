"use strict";
document.addEventListener("DOMContentLoaded", function() { //loads page after html loads

    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth * .95;
    canvas.height = window.innerHeight * .95;
    canvas.id = "canvas";
    document.querySelector("body").appendChild(canvas);

    var context = document.getElementById('canvas').getContext('2d');
    context.fillStyle = '#' + Math.floor(Math.random() * (Math.pow(256, 3))).toString(16);
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    function CircleConstructor() {
        this.radius = Math.floor(Math.random(100) * (canvas.width / 3));
        this.xpos = Math.random(100) * canvas.width;
        this.ypos = Math.random(100) * canvas.height;
        this.color = '#' + Math.floor(Math.random() * (Math.pow(256, 3))).toString(16);
    }
    var elements = [];

    function drawCircles() {
        for (var i = 0; i <= 10; i++) {
            elements[i] = new CircleConstructor();
            context.beginPath();
            context.arc(elements[i].xpos, elements[i].ypos, elements[i].radius, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.fillStyle = elements[i].color;
            context.fill();
        }

    }
    document.querySelector("body").addEventListener("click", recolor);

    function recolor(event) {
        for (var j = 0; j <= elements.length - 1; j++) {
            var clientx = event.clientX;
            var clienty = event.clientY;
            var x = elements[j].xpos;
            var y = elements[j].ypos;
            var rad = elements[j].radius;
            if (Math.sqrt(Math.pow((x - clientx), 2) + Math.pow((y - clienty), 2)) < rad) {
                elements[j].color = '#' + Math.floor(Math.random() * (Math.pow(256, 3))).toString(16);
                context.beginPath();
                context.arc(elements[j].xpos, elements[j].ypos, elements[j].radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fillStyle = elements[j].color;
                context.fill();
                xhr();
            }
        }
    }

    function xhr() {
        console.log("xhr called");
        if (window.XMLHttpRequest) var xhr = new XMLHttpRequest();
        //console.log(xhr);
        makeRequest(xhr);
    }

    function makeRequest(xhr) {
        //console.log("request made");
        if (xhr) {
            console.log("processing xhr");
            // var url = "http://api.forismatic.com/api/1.0/";
            // var url = "http://quotesondesign.com/wp-json/posts?";
            // var url = "http://quotes.stormconsultancy.co.uk/random.json";
            //var url = "http://quotes.stormconsultancy.co.uk/quotes/1.json?callback=processResponse";
            var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
try {
                console.log("in try");
                xhr.onreadyStateChange = processResponse;
                xhr.open('GET', url);
                xhr.send(null);
            } catch (e) {
                console.log("data unavailable");
            }
        }

        function processResponse() {
            console.log("processResponse called");
            console.log(xhr.readyState, xhr.status);
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 400) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
            }
        }
    }

    drawCircles();
});

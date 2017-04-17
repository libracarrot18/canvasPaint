$(document).ready(chalkboard);

function chalkboard(){
    $('#chalkboard').remove();
    $('.chalk').remove();
    $('body').prepend('<img src="img/bg.png" id="pattern" width=50 height=50>');
    $('body').prepend('<canvas id="chalkboard"></canvas>');
    $('body').prepend('<div class="chalk"></div>');
    $('body').prepend('<p class="clearBtn">清空</p>');

    var canvas = document.getElementById("chalkboard");
    $('#chalkboard').css('width',$(window).width());
    $('#chalkboard').css('height',$(window).height());
    canvas.width = $(window).width();
    canvas.height = $(window).height();

    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
    var mouseX = 0;
    var mouseY = 0;
    var mouseD = false;
    var eraser = false;
    var xLast = 0;
    var yLast = 0;
    var brushDiameter = 7;
    var color = 'red';

    $('#chalkboard').css('cursor','none');
    document.onselectstart = function(){ return false; };
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushDiameter;
    ctx.lineCap = 'round';

    var patImg = document.getElementById('pattern');

    document.addEventListener('touchmove', function(evt) {
        var touch = evt.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        if (mouseY < height && mouseX < width) {
            evt.preventDefault();
            $('.chalk').css('left', mouseX + 'px');
            $('.chalk').css('top', mouseY + 'px');
            //$('.chalk').css('display', 'none');
            if (mouseD) {
                draw(mouseX, mouseY);
            }
        }
    }, false);
    document.addEventListener('touchstart', function(evt) {
        //evt.preventDefault();
        var touch = evt.touches[0];
        mouseD = true;
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        xLast = mouseX;
        yLast = mouseY;
        draw(mouseX + 1, mouseY + 1);
    }, false);
    document.addEventListener('touchend', function(evt) {
        mouseD = false;
    }, false);
    $('#chalkboard').css('cursor','none');
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushDiameter;
    ctx.lineCap = 'round';

    $(document).mousemove(function(evt){
        mouseX = evt.pageX;
        mouseY = evt.pageY;
        if(mouseY<height && mouseX<width){
            $('.chalk').css('left',(mouseX-0.5*brushDiameter)+'px');
            $('.chalk').css('top',(mouseY-0.5*brushDiameter)+'px');
            if(mouseD){
                if(eraser){
                    // erase(mouseX,mouseY);
                }else{
                    draw(mouseX,mouseY);
                }
            }
        }else{
            $('.chalk').css('top',height-10);
        }
    });
    $(document).mousedown(function(evt){
        mouseD = true;
        xLast = mouseX;
        yLast = mouseY;
        if(evt.button == 2){
            // erase(mouseX,mouseY);
            // eraser = true;
            // $('.chalk').addClass('eraser');
        }else{
            // if(!$('.panel').is(':hover')){
            //     draw(mouseX+1,mouseY+1);
            // }
        }
    });

    $(document).mouseup(function(evt){
        mouseD = false;
    });


    document.oncontextmenu = function() {return false;};

    function draw(x,y){
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(xLast, yLast);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Chalk Effect
        var length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
        var xUnit = (x-xLast)/length;
        var yUnit = (y-yLast)/length;
        for(var i=0; i<length; i++ ){
            var xCurrent = xLast+(i*xUnit);
            var yCurrent = yLast+(i*yUnit);
            var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;
            var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
            ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
        }

        xLast = x;
        yLast = y;
    }
        $('.clearBtn').click(function () {
            erase();
        })
    function erase(){
        ctx.clearRect (0,0,width,height);
    }



    $(window).resize(function(){
        chalkboard();
    });

} /**
 * Created by pc on 2017/4/17.
 */

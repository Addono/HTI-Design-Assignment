var env, health; // Contains the environment, health, header and footer object.
            
var wBrothersMin = 200; // The width of a brother when minimized in pixels.
var hHeader = 70;
var hBrother = 100;
var hFooter = 120;

var moveDuration = 300; // The duration of the movement of the animation in miliseconds.
var fadeDuration = 300; // The duration of each fade in miliseconds.

var focus = null;

function brotherResize(brother, type, delay) {
    var width;
    
    // Get the new width based on the delay.
    switch(type) {
        case 'content':
            width = document.documentElement.clientWidth - wBrothersMin;
            height = screen.innerHeight - hHeader - hFooter;
            break;
        case 'vertical':
            width = wBrothersMin;
            height = screen.innerHeight - hHeader - hFooter;
            break;
        case 'equal':
            width = Math.floor(document.documentElement.clientWidth / 2.0);
            console.log($(brother).parent().width());
            height = screen.innerHeight - hHeader - hFooter;
            break;
        case 'horizontal':
            width = Math.floor(document.documentElement.clientWidth / 2.0);
            height = hBrother;
            break;
    }
    
    brother.delay(delay).animate(
            {width: width, height: height},
            {duration: moveDuration, queue: false}
    );
}

function initial() {
    // Only transition when the default view is not the focus.
    if(focus !== "initial") {
        if(focus === footer) {
            closeFooter();
        }
        
        focus = "initial";

        env.add(health).children().
                fadeOut(fadeDuration);

        brotherResize(env, 'equal', fadeDuration);
        brotherResize(health, 'equal', fadeDuration);

        env.find(".menu").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
        health.find(".menu").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
    }
}

function showBrother(newFocus, prevFocus) {
    // Only transition when focus changes.
    if(focus !== newFocus) {
        if(focus === footer) {
            closeFooter();
        }
        
        focus = newFocus;
        
        newFocus.add(prevFocus).children()
                .fadeOut(fadeDuration);

        brotherResize(newFocus, 'content', fadeDuration);
        brotherResize(prevFocus, 'vertical', fadeDuration);

        newFocus.find(".content").add(prevFocus.find(".vertical")) // Select both divs which should be shown.
                .delay(moveDuration + fadeDuration)
                .fadeIn(fadeDuration);
    }
}

function showHealth() {
    showBrother(health, env);
}

function showEnv() {
    showBrother(env, health);
}

function showFooter() {
    initial();
    
    
}

$(document).ready(function(){
    env = $("#environment");
    health = $("#health");
    settings = $("#settings");
    
    $("header").css("height", hHeader);
    
    initial();
    
    startTime();
});


function startTime() {
    var today = new Date();
    var y = today.getFullYear();
    var M = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('dateTime').innerHTML = 
            M + "/" + d + "/" + y + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
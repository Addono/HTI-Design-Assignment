var env, health, header, footer; // Contains the environment, health, header and footer object.
            
var wBrothersMin = 200; // The width of a brother when minimized in pixels.
var hHeader = 100;
var hBrother = 100;
var hFooter = 20;

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
            {duration: moveDuration, queue: true}
    );
}

function initial() {
    // Only transition when the default view is not the focus.
    if(focus !== "initial") {
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
    header = $("#header");
    footer = $("#footer");
    settings = $("#settings");
    
    $("header").css("height", hHeader);
    
    initial();
});
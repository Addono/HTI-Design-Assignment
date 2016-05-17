var env, health, header, footer; // Contains the environment and health object.
            
var wBrothersMin = 200; // The width of a brother when minimized in pixels.
var moveDuration = 300; // The moveDuration of the animation in miliseconds.
var fadeDuration = 300;

var focus = null;

function brotherResize(brother, type, delay) {
    var width;
    
    // Get the new width based on the delay.
    switch(type) {
        case 'content':
            width = brother.parent().width() - wBrothersMin;
            break;
        case 'vertical':
            width = wBrothersMin;
            break;
        case 'equal':
        case 'horizontal':
            width = brother.parent().width() / 2;
            break;
    }
    
    brother.delay(delay).animate(
            {width: width},
            {duration: moveDuration, queue: true}
    );
}

function showBrother(newFocus, prevFocus) {
    // Only transition when focus changes.
    if(focus !== newFocus) {
        focus = newFocus;

        newFocus.children().fadeOut(fadeDuration);
        prevFocus.children().fadeOut(fadeDuration);

        brotherResize(newFocus, 'content', fadeDuration);
        brotherResize(prevFocus, 'vertical', fadeDuration);

        newFocus.find(".content").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
        prevFocus.find(".vertical").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
    }
}

function initial() {
    // Only transition when the default view is not the focus.
    if(focus !== "initial") {
        focus = "initial";

        env.children().fadeOut(fadeDuration);
        health.children().fadeOut(fadeDuration);

        brotherResize(env, 'equal', fadeDuration);
        brotherResize(health, 'equal', fadeDuration);

        env.find(".menu").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
        health.find(".menu").delay(moveDuration + fadeDuration).fadeIn(fadeDuration);
    }
}

function showHealth() {
    showBrother(health, env);
}

function showEnv() {
    showBrother(env, health);
}

$(document).ready(function(){
    env = $("#environment");
    health = $("#health");
    header = $("header");
    footer = $("footer");
    
    initial();
});
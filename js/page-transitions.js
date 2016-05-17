var env, health, header, footer; // Contains the environment, health, header and footer object.
            
var wBrothersMin = 200; // The width of a brother when minimized in pixels.
var hHeader = 200;
var hBrother = 100;
var hFooter = 100;

var moveDuration = 300; // The duration of the movement of the animation in miliseconds.
var fadeDuration = 300; // The duration of each fade in miliseconds.

var focus = null;

function brotherResize(brother, type, delay) {
    var width;
    
    // Get the new width based on the delay.
    switch(type) {
        case 'content':
            width = brother.parent().width() - wBrothersMin;
            height = window.innerHeight - hHeader - hFooter;
            break;
        case 'vertical':
            width = wBrothersMin;
            height = window.innerHeight - hHeader - hFooter;
            break;
        case 'equal':
            width = Math.floor(brother.parent().width() / 2.0);
            height = window.innerHeight - hHeader - hFooter;
            break;
        case 'horizontal':
            width = Math.floor(brother.parent().width() / 2.0);
            height = hBrother;
            break;
    }
    
    brother.delay(delay).animate(
            {width: width, height: height},
            {duration: moveDuration, queue: false}
    );
}

function footerResize(type, delay) {
    var height;
    
    switch(type) {
        case 'content':
            height = screen.height - hHeader - hBrother;
        case 'horizontal':
            height = hFooter;
            break;
    }
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

function showFooter() {
    if(focus !== footer) {
        focus = footer;
        
        // Fade all content out.
        footer.add(health).add(env).children()
                .fadeOut(fadeDuration);
        
        brotherResize(health, 'horizontal', fadeDuration);
        brotherResize(env, 'horizontal', fadeDuration);
        
        footer.find(".content").add(health.add(env).add(".horizontal"))
                .delay(moveDuration + fadeDuration)
                .fadeIn(fadeDuration);
    }
}

function closeFooter() {
    if(focus === footer) {
        // Fade all content out.
        footer.children()
                .fadeOut(fadeDuration);
        
        footer.find(".horizontal")
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

$(document).ready(function(){
    env = $("#environment");
    health = $("#health");
    header = $("header");
    footer = $("footer");
    
    header.css("height", hHeader);
    
    initial();
});
const OriginalAudioContext = window.AudioContext;

window.AudioContext = function (...args) {
    const ctx = new OriginalAudioContext(...args);
    window.myAudioContext = ctx;
    console.log("Captured AudioContext:", ctx);
    return ctx;
};

window.AudioContext.prototype = OriginalAudioContext.prototype;

document.addEventListener("visibilitychange", () => {
    if (window.myAudioContext) {
        if (document.hidden) {
            window.myAudioContext.suspend();
        } else {
            window.myAudioContext.resume();
        }
    }
});
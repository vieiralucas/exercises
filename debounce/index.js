module.exports = function(fn, time) {
    var timeout;

    return function() {
        var ctx = this;
        var args = arguments;

        var timeoutFunc = function() {
            fn.apply(ctx, args);
            timeout = null;
        };

        if (!timeout) {
            timeout = setTimeout(timeoutFunc, time);
            return;
        }

        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunc, time);
    };
};


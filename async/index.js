var sequence = function(functions) {
    return function(callback) {
        var count = 0;
        var previousReturn;
        var interval;

        var finish = function(err, currentReturn) {
            if (err) {
                callback(err);
            }

            previousReturn = currentReturn;
            count++;
            if (count >= functions.length) {
                callback(err, previousReturn);
            } else {
                functions[count].call(null, finish, previousReturn);
            }
        };

        functions[count].call(null, finish, previousReturn);
    };
};

var parallel = function(functions) {
    return function(callback) {
        var count = 0;
        var returns = [];

        var finish = function(err, currentReturn) {
            if (err) {
                callback(err);
            }

            returns.push(currentReturn);
            count++;
            if (count >= functions.length) {
                callback(null, returns);
            }
        };

        functions.forEach(function(func) {
            func(finish);
        });
    };
};

var race = function(functions) {
    return function(callback) {
        var finish = function(err, currentReturn) {
            if (callback) {
                if (err) {
                    callback(err);
                    callback = undefined;
                    return;
                }

                callback(null, currentReturn);
                callback = undefined;
            }
        };

        functions.forEach(function(func) {
            func(finish);
        });
    };
};

module.exports = {
    sequence: sequence,
    parallel: parallel,
    race: race
};

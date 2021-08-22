//jshint esversion:6

module.exports.getDate = getDate;

function getDate() {
    var today = new Date();

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    return today.toLocaleDateString("en-US", options);

}

module.exports.getDay = getDay;

function getDay() {
    var today = new Date();

    var options = {
        weekday: 'long',
    };

    return today.toLocaleDateString("en-US", options);

}
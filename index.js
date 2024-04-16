"use strict";

module.exports = function (instance) {
    instance.interceptors.request.use(function (request) {
        request.timingStart = Date.now();
        return request;
    });

    instance.interceptors.response.use(function (response) {
        response.timings = getResponseTiming(response?.config?.timingStart);

        return response;
    }, function (error) {
        if (error.config){
            error.config.timings = getResponseTiming(error?.config?.timingStart);
        };

        return Promise.reject(error);
    });
};

const getResponseTiming = (timingStart = 0) => {
    const timingEnd = Date.now();
    return {
        timingEnd,
        timingStart,
        elapsedTime: Math.round(timingEnd - timingStart),
    };
};
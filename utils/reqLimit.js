const limitter = require("express-rate-limit")

function rateLimitter(time, maxReq, message){
    let limit = limitter({
        windowMs: time ? time : 15 * 60 * 1000, // 15 minutes
        max: maxReq ? maxReq : 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: {
            status: false,
            code: "TOO_MANY_REQUESTS",
            message: message || `Too many Requests, Please try again after ${time ? time + timetype : "15 minutes"}`,
        }
    })

    return limit;
}

module.exports = rateLimitter;
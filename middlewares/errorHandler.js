//Xử lý notFound
const notFound = (req, res, next) => {
    const error = new Error(`Khong tìm thấy luồng: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//Error Hander */
const handleError = (req, res, next) => {
    const statuscode = res.statusCode ? res.statusCode : 500;
    res.status(statuscode);
    res.json({
        status: false,
        message: err?.message,
        stack: err?.stack,
    })
}

module.exports = {
    notFound,
    handleError
}
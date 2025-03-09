const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found with id of ${err.value}`;
            error = new Error(message, 404);
            error.status = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message, 400);
            error.status = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((val) => val.message);
            error = new Error(message, 400);
            error.status = 400;
        }

        res.status(error.status || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;
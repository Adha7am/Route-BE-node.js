
// this is only required in express v4 but i implemented here for practice

function asyncHandler(controller) {
    return (req, res, next) => {
        Promise.resolve()
            .then(() => controller(req, res, next))
            .catch(next);
    };
};

export default asyncHandler;
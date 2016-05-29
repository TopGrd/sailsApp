module.exports = function canCreate(req, res, next) {
    console.log('reach');
    console.log(req.session);
    if (req.session.canCreate) {
        return next();
    }
    else {
        res.send('no auth')
    }
};

module.exports = {
    sayHello: function (req, res) {
        res.status(400);
        res.view('404', {
            message: 'you are not the one'
        });
    }
}

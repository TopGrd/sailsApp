/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function (req, res) {
        console.log('reach');
        User.findOne({
            name: req.param('name'),
            password: req.param('password')
        }, function (err, user) {
            if (err) console.log(err);
            if (!user) {
                console.log("密码或用户名错误");
                return res.forbidden('用户名或密码错误！');
            }
            else {
                console.log(user);
                req.session.authenticated = true;
                //res.redirect('/yaya/1');
                res.redirect('/select');
            }

        })
    },
    create: function (req, res) {
        console.log('reach');
        console.log(req.session);
        User.create({
            name: req.param('name'),
            password: req.param('password')
        }, function onSuccess(err, newUser) {
            if (err) {
                return res.negotiate(err);
            }
            res.json({
                id: newUser.id
            })
        })
    }
};

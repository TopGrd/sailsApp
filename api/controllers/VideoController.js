/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var source = 'http://k.syasn.com/j';
var options = {
    url: 'http://2mn.tv/j',
    headers: {
        'User-Agent': 'request'
    }
};


module.exports = {
    getVideo: function (req, res) {
        var urls = [];
        for (var i = 1; i <= 135; i++) {
            var url = source + '/j' + i + '.mp4';
            urls.push(url);
        }
        res.render('video/index', {
            urls: urls
        });
    }
};

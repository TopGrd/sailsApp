var rp = require('request-promise');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = {
    renderImg: function (req, res) {
        res.render('yaya/index', {
            images: getData.images,
            titles: getData.titles,
            ids: getData.ids
        });
    },
    renderDetail: function (req, res) {
        var url = getData.hrefs[req.params.id];
        var urls = [];
        var arr = [];
        var options = {
            uri: url,
            encoding: null,
            headers: {
                'User-Agent': 'request'
            },
            transform: function (body) {
                var html = iconv.decode(new Buffer(body), 'gb2312').toString();
                return cheerio.load(html, {
                    decodeEntities: true
                });
            }
        };

        rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...
                var pages = $('.pages ul li a')[0].children[0].data;
                pages = parseInt(pages.slice(1, pages.indexOf('页')));
                var urlD = options.uri;
                var htmlNum = urlD.indexOf('html');
                var str = urlD.slice(0, htmlNum - 1);

                for (var i = 1; i < pages + 1; i++) {
                    urls.push((str + '_' + i + '.html'));
                }
                for (var i in urls) {

                    options.uri = urls[i];
                    rp(options)
                        .then(function ($) {
                            for (var i = 0; i < $('.ArticlePicBox img').length; i++) {
                                var src = $('.ArticlePicBox img')[0].attribs.src;
                                arr.push(src)
                                getarr(arr);
                            }
                        })
                        .catch(function (err) {
                            // Crawling failed or Cheerio choked...
                            console.log(err);
                        })
                }


                function getarr(param) {
                    if (param.length == urls.length) {
                        res.render('yaya/detail', {
                            images: param
                        });
                    }

                }
            })
            .catch(function (err) {
                // Crawling failed or Cheerio choked...
                console.log(err);
            });
    }
}

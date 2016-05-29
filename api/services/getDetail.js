var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
urls = [];

function requsetData(options, arr) {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = iconv.decode(new Buffer(body), 'gb2312').toString();
            $ = cheerio.load(html, {
                decodeEntities: true
            });
            var pages = $('.pages ul li a')[0].children[0].data;
            pages = parseInt(pages.slice(1, pages.indexOf('页')));
            var urlD = options.url;
            var htmlNum = urlD.indexOf('html');
            var str = urlD.slice(0, htmlNum - 1);

            for (var i = 1; i < pages + 1; i++) {
                urls.push((str + '_' + i + '.html'));
            }

        }
        for (var i in urls) {
            console.log(urls);
            options.url = urls[i];
            request(options, callback);
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

                $ = cheerio.load(body);
                $('.ArticlePicBox img').each(function (i, ele) {
                    var src = ele.attribs.src;
                    arr.push[src];
                    console.log(arr);
                });
                //console.log(srs);
            }
        }
    });
}

module.exports = {
    getData: function (url, arr) {

        var options = {
            url: url,
            encoding: null, //这里表示在抓取网页时不要对接收到的数据做任何转换
            headers: {
                'User-Agent': 'request'
            }
        };
        requsetData(options, arr);
        return arr;
    }
}

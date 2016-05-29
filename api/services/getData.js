var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var urlConfig = require('../../urlConfig')
var urls = [];
var images = [];
var titles = [];
var ids = [];
var hrefs = [];
var url = urlConfig.url;
var options = {
    url: urlConfig.url,
    encoding: null, //这里表示在抓取网页时不要对接收到的数据做任何转换
    headers: {
        'User-Agent': 'request'
    }
};

request(options, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var html = iconv.decode(new Buffer(body), 'gb2312').toString();
        $ = cheerio.load(html, {
            decodeEntities: true
        });
        var imgs = $('#NewList li img');
        var detail = $('#NewList li a:last-child');
        for (var i = 0; i < detail.length; i++) {
            if (i % 2 !== 0) {
                titles.push(detail[i].attribs.title);
                hrefs.push(detail[i].attribs.href)
            }
        }
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].attribs.src);
            ids.push(i);
        }
        var pages = $('.pages ul li').last().children()[0].attribs.pageon;
        for (var i = 1; i < pages; i++) {
            urls.push((url + '/p' + i + '.html'));
        }
    }
});
module.exports = {
    images: images,
    titles: titles,
    ids: ids,
    hrefs: hrefs
}

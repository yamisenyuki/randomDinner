const spueragent = require('superagent')
const random_agent = require('random-useragent')
const cheerio = require('cheerio')
const URL = 'https://www.xiachufang.com'

let ua = random_agent.getRandom(ua => {
    if (ua.browserName === 'Chrome' && ua.deviceType === '')
        return true
    else
        return false
})
module.exports = {
    async search(key, page) {
        let list = []
        for (p = 1; p <= page; p++) {
            let res = await spueragent.get(URL + '/search/')
                .query({ keyword: key, page: p })
                .set('User-Agent', ua)
            if (res.status === 200) {


                const $ = cheerio.load(res.text)
                let l = $('.normal-recipe-list>ul>li .name>a').map((i, e) => {
                    return { name: $(e).text().replace(/\s/g, ''), url: $(e).attr('href') }
                }).get()
                for (i of l) {
                    list.push(i)
                }
            } else {
                break;
            }
        }
        return list
    },
    async recipe(url) {
        let no = url.split('/')
        return await this.recipeno(no[no.length - 2])
    },
    async recipeno(no) {
        let res = await spueragent.get(URL + '/recipe/' + no)
            .set('User-Agent', ua)
        if (res.status === 200) {

            let materials = []
            let name = ''

            const $ = cheerio.load(res.text)
            let desc = $('.desc').text().replace(/\s/g, '')

            let l = $('.ings>table tr').map((i, e) => {
                return { name: $(e).children('td').first().text().replace(/\s/g, ''), unit: $(e).children('td').last().text().replace(/\s/g, '') }
            }).get()
            for (i of l) {
                materials.push(i)
            }
            let grade = $('.score>.number').text()
            let steps = $('.steps .container>p').map((i, e) => {
                // console.log($(e).text())
                return { step: i, desc: $(e).text() }
            }).get()
            name = $('.page-title').text().replace(/\s/g, '')
            return {
                name: name,
                grade: grade,
                desc: desc,
                materials: materials,
                steps: steps
            }
        }
    }
}
// this.recipe(no = '104403502')

// search('黄瓜', 12).then(r => {
//     console.log(r)
// })



const cook = require('./cookbook')
// cook.recipe('/recipe/104403502').then(res => {
//     console.log(res)
// })
cook.search('米饭', 12).then(res => {
    // console.log(res)
    let index = Math.floor(Math.random() * res.length)
    // console.log(index)
    let item = res[index]
    console.log(item.name)
    console.log('https://www.xiachufang.com' + item.url)
    let rep = cook.recipe(item.url).then(r => {
        console.log(r.desc)
        console.log('评分:', r.grade)
        for (i of r.materials) {
            console.log('%s\t\t%s', i.name, i.unit)
        }
        console.log('步骤')
        for (i of r.steps) {
            console.log('%s.  %s', i.step + 1, i.desc)
        }
    })


})
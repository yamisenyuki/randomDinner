# randomDinner
用于从下厨房随机抓取晚餐菜谱，解决自己不知道晚上吃什么的问题。
# 用法
``` JavaScript
const cook = require('./cookbook')
// 食材名称，搜索页数范围
cook.search('米饭', 12).then(res => {})
```
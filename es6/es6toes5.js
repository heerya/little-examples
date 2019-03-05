//在es7中
//浅层克隆
let heyuxin = {
    name:'heyuxin',
    age:'20'
}
let school = {
    leader :{
        name:'xiaozhang',
        age:40
    },
    personNum:2000
}
let obj = {
    ...school,
    ...heyuxin
}
//深度克隆
let obj2 = JSON.parse(JSON.stringify(obj));
obj2.leader.name='xixi';
console.log(obj);
console.log(obj2);
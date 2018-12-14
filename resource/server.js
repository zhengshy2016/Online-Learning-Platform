let express=require('express');
let session=require('express-session');
let app=express();
app.listen(9093,function(){
    console.log("started");
});
//解析请求体的中间件 req.body上为解析后的结果
let bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(session({
    resave:true,//每次重新保存
    secret:'zfpx',
    saveUninitialized:true
}));//req.session进行设置内容
//cors跨域
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send();/*让options请求快速返回*/
    else  next();

});
let axios=require('axios');
//我想访问祖峰的网站 我想访问我的服务 我的服务访问祖峰的服务 把数据返回给前端
//轮播图
app.get('/silders',function(requst,response){
    axios.get('http://html5train.com/orgHomePage.do?action=getOrgHomePageInfo&layoutType=default&organizationId=510&_=1516694175474').then(function(res){
        response.json(res.data.moduleDTOList.list[0].moduleMap.map.pictureDTOList.list);
    })
});

//获取课程
//服务端一共有20条， 第一次获取五条， 下一次从五条偏移五条
//offset 偏移
//limit 每次取多少条
//type 课程类型
let lessons=require('./mock/lessons');
app.get('/lessons/:offset/:limit/:type',(req,res,next)=>{
    let{offset,limit,type}=req.params;
    //all react vue
    let lists=lessons.list;
    if(type!=='all'){
        lists=lessons.list.filter((item,index)=>{
            return item.type===type;
        })

    }
    offset=parseInt(offset);
    limit=parseInt(limit);
    let newArrs=lists.slice(offset,offset+limit);
    let hasMore=offset+limit>=lists.length?false:true;
    setTimeout(()=>{
        res.json({hasMore,list:newArrs});
    },500)
    
});

app.get('/lesson/:id',function(req,res){
    let {id}=req.params;
    let lesson=lessons.list.find(item=>item.id==id)||{};
    res.json(lesson);
});

let userList=[];//用户信息
let crypto=require('crypto');
//先注册，在登录{uer:'登陆后的用户名'，msg：'账号重复'，success:'成功后的提示'，err：0}
app.post('/reg',function(req,res){
    //{username,password}
    let {username,password}=req.body;
    let user=userList.find(item=>item.username==username);
    
    if(user){
        res.json({user:null,msg:'用户已存在',success:'',err:1});
    }else{
        //摘要算法 md5
        password=crypto.createHash('md5').update(String(password)).digest('base64');
        userList.push({username,password});
        res.json({user:null,msg:'',success:'恭喜注册成功',err:0});
    }

});

app.post('/login',function(req,res){
    //{username,123456}
    let{username,password}=req.body;
    password=crypto.createHash('md5').update(String(password)).digest('base64');
    let user=userList.find(item=>(item.username==username)&&(item.password==password));
    if(user){
        //有这个用户
       
        res.json({user:username,msg:'',success:'恭喜登录成功',err:0});
        req.session.username=username;//相当于登录成功后将用户名保存在session中了
        
    }else{
        //用户不存在
        res.json({user:null,msg:'用户名或密码不正确',success:'',err:1});
        
        
        
    }
});
app.get('/validate',function(req,res){
    //用于校验用户是否登录
    res.json({user:req.session.user,msg:'',err:0,success:''});

});




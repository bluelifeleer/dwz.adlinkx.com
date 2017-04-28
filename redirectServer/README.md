## nodejs跳转服务器
###### 目录:
	redirectServer
		|-> error 		//错误页面包括：404、500页面
		|-> logs 		//访问日志目录，记录访问详细日志
		|-> ssl 		//ssl认证文件包括：key,crt
		|-> https.js 	//https服务器主要代码
###### 依赖包：redis,socket.io,cli-color,fs,https,http-proxy
###### 安装：npm install redis
###### 安装：npm install socket.io
###### 安装：npm install cli-color
###### 安装：npm install http-proxy --save
###### 功能：https、跳转、显示错误页面（500，404）、记录访问日志
###### 修改:增加https正式证书，增加跳转统计功能，增加控制台输出字符带颜色。
###### author bulelife
###### date 2017-03-17
###### email thebulelife@outlook.com
###### modify 2017-03-19
###### 修改: 增加如果是访问网站则将转发到时Nginx服务器上，Nginc监听444端口。
###### modify 2017-04-29
let koa = require('koa')

let app = koa()

//X-Response-Time
app.use(function* (next){
	let start = new Date
	console.log('X-Response-Time - Before yield')
	this.state.region = {regionCode:'MUMBAI',regionName:'MUMBAI'}
	yield next;
	console.log('X-Response-Time - After yield')
	let ms = new Date - start
	this.set('X-Response-Time',ms + 'ms')
})

//Logger
app.use(function* (next){
	let start = new Date
	console.log('Logger -  before yield')
	yield next;
	let ms = new Date - start
	console.log("State: ",this.state)
	console.log('Method: %s %s - %s',this.method,this.url,ms)
	console.log('Subdomains: '+this.subdomains.join(','))
	console.log('\n\n\nAPP INSTANCE: ',this.app)
})

app.use(function* (next){
	console.log('before sending - response middleware')
	this.body = 'Hello World!'
	console.log('after sending - response middleware')
})

app.listen(3000,function(){

	console.log('Listening on port 3000')
})
app.on('error',function(err,ctx){
	console.error('Server Error: ',err,ctx)
})

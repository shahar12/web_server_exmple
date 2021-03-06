const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants');
const express = require('express');
const path = require('path');
var  pokimon_id = " ";
var isON = false;
app = express();
/* var  */
const port = 3035 ; 
const popularty_pokimons = new Map();
app.use("/assets", express.static("static-assets"));
app.use(express.static(path.join(__dirname, 'static-assets')));
const pokimon_data = require('./static-assets/data/pokemons.json');


/* create array for popularty of pokimons */
var timer = setInterval(function(){
    for(let i=0; i<151;i++){
        popularty_pokimons[String(i+1)]=0;
    }
    clearInterval(timer); 
 },100);

/* return top  3 bigest pokimon  */
app.use("/popularty",function(req, res){
    var sorted = Object.keys(popularty_pokimons).sort(function(a,b) {
         return popularty_pokimons[b] - popularty_pokimons[a];
    });
    var top3 = sorted.slice(0,3);
    var topThreeMap = new Array();
    const result = pokimon_data.map((obj)=>{
        return {
            id: obj.id,
            name: obj.name,
            type: obj.type,
            base: obj.base
        }
    });

    for(i=0 ; i<result.length; i++){
        if(result[i].id == top3[0] ){
            topThreeMap[0]= result[i];
        }
        else if(result[i].id == top3[1]){
            topThreeMap[1]=result[i];
        }
        else if(result[i].id == top3[2]){
            topThreeMap[2]=result[i];
        }
    }
    res.send(topThreeMap);
});


/* return pokimon by id    */
app.get('/pok/data/',(req, res)=>{
    const num_pok = parseInt(pokimon_id);
    const result = pokimon_data.map((pokimon)=>{
        return{
            id: pokimon.id,
            name: pokimon.name,
            type: pokimon.type,
            base : pokimon.base
        }
    });
    console.log("get number 1, id : "+pokimon_id);
    res.send(result[parseInt(pokimon_id)]);    
});

app.get('/list_pokimon.html',(req,res)=>{
    res.sendFile(path.resolve('./list_pokimon.html'));
});

app.get('/pokimon/page/:id',(req,res)=>{
    if(req.params.id != "style.css")
        pokimon_id = req.params.id.toString();
    var pokimon_number = parseInt(pokimon_id);
    console.log("get number 2, id : "+pokimon_id);
    popularty_pokimons[pokimon_number]++;
    res.sendFile(path.resolve('./pokimon_id.html'));
})

/* return all pokimons array */ 
app.get('/api/pokimons',(req, res)=>{
    const result = pokimon_data.map((perms)=>{
        return{
            id : perms.id,
            name : perms.name,
            type : perms.type
        }
    });
    res.send(result); 
});

app.get("/",function(req,res){
   res.sendFile(path.resolve('./index.html'));
})
/* bring back home page  */

app.listen(port,function(error){
    if(error){
        console.log("error",error)
    }else{
        console.log('server is listening on port '+ port)
    }
});

//404 not found//
app.use((req,res)=>{
   res.sendfile(path.resolve("./404.html")); 
});

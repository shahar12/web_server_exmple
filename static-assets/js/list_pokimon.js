console.log("list_pokimons.js")

async function main(){
    fetch("/api/pokimons").then(function(response){
        return response.json();
    })
    .then(function(data){
        appendData(data);
    })
    .catch(function(err){
      console.log("error : " + err);
    })

    function create_pic(pic,i,id){
        if(i < 9 ){  
            var str_id = "00"+id+".png";
            var url = "/image/"+str_id;
            pic.src =  url ; 
            console.log({url}); 
        }else if(i < 100 ){
            var str_id = "0"+id+".png"; 
            var url = "/image/"+str_id;
            pic.src =  url ; 
            console.log({url});  
        }else {
            var str_id = id+".png"; 
            var url = "/image/"+str_id;
            pic.src =  url ; 
            console.log({url});  
        }
        return pic ; 
    }

    function appendData(data){
        var container = document.getElementById("pokimon_box");
        for (var i = 0 ; i < data.length; i++){
            var  box = document.createElement("div");
            box.className = "pokimon_inner_box";
            var  pic  = new Image(75,75);
            var div = document.createElement("div");
            div.innerHTML = `<p>`+'id : ' + data[i].id + `<br>`  
            +' name : ' + data[i].name + `<br>`+
            ' type : ' + data[i].type+`</p>`;
            if(div && pic && box ){
                box.appendChild(div);
                box.appendChild(create_pic(pic,i,data[i].id));
                container.appendChild(box);
            }
        }
    }
};

main();
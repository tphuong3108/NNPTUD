let promise = new Promise(function(resolve,reject){
    let a = Math.floor(Math.random()*51);
    console.log(a);
    if(a%2==0){
        resolve(a);
    }else{
        reject(a);
    }
})
promise.then(
    function(data){
        console.log("thanh cong "+data);
        return data*2;
    }
).then(
    function(data){
        console.log("thanh cong 2 "+data);
        return data*2;
    }
).then(
    function(data){
        console.log("thanh cong 3 "+data);
    }
)
.catch(
    function(error){
        console.log("that bai "+error);
    }
)
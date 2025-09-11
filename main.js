fetch('http://localhost:3000/posts').then(
    function(data){
        return data.json()
    }
).then(
    function(posts){
        for (const post of posts) {
            let body = document.getElementById("body");
            body.innerHTML+=convertDataToHTML(post);
        }
    }
)
function convertDataToHTML(post){
    let result = "<tr>";
    result +=  "<td>"+post.id+"</td>";
    result +=  "<td>"+post.title+"</td>";
    result +=  "<td>"+post.views+"</td>";
    result += "</tr>";
    return result;
}
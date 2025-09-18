const express = require('express')
const app = express()
const port = 3000

let posts = [
    {
      id: "1",
      title: "a title",
      views: 100
    },
    {
      id: "2",
      title: "another title",
      views: 200
    },{
        id: "3",
        title: "a title 3",
        views: 300
      },
      {
        id: "4",
        title: "another title 4",
        views: 100
      }
  ]

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/posts', (req, res) => {
    let queries = req.query;
    let views = queries.views;
    let views_lte = queries.views_lte;
    let views_gte = queries.views_gte;
    let title = queries.title;
    let title_like = queries.title_like;
    
    if(views){
        posts = posts.filter(
            p=>p.views==views
        )
    }
    if(views_lte){
        posts = posts.filter(
            p=>p.views<=views_lte
        )
    }
    if(views_gte){
        posts = posts.filter(
            p=>p.views>=views_gte
        )
    }
    if(title_like){
        posts  = posts.filter(
            p=>p.title.includes(title_like)
        )
    }
    if(title){
        posts  = posts.filter(
            p=>p.title == title
        )
    }
    res.send(posts)
})
app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.filter(
        p=>p.id==id
    )
    if(post.length>0){
        res.send(post[0]);
    }else{
        res.status(404).send({
            success:false,
            data:{
                message: "id not found"
            }
        });
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const app = require('express')();
const PORT = 8080;

app.post('/user' , (req,res) =>{
res.status(200).send({
    username: 'Billy',
    score : '444'
})
});
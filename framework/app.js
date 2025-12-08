const http = require("http")


const port = 8080

const server = http.createServer(function(req, res){
    try{
        console.log('Now we connect with:', req.url)
        res.write('Now we are working about it!')
        res.end()
    }
    catch(error){
        console.log('Something wrong', error)
    }
})

server.listen(port, function(error){
    if(error){
        console.log('Something went wrong!', error)
    }
    else{
        console.log('Server is litening on port', port)
    }
})
const users = [];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Greeting Message</title></head>');
        res.write('<body><h1>Welcome to my users page!</h1><h2>Create a new user:</h2><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/users'){
        res.write('<html>');
        res.write('<head><title>Greeting Message</title></head>');
        //res.write('<body><h2>User List:</h2><ul><li>Jose</li><li>Luis</li></ul></body>');
        res.write('<body>')
        res.write('<h2>User List:</h2>')
        res.write('<ul>')
        for (const user of users) {
            res.write(`<li>${user}</li>`);
          }
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>');
        return res.end();    
    }

    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newUser = parsedBody.split('=')[1];
            console.log(newUser);
            users.push(newUser);
            console.log(users);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Page</title></head>');
    res.write('</html>')
};

module.exports = requestHandler;
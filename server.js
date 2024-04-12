const express = require('express');
const app = express();
const port = 80;

// Middleware to set headers - allowing all origins for simplicity in local testing
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

// Function to generate cookie setting string
const setCookieString = (name, value) => `${name}=${value}; Path=/; HttpOnly; SameSite=None; Secure`;

// Domain 1 - Top Level
app.get('/', (req, res) => {
	// Assuming domain1.com is the default entry, no need to specify /domain1.com in the route
	const cookieString = setCookieString(req.hostname+'TopLevelCookie', req.hostname);
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>`+req.hostname+` - Top Level</h1>
    <iframe src="https://domain2.com/single" width="300" height="200"></iframe>
    `);
});

// Define routes for domain2.com
app.route('/single')
   .get((req, res) => {
	   const cookieString = setCookieString(req.hostname+'SingleLevelCookie', req.hostname+'Single');
	   res.setHeader('Set-Cookie', cookieString);
	   res.send('<h1>Domain 2 - Single Nested Iframe</h1>');
   });

app.route('/multi')
   .get((req, res) => {
	   const cookieString = setCookieString(req.hostname+'MultiLevelCookie', req.hostname+'Multi');
	   res.setHeader('Set-Cookie', cookieString);
	   res.send(`
        <h1>`+req.hostname+` - Multi Level</h1>
        <iframe src="https://domain3.com/multi" width="300" height="200"></iframe>
        `);
   });

app.route('/sibling')
   .get((req, res) => {
	   const cookieString = setCookieString(req.hostname+'SiblingCookie', req.hostname+'Sibling');
	   res.setHeader('Set-Cookie', cookieString);
	   res.send(`
        <h1>`+req.hostname+` - Sibling Iframes</h1>
        <iframe src="https://domain3.com/" width="300" height="200"></iframe>
        <iframe src="https://domain4.com/" width="300" height="200"></iframe>
        `);
   });

app.route('/mixed')
   .get((req, res) => {
	   const cookieString = setCookieString(req.hostname+'MixedCookie', req.hostname+'Mixed');
	   res.setHeader('Set-Cookie', cookieString);
	   res.send(`
        <h1>`+req.hostname+` - Mixed Nesting</h1>
        <iframe src="https://domain3.com/mixed" width="300" height="200"></iframe>
        <iframe src="https://domain5.com/" width="300" height="200"></iframe>
        `);
   });

// Similar route structures for domain3.com, domain4.com, etc.
// Example for domain3.com
app.route('/multi')
   .get((req, res) => {
	   // Note: This assumes you're handling domain distinction elsewhere, as this conflicts with domain2's /multi
	   const cookieString = setCookieString(req.hostname+'MultiLevelCookie', req.hostname+'Multi');
	   res.setHeader('Set-Cookie', cookieString);
	   res.send(`
        <h1>`+req.hostname+` - Multi Level Nested</h1>
        <iframe src="https://domain4.com/" width="300" height="200"></iframe>
        `);
   });

// Start the server
app.listen(port, () => {
	console.log(`Server listening at https://localhost:${port}`);
});

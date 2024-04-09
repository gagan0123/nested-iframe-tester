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
const setCookieString = (name, value) => `Set-Cookie: ${name}=${value}; Path=/; HttpOnly; SameSite=None; Secure`;

// Single Level Nesting - domain1.com
app.get('/domain1.com', (req, res) => {
	const cookieString = setCookieString('SingleLevelCookie', 'domain1');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 1 - Top Level</h1>
    <iframe src="https://domain2.com/domain2.com/single" width="300" height="200"></iframe>
    `);
});

// Domain 2 route for single level nesting
app.get('/domain2.com/single', (req, res) => {
	const cookieString = setCookieString('SingleLevelCookie', 'domain2Single');
	res.setHeader('Set-Cookie', cookieString);
	res.send('<h1>Domain 2 - Single Nested Iframe</h1>');
});

// Multi-level Nesting - starting at domain2.com/multi
app.get('/domain2.com/multi', (req, res) => {
	const cookieString = setCookieString('MultiLevelCookie', 'domain2Multi');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 2 - Multi Level</h1>
    <iframe src="https://domain3.com/domain3.com/multi" width="300" height="200"></iframe>
    `);
});

// Domain 3 route for multi-level nesting
app.get('/domain3.com/multi', (req, res) => {
	const cookieString = setCookieString('MultiLevelCookie', 'domain3Multi');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 3 - Nested inside Domain 2</h1>
    <iframe src="https://domain4.com/domain4.com" width="300" height="200"></iframe>
    `);
});

// Sibling Iframes - domain2.com/sibling
app.get('/domain2.com/sibling', (req, res) => {
	const cookieString = setCookieString('SiblingCookie', 'domain2Sibling');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 2 - Sibling Iframes</h1>
    <iframe src="https://domain3.com/domain3.com" width="300" height="200"></iframe>
    <iframe src="https://domain4.com/domain4.com" width="300" height="200"></iframe>
    `);
});

// Mixed Nesting - domain2.com/mixed
app.get('/domain2.com/mixed', (req, res) => {
	const cookieString = setCookieString('MixedCookie', 'domain2Mixed');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 2 - Mixed Nesting</h1>
    <iframe src="https://domain3.com/domain3.com/mixed" width="300" height="200"></iframe>
    <iframe src="https://domain5.com/domain5.com" width="300" height="200"></iframe>
    `);
});

// Domain 3 route for mixed nesting
app.get('/domain3.com/mixed', (req, res) => {
	const cookieString = setCookieString('MixedCookie', 'domain3Mixed');
	res.setHeader('Set-Cookie', cookieString);
	res.send(`
    <h1>Domain 3 - Mixed Nesting</h1>
    <iframe src="https://domain4.com/domain4.com" width="300" height="200"></iframe>
    <iframe src="https://domain6.com/domain6.com" width="300" height="200"></iframe>
    `);
});

// Simple routes for domains 4, 5, 6... with cookies
['domain4.com', 'domain5.com', 'domain6.com'].forEach(domain => {
	app.get(`/${domain}`, (req, res) => {
		const cookieString = setCookieString(`${domain}Cookie`, `${domain}`);
		res.setHeader('Set-Cookie', cookieString);
		res.send(`<h1>${domain.toUpperCase()}</h1>`);
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server listening at https://localhost:${port}`);
});

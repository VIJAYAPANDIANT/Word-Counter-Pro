const http = require('http');

const data = JSON.stringify({
    text: "Hello world! This is a test."
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/analyze',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        const result = JSON.parse(responseBody);
        const fs = require('fs');
        fs.writeFileSync('test_results.json', JSON.stringify({
            received: result,
            success: (result.wordCount === 6 && result.charCount === 28)
        }, null, 2));
        
        if (result.wordCount === 6 && result.charCount === 28) {
            console.log('Verification Success!');
            process.exit(0);
        } else {
            console.log('Verification Failed!');
            process.exit(1);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
    process.exit(1);
});

req.write(data);
req.end();

const express = require('express');
const app = express();
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;

const options = {
    swaggerDefinition: {
        info: {
            title: 'API for depecting Lamda example using aws',
            version: '1.0.0',
            description: 'Assignment 09, AWS, Lamda.',
        },
        host: '159.223.162.196:3000',
        basepath: '/',
    },
    apis: ['./server.js'],
};
const specs = swaggerjsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


/**
 * @swagger
 * /say:
 *   get:
 *     summary: returning with greetings, while appending keyword value.
 *     tags: 
 *       - api for aws lamda
 *     parameters:
 *       - name: keyword
 *         in: query
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 */
app.get("/say", async (req, res) => {
    try {
        if (!req.query.keyword) {
            return res.status(404).json({ error: 'Missing parameter keyword in the request query' });
        }
        const msg = await axios.get(`https://cxx4yebe2g.execute-api.us-east-1.amazonaws.com/demo/my-function?keyword=${req.query.keyword}`);
        res.send(msg.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://159.223.162.196:${port}`);
});
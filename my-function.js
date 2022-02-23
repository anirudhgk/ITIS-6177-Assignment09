exports.handler = async (event) => {
    const keyword = event.queryStringParameters.keyword;
    const msg = "Anirudh says " + keyword;
    const res = {
        statusCode: 200,
        body: msg
    };
    return res;
};
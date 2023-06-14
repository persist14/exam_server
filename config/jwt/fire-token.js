const request = require('superagent');

class RequestToken {
    async request() {

        let data = await request
            .post('https://113.135.192.25:18400/evo-apigw/evo-oauth/oauth/token')
            .type('form')
        // .set('Content-Type', 'application/x-www-form-urlencoded')
            .disableTLSCerts()
            .send({
                'client_id': 'ioc_platform',
                'client_secret': '8209f52f-e64e-4578-a298-0082dd0d16fe',
                'grant_type': 'client_credentials',
            });
        return data;
    }
}
const requestToken = new RequestToken();

async function test() {
    let iocToken = {};
    let data = await requestToken.request();
    iocToken.access_token = data.body.data.access_token;
    return iocToken;
}
module.exports = async() => {
    let data = await test();
    return data;
};
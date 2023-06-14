const request = require('superagent');
const iocToken = require('../../config/jwt/fire-token');
class RequestToken {

    getAllDataSync() {
        return new Promise(async(resolve, reject) => {
            let data = await request
                .post('https://113.135.192.25:18400/evo-apigw/evo-brm/1.2.0/device/list-page')
                .disableTLSCerts()
                .auth('db267e9a-61ec-49b2-9887-d790f46577f8', {type: 'bearer'})
                .type('json')
                .send({
                    'pageNum': '2',
                    'pageSize': '10',
                    'deviceExtendConditionList': [
                        {
                            'categorys': [87],
                            'types': ['1_2', '2_3'],
                        },
                    ],
                });
            resolve(data);
        });
    }
}
const requestToken = new RequestToken();
async function test() {
    // console.log(await iocToken());
    let data = await requestToken.request();
    // console.log(JSON.stringify(data.body));
}
test();
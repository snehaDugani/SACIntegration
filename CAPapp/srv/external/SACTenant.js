const cds = require('@sap/cds');

class SACTenant extends cds.RemoteService {
    async init() {

        this.reject(['CREATE', 'UPDATE', 'DELETE'], '*');

        this.before('READ', 'Stories', (req) => {
            try {
                req.query = 'GET /stories?include=models';
            } catch (err) {
                console.error(err);
            }
        });
        this.before('READ', 'Users', (req) => {
            try {
                //  req.query = 'GET /scim/Users?count=50&startIndex=1';
                // req.query = 'GET /scim/Users?attributes=displayName,id&count=10&startIndex=1';
                // req.query = 'GET /scim/Users/?startIndex=1&count=10';
                req.query = 'GET /scim/Users';
                // req.query = 'GET /scim/Users/001510' ;

            } catch (err) {
                console.error(err);
            }
        });


        this.on('READ', '*', async (req, next) => {
            const response = await next(req);
            return response.Items;
        });

        super.init();
    }
}

module.exports = SACTenant;
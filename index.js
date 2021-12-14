const express = require('express');
const parser = require('body-parser');
const mediatorUtils = require('openhim-mediator-utils');
const apiConf = require('./config/config');
const mediatorConfig = require('./config/mediator');
const axios = require('axios');
const request = require('request');

const app = express();
const PORT = 3400;
let URL = mediatorConfig.config.hfr.url;
let FACILITIES_URL = mediatorConfig.config.hfr.hfr_facilities;

app.use(parser.json());


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.get('/mediator', (req, res) => {
    const PARAMS = req.query;

    axios.get(URL, {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        params: PARAMS
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        console.log(error);
    }).then(() => {
        console.log('executed');
    });

});

app.get('/health-facilities', (req, res) => {
    const PARAMS = req.query;
    axios.get(FACILITIES_URL, {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        },
        params: PARAMS
    }).then((response) => {
        res.send(response.data);
        console.log('resp', response.data);
    }).catch((error) => {
        console.log('error');
    }).then(() => {
        console.log('executed');
    });
});

app.post('/hrhis-mediator', (req, res) => {
    payload = {};
    payload.code = req.body.Fac_IdNumber;
    payload.name = req.body.Name;
    payload.shortName = req.body.Comm_FacName;
    payload.openingDate = req.body.OpenedDate;
    payload.coordinates = JSON.stringify([req.body.Latitude, req.body.Longitude]);
    payload.active = req.body.OperatingStatus !== 'Operating';
    payload.parent = {
        code: req.body.Council_Code
    };
    payload.organisationUnitGroups = [
        {
            code: req.body.FacilityTypeGroupCode
        },
        {
            code: req.body.FacilityTypeCode
        },
        {
            code: req.body.OwnershipCode
        },
        {
            code: req.body.OwnershipGroupCode
        }
    ];

    request.post(
        {
            headers: {'content-type': 'application/json'},
            url: 'https://reqbin.com/echo/post/json',
            json: payload,
        }, function (error, response, body) {
            console.log('error', error);
            console.log('response', response);
            console.log('body', body);
            res.send(response);
        },
    );

    // axios.post('https://reqbin.com/echo/post/json', payload).then((response)=> {
    //     let result = {
    //         payload: payload,
    //         response: response.data
    //     }
    //     res.send(result);
    // }).catch((error)=> {
    //     console.log('error', error);
    // }).then(() => {
    //     console.log('final');
    // })


});


mediatorUtils.registerMediator(apiConf.api, mediatorConfig, (error) => {
    apiConf.api.urn = mediatorConfig.urn;

    mediatorUtils.fetchConfig(apiConf.api, (err, newConfig) => {
        console.info('Received initial config:', newConfig);
        config = newConfig;
        if (err) {
            console.info('Failed to fetch initial config');
            console.info(err.stack);
            process.exit(1);
        } else {
            console.info('Successfully registered mediator!');
            app.listen(PORT, () => {
                console.log(`Mediator Listening from ${PORT}...`);

                let configEmitter = mediatorUtils.activateHeartbeat(apiConf.api);
                configEmitter.on('error', (error) => {
                    console.error(error);
                    console.error('an error occured while trying to activate heartbeat');
                });
                configEmitter.on('config', (newConfig) => {
                    console.info('Received updated config:', newConfig);
                    // set new config for mediator
                    config = newConfig;
                });
            });
        }
    });
});

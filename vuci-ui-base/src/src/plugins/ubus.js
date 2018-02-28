/*
 * Copyright (C) 2017  Jianhui Zhao <jianhuizhao329@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios'

let _jsonrpcID = 1;
let _requests = [];

let ubusMsgStatus = [
    'Success',
    'Invalid command',
    'Invalid argument',
    'Method not found',
    'Not found',
    'No response',
    'Permission denied',
    'Request timed out',
    'Operation not supported',
    'Unknown error',
    'Connection failed'
];

function _callCB(msgs, resolve, reject) {
    if (!Array.isArray(msgs))
        msgs = [ msgs ];

    let data = [ ];

    for (let i = 0; i < msgs.length; i++) {
        let msg = msgs[i];
        if (typeof (msg) !== 'object' || msg.jsonrpc !== '2.0')
            throw 'ubus call error: Invalid msg';

        if (typeof (_requests[msg.id]) !== 'object')
            throw 'No related request for JSON response';
        delete _requests[msg.id];

        let result = msg.result;
        if (!result || !Array.isArray(result) || result.length < 1) {
            /* Access denied */
            if (msg.error && msg.error.code === -32002) {
                sessionStorage.removeItem('_ubus_rpc_session');
                reject(msg.error);
                return;
            }

            throw `ubus call error: ${JSON.stringify(msg.error) || 'unknown'}`
        }

        if (result[0] === 0) {
            data.push((result.length > 1) ? result[1] : result[0]);
        } else {
            let error = {code: result[0], message: ubusMsgStatus[result[0]] || ''};
            if (result[0] === 6) {
                sessionStorage.removeItem('_ubus_rpc_session');
                reject(error);
            } else {
                throw `ubus call error: ${JSON.stringify(error)}`
            }
            return;
        }
    }

    resolve((data.length > 1) ? data : data[0]);
}

function _call(batchs) {
    if (!Array.isArray(batchs))
        throw 'The parameter must be an array';

    let msgs = [];

    batchs.forEach((b) => {
        /* store request info */
        _requests[_jsonrpcID] = {};

        /* build message object */
        let msg = {
            jsonrpc: '2.0',
            id: _jsonrpcID++,
            method: 'call',
            params: [
                sessionStorage.getItem('_ubus_rpc_session') || '00000000000000000000000000000000',
                b.object,
                b.method,
                b.params || {}
            ]
        };

        msgs.push(msg);
    });

    return new Promise(function(resolve, reject) {
        axios.post('/ubus', msgs).then((r) => {
            _callCB(r.data, resolve, reject);
        });
    });
}

export function call(object, method, params) {
    return _call([{object, method, params}]);
}

export function callBatch(batchs) {
    return _call(batchs);
}

const ubus = {}

ubus.install = function (Vue, options) {
    if (ubus.installed)
        return;

    Vue.prototype.$ubus = {
        call: call,
        callBatch: callBatch
    }

    ubus.installed = true;
}

export default ubus

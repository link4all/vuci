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

import * as ubus from './ubus.js'

const session = {}

function isAlive() {
    return new Promise(function(resolve, reject) {
        ubus.call('session', 'access', {scope: 'ubus', object: 'session', function: 'access'}).then((r) => {
            resolve(r[0].access);
        }).catch((r) => {
            resolve(false);
        });
    });
}

function stopHeartbeat() {
    if (typeof session._hearbeatInterval !== 'undefined') {
        window.clearInterval(session._hearbeatInterval);
        delete session._hearbeatInterval;
    }
}

function startHeartbeat() {
    stopHeartbeat();

    session._hearbeatInterval = window.setInterval(() => {
        isAlive().then((alive) => {
            if (!alive) {
                stopHeartbeat();
                sessionStorage.removeItem('_ubus_rpc_session');
                window.location.href = '/';
            }
        });
    }, 15000);
}

function login(username, password) {
    return new Promise(function(resolve, reject) {
        ubus.call('session', 'login', {username: username, password: password}).then((r) => {
            if (r[0].ubus_rpc_session) {
                sessionStorage.setItem('_ubus_rpc_session', r[0].ubus_rpc_session);
                startHeartbeat();
                resolve(r);
            }
        }).catch((r) => {
            reject(r);
        });
    });
}

session.install = function (Vue, options) {
    if (session.installed)
        return;

    Vue.prototype.$session = {
        login: login,
        startHeartbeat: startHeartbeat
    }

    session.installed = true;
}

export default session

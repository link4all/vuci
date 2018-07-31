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

let state = {}

function load(config) {
  return new Promise(function(resolve, reject) {
    ubus.call('uci', 'get', {config: config}).then((r) => {
      state[config] = r.values;
      resolve(config);
    }).catch((r) => {
      reject(r);
    });
  });
}

function get(config, session, option) {
  let values = state[config];

  if (session) {
    values = values[session];
    if (option)
      return values[option];
  }
  return values;
}

const uci = {}

uci.install = function(Vue, options) {
  if (uci.installed)
    return;

  Vue.prototype.$uci = {
    load: load,
    get: get
  }

  uci.installed = true;
}

export default uci

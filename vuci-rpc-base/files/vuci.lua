#!/usr/bin/env lua

--[[
  Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
 
  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.
 
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.
 
  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
  USA
 --]]


local ubus = require "ubus"
local uloop = require "uloop"
local cjson = require "cjson"
local posix = require "posix"
local unistd = require "posix.unistd"

local RPC_VUCI_MENU_FILES = "/usr/share/vuci/menu.d/*.json"

uloop.init()

local conn = ubus.connect()
if not conn then
    error("Failed to connect to ubus")
end

local function load_json(path)
    local r = {}
    local f = io.open(path)
    if f then
        local data = f:read("*a")
        r = cjson.decode(data)
        f:close()
    end

    return r
end

local function menu_access(sid, acls)
    for _, v in ipairs(acls) do
        local r = conn:call("session", "access", {
                ubus_rpc_session = sid,
                scope = "access-group",
                object = v,
                ["function"] = "read"
            }) or {}
        if not r.access then
            return false
        end
    end

    return true
end

local function menu_files(files)
    for _, file in ipairs(files) do
        if unistd.access(file, "r") ~= 0 then
            return false
        end
    end
    return true
end

local ubus_codes = {
    ["INVALID_COMMAND"] = 1,
    ["INVALID_ARGUMENT"] = 2,
    ["METHOD_NOT_FOUND"] = 3,
    ["NOT_FOUND"] = 4,
    ["NO_DATA"] = 5,
    ["PERMISSION_DENIED"] = 6,
    ["TIMEOUT"] = 7,
    ["NOT_SUPPORTED"] = 8,
    ["UNKNOWN_ERROR"] = 9,
    ["CONNECTION_FAILED"] = 10
}

local methods = {
    ["vuci.ui2"] = {
        menu = {
            function(req, msg)
                if not msg["ubus_rpc_session"] then
                    return ubus_codes["INVALID_ARGUMENT"]
                end

                local menus = {}
                local sid = msg["ubus_rpc_session"]
                for _, path in pairs(posix.glob(RPC_VUCI_MENU_FILES)) do
                    local menu = load_json(path)
                    for name, entry in pairs(menu) do
                        local access, files = true, true
                        for k, v in pairs(entry) do
                            if k == "acls" then
                                access = menu_access(sid, v)
                            elseif k == "files" then
                                files = menu_files(v)
                            end
                        end
                        if access and files then
                            menus[name] = entry
                        end
                    end
                end

                conn:reply(req, {menu = menus})
            end, {ubus_rpc_session = ubus.STRING}
        }
    }
}

conn:add(methods)

uloop.run()
/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
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
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Minimal logger to make things look prettier
function _log(level: "log" | "error" | "warn" | "info" | "debug", args: any[]) {
    console[level](
        `%c GoofCord `,
        `background: #5865f2; color: black; font-weight: bold; border-radius: 5px;`,
        "",
        ...args
    );
}

export function log(...args: any[]) {
    _log("log", args);
}

export function error(...args: any[]) {
    _log("error", args);
}

export function warn(...args: any[]) {
    _log("warn",  args);
}
// MIT © 2017 azu
"use strict";
const debug = require("debug")("textlint-app:PackageManger");
const remote = require("electron").remote;
const ServerPackageManager = remote.require("textlint-server-package-manager");
export default class PackageManger {
    /**
     * @param {Workspace} workspace
     */
    static install(workspace) {
        /**
         * @type {TextlintPackageManger}
         */
        const manager = new ServerPackageManager(workspace.directory);
        debug("Installing from ", manager.textlintrcFilePath);
        return manager.install(workspace.textlintrc.textValue);
    }

    /**
     * @param {string} directory
     * @returns {Promise.<{content:string, filePath:string}>}
     */
    static getTextlinrc(directory) {
        const manager = new ServerPackageManager(directory);
        return manager.getTextlintrc().then(content => {
            return {
                content,
                filePath: manager.textlintrcFilePath
            };
        });
    }

    /**
     * Check integrity between .textlintrc and installed module
     * @param {string} directory
     * @returns {Promise.<Boolean>}
     */
    static checkIntegrity(directory) {
        /**
         * @type {TextlintPackageManger}
         */
        const manager = new ServerPackageManager(directory);
        return manager.checkIntegrity();
    }
}

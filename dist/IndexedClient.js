"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = require("./Db");
exports.IndexedClient = class IndexedClient {
    constructor(dbname) {
    }
    close(force) {
        return Promise.resolve(this.db.close());
    }
    static connect(name, options) {
        // If the version is not provided and the database exists, then a connection to the database will be opened without changing its version. If the version is not provided and the database does not exist, then it will be created with version 1.
        const client = new IndexedClient(name);
        return Db_1.Db.open(name).then(db => {
            client.db = db;
            return client;
        });
    }
};
//# sourceMappingURL=IndexedClient.js.map
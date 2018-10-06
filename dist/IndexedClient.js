"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = require("./Db");
class IndexedClient {
    static connect(name, options) {
        // If the version is not provided and the database exists, then a connection to the database will be opened without changing its version. If the version is not provided and the database does not exist, then it will be created with version 1.
        return Db_1.Db.open(name);
    }
}
exports.IndexedClient = IndexedClient;
//# sourceMappingURL=IndexedClient.js.map
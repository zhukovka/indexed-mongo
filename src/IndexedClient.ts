import {Db} from "./Db";

export interface IndexedClientOptions {
}

export class IndexedClient {

    static connect (name: string, options?: IndexedClientOptions): Promise<Db> {
        // If the version is not provided and the database exists, then a connection to the database will be opened without changing its version. If the version is not provided and the database does not exist, then it will be created with version 1.
        return Db.open(name);
    }

}
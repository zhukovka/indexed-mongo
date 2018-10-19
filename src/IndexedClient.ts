import {Db, IDb} from "./Db";

export interface IndexedClientOptions {
    collections?: string[]
}

export interface IndexedMongoClientOptions {

}

export interface IndexedMongoClientStatic {
    //static connect(uri: string, options?: MongoClientOptions): Promise<MongoClient>;
    connect (uri: string, options?: IndexedMongoClientOptions): Promise<IndexedMongoClient>
}

export interface IndexedMongoClient {
    db (dbname: string): IDb;
    close (force?: boolean): Promise<void>;
}

export const IndexedClient: IndexedMongoClientStatic = class IndexedClient implements IndexedMongoClient {
    private _db: Db;

    public db (dbname: string): IDb {
        return this._db;
    };

    close (force?: boolean): Promise<void> {
        return Promise.resolve(this._db.close());
    }

    static connect (name: string, options?: IndexedClientOptions): Promise<IndexedMongoClient> {
        // If the version is not provided and the database exists, then a connection to the database will be opened without changing its version. If the version is not provided and the database does not exist, then it will be created with version 1.
        const client = new IndexedClient();
        return Db.open(name).then(db => {
            client._db = db;
            return client as IndexedMongoClient;
        });
    }

};
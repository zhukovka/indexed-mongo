## IndexedDB

[IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

IndexedDB is a way for you to persistently store data inside a user's browser. Because it lets you create web applications with rich query abilities regardless of network availability, these applications can work both online and offline.

## Basic pattern

The basic pattern that IndexedDB encourages is the following:

### Open a database.

| IndexedDB        | Mongo           | Indexed-mongo  |
| ---------------- | --------------- | -------------- |
| indexedDB.open(name: string, version:number)| static MongoClient.connect(uri: string, options?: MongoClientOptions): Promise<MongoClient>   | static IndexedClient.connect(name: string, options?: IndexedClientOptions): Promise<MongoClient>          |

---

### Create an object store in the database.

| IndexedDB        | Mongo           | Indexed-mongo  |
| ---------------- | --------------- | -------------- |
| onupgradeneeded: ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any) \| null; | Db.createCollection<TSchema = Default>(name: string, options?: CollectionCreateOptions): Promise<Collection<TSchema>>; | Db.createCollection<TSchema>(name: string, options?: CollectionCreateOptions): Promise<Collection<TSchema>>;


- Start a transaction and make a request to do some database operation, like adding or retrieving data.

| IndexedDB        | Mongo           | Indexed-mongo  |
| ---------------- | --------------- | -------------- |
|IDBObjectStore.add(value: any, key?: IDBValidKey \| IDBKeyRange): IDBRequest | insertOne(docs: Object, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>; | insertOne(docs: Object, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;

- Wait for the operation to complete by listening to the right kind of DOM event.

- Do something with the results (which can be found on the request object).

- IndexedDB
```
var DBOpenRequest = window.indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened
// successfully, or not
DBOpenRequest.onerror = function(event) {
};

DBOpenRequest.onsuccess = function(event) {
  // store the result of opening the database in the db
  // variable. This is used a lot later on, for opening
  // transactions and suchlike.
  db = DBOpenRequest.result;
};
```

- MongoDB
```
MongoClient.connect(url, function(err, db) {
  // Create a collection
  db.createCollection("a_simple_collection").then(function(collection) {
     // Insert a document in the collection
     collection.insertOne({a:1}).then(function(r) {
        // Finish up test
     });
  });
});
```

- IndexedMongo
```
IndexedClient.connect(name).then(function(db) {
  // Create a collection
  db.createCollection("a_simple_collection").then(function(collection) {
     // Insert a document in the collection
     collection.insertOne({a:1}).then(function(r) {
        // Finish up test
     });
  });
});
```
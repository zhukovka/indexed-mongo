describe('IndexedMongo load', () => {
    beforeAll(async () => {
        await page.goto('file:///Users/lenka/Documents/indexed-mongo/test/index.html', {waitUntil: 'load'})
    });

    it('should recognize IndexedMongo variable', async () => {
        const indexedMongo = await page.evaluate(() => {
            return IndexedMongo;
        });
        expect(indexedMongo).toBeDefined()
    });
    it('should connect to Indexed DB', async () => {
        const version = await page.evaluate(async () => {
            const client = await IndexedMongo.IndexedClient.connect("example");
            const db = client.db;
            return db.version;
        });
        console.log("v", version);
        expect(version).toEqual(1);
    });
    it('should add documents to IndexedDB store', async () => {
        const testDoc = {_id: "a", a: 1};
        const result = await page.evaluate(async () => {
            const client = await IndexedMongo.IndexedClient.connect("example");
            const db = client.db;
            const collection = await db.createCollection("a_simple_collection", {keyPath: "_id"});
            return collection.insertOne(testDoc);
        });
        console.log("a_simple_collection", result);
        expect(result.insertedCount).toEqual(1);
        expect(result.insertedId).toEqual(testDoc._id);
    });

});

describe('Indexed Mongo a_simple_collection test', () => {
    const testDoc = {_id: "a", a: 1};
    beforeAll(async () => {
        await page.goto('file:///Users/lenka/Documents/indexed-mongo/test/index.html', {waitUntil: 'load'});
        await page.evaluate(async (testDoc) => {
            const client = await IndexedMongo.IndexedClient.connect("example");
            const db = client.db;
            const collection = await db.createCollection("a_simple_collection", {keyPath: "_id"});
            return collection.insertOne(testDoc);
        }, testDoc);
    });

    it('should find document in the collection', async () => {
        const docs = page.evaluate(async (testDoc) => {
            const client = await IndexedMongo.IndexedClient.connect("example");
            const db = client.db;
            const collection = await db.createCollection("a_simple_collection", {keyPath: "_id"});
            const docs = await collection.find({_id: "a"}).toArray();
            return collection.insertOne(testDoc);
        }, testDoc);
        expect(docs).toHaveLength(1);
    });

});
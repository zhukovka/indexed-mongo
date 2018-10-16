# MongoDB Interface for IndexedDB

## Collection delete

- Mongo

`deleteMany(filter, options, callback){Promise}`
lib/collection.js, line 896
Delete multiple documents from a collection

The following operation deletes all of the documents in the specified inventory collection with status equal to A:

```
db.collection('inventory').deleteMany({
  status: "A"
})
.then(function(result) {
  // process result
})
```

`deleteOne(filter, options, callback){Promise}`
lib/collection.js, line 869
Delete a single document.
The following operation deletes the **first** document with status equal to D:

Example:

```
db.collection('inventory').deleteOne({
  status: "D"
})
.then(function(result) {
  // process result
})
```

The operation returns a promise that provides a result. The result.deletedCount property contains the number of documents that matched the filter.

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1636713223",
    "hidden": false,
    "id": "relation2072370017",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "speaker",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // remove field
  collection.fields.removeById("relation2072370017")

  return app.save(collection)
})

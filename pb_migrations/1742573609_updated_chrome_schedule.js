/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_588826678",
    "hidden": false,
    "id": "relation2991306716",
    "maxSelect": 999,
    "minSelect": 1,
    "name": "chrome",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_588826678",
    "hidden": false,
    "id": "relation2991306716",
    "maxSelect": 999,
    "minSelect": 1,
    "name": "chromes",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})

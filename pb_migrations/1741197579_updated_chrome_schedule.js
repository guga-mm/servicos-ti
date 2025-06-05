/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_233839710",
    "hidden": false,
    "id": "relation1499115060",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "grade",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2478702895",
    "hidden": false,
    "id": "relation3981121951",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "class",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // remove field
  collection.fields.removeById("relation1499115060")

  // remove field
  collection.fields.removeById("relation3981121951")

  // remove field
  collection.fields.removeById("relation2991306716")

  return app.save(collection)
})

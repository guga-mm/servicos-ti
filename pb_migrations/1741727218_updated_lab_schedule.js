/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_36184059842")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2691397795",
    "hidden": false,
    "id": "relation1641460164",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lab",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_36184059842")

  // remove field
  collection.fields.removeById("relation1641460164")

  return app.save(collection)
})

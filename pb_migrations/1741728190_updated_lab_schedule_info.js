/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2691397795",
    "hidden": false,
    "id": "relation1641460164",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "lab",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // remove field
  collection.fields.removeById("relation1641460164")

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool1865031573",
    "name": "late",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // remove field
  collection.fields.removeById("bool1865031573")

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool394871773",
    "name": "occupied",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // remove field
  collection.fields.removeById("bool394871773")

  return app.save(collection)
})

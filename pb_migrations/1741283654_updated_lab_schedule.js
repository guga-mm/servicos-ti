/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_36184059842")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool577945136",
    "name": "returned",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_36184059842")

  // remove field
  collection.fields.removeById("bool577945136")

  return app.save(collection)
})

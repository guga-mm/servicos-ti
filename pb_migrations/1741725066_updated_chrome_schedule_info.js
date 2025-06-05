/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "select2824319936",
    "maxSelect": 1,
    "name": "repeat",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "norepeat",
      "everyday",
      "weekly"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // remove field
  collection.fields.removeById("select2824319936")

  return app.save(collection)
})

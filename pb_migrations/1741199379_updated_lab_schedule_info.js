/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // remove field
  collection.fields.removeById("date2862495610")

  // remove field
  collection.fields.removeById("date2985325764")

  // remove field
  collection.fields.removeById("select2824319936")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2985325764",
    "max": "",
    "min": "",
    "name": "date_end",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
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
})

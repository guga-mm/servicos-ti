/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // remove field
  collection.fields.removeById("date2220669758")

  // remove field
  collection.fields.removeById("select2824319936")

  // remove field
  collection.fields.removeById("relation564065238")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2220669758",
    "max": "",
    "min": "",
    "name": "end_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select2824319936",
    "maxSelect": 1,
    "name": "repeat",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "norepeat",
      "everyday",
      "weekly"
    ]
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1169495374",
    "hidden": false,
    "id": "relation564065238",
    "maxSelect": 7,
    "minSelect": 1,
    "name": "week_days",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})

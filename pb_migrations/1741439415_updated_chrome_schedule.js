/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // remove field
  collection.fields.removeById("select564065238")

  // add field
  collection.fields.addAt(9, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select564065238",
    "maxSelect": 7,
    "name": "week_days",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ]
  }))

  // remove field
  collection.fields.removeById("relation564065238")

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update field
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update field
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
      "mon",
      "tue",
      "wed",
      "thu",
      "fri",
      "sat",
      "sun"
    ]
  }))

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2675529103",
    "max": "",
    "min": "",
    "name": "start",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1345189255",
    "max": 0,
    "min": 0,
    "name": "start_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1096160257",
    "max": 0,
    "min": 0,
    "name": "end_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(9, new Field({
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2675529103",
    "max": "",
    "min": "",
    "name": "start",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1345189255",
    "max": 0,
    "min": 0,
    "name": "start_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1096160257",
    "max": 0,
    "min": 0,
    "name": "end_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
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
})

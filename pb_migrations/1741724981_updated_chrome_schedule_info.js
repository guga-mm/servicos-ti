/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // add field
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

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "date16528305",
    "max": "",
    "min": "",
    "name": "end",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
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

  // add field
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

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1169495374",
    "hidden": false,
    "id": "relation2824319936",
    "maxSelect": 7,
    "minSelect": 0,
    "name": "repeat",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // remove field
  collection.fields.removeById("date2675529103")

  // remove field
  collection.fields.removeById("date16528305")

  // remove field
  collection.fields.removeById("text1345189255")

  // remove field
  collection.fields.removeById("text1096160257")

  // remove field
  collection.fields.removeById("relation2824319936")

  return app.save(collection)
})

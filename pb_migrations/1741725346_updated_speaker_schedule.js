/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_32413567722")

  // remove field
  collection.fields.removeById("text1345189255")

  // remove field
  collection.fields.removeById("text1096160257")

  // remove field
  collection.fields.removeById("select2824319936")

  // remove field
  collection.fields.removeById("relation564065238")

  // remove field
  collection.fields.removeById("relation2072370017")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "start",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2220669758",
    "max": "",
    "min": "",
    "name": "end",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_32413567722")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1345189255",
    "max": 0,
    "min": 0,
    "name": "start_time",
    "pattern": "^(?:[01]\\d|2[0-3]):[0-5]\\d$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1096160257",
    "max": 0,
    "min": 0,
    "name": "end_time",
    "pattern": "^(?:[01]\\d|2[0-3]):[0-5]\\d$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
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

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1636713223",
    "hidden": false,
    "id": "relation2072370017",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "speaker",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // update field
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

  return app.save(collection)
})

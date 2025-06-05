/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update field
  collection.fields.addAt(0, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3208210256",
    "max": 3,
    "min": 1,
    "name": "id",
    "pattern": "^[0-9]+$",
    "presentable": false,
    "primaryKey": true,
    "required": true,
    "system": true,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update field
  collection.fields.addAt(0, new Field({
    "autogeneratePattern": "[0-9]{1,3}",
    "hidden": false,
    "id": "text3208210256",
    "max": 3,
    "min": 1,
    "name": "id",
    "pattern": "^[0-9]+$",
    "presentable": false,
    "primaryKey": true,
    "required": true,
    "system": true,
    "type": "text"
  }))

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "listRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id",
    "listRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
})

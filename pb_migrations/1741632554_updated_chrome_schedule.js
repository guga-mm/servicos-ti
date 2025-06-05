/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.admin = true",
    "updateRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_39474458802")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.isAdmin = true",
    "updateRule": "@request.auth.isAdmin = true"
  }, collection)

  return app.save(collection)
})

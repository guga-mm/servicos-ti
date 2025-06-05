/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.isAdmin = true",
    "listRule": "@request.auth.isAdmin = true || @request.auth.id = user",
    "updateRule": "@request.auth.isAdmin = true",
    "viewRule": "@request.auth.isAdmin = true || @request.auth.id = user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.admin = true",
    "listRule": "@request.auth.admin = true || @request.auth.id = user",
    "updateRule": "@request.auth.admin = true",
    "viewRule": "@request.auth.admin = true || @request.auth.id = user"
  }, collection)

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.admin = true",
    "deleteRule": "@request.auth.admin = true",
    "updateRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.isAdmin = true",
    "deleteRule": "@request.auth.isAdmin = true",
    "updateRule": "@request.auth.isAdmin = true"
  }, collection)

  return app.save(collection)
})

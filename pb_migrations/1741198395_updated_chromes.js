/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.admin = true",
    "deleteRule": "@request.auth.admin = true",
    "updateRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
})

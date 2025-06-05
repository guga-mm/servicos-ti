/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
})

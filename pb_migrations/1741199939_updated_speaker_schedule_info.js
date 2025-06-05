/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.admin = true || @request.auth.id = user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
})

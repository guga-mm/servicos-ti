/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.admin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id"
  }, collection)

  return app.save(collection)
})

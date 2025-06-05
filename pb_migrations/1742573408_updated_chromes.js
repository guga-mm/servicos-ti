/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update collection data
  unmarshal({
    "name": "chrome"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_588826678")

  // update collection data
  unmarshal({
    "name": "chromes"
  }, collection)

  return app.save(collection)
})

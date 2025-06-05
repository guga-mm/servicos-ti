/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // update collection data
  unmarshal({
    "name": "speaker"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1636713223")

  // update collection data
  unmarshal({
    "name": "speakers"
  }, collection)

  return app.save(collection)
})

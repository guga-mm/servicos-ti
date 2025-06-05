/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // update collection data
  unmarshal({
    "name": "lab_schedule_info"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3618405984")

  // update collection data
  unmarshal({
    "name": "lab_schedule"
  }, collection)

  return app.save(collection)
})

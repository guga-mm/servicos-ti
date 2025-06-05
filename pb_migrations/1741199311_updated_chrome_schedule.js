/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // update collection data
  unmarshal({
    "name": "chrome_schedule_info"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3947445880")

  // update collection data
  unmarshal({
    "name": "chrome_schedule"
  }, collection)

  return app.save(collection)
})

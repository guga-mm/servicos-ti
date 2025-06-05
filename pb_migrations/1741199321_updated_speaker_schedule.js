/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "name": "speaker_schedule_info"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3241356772")

  // update collection data
  unmarshal({
    "name": "speaker_schedule"
  }, collection)

  return app.save(collection)
})

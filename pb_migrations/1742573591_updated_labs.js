/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "name": "lab"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2691397795")

  // update collection data
  unmarshal({
    "name": "labs"
  }, collection)

  return app.save(collection)
})

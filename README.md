# GoogleCloudAIInActionFrontend
Google Cloud AI In Action Frontend


Import data into mongodb
```
mongoimport --uri='mongodb://<DB_USER>:<DB_PASSWORD>@0.0.0.0:<CONTAINER_PORT>/<DB_NAME>' \
  --collection <COLLECTION_NAME> \
  --type json \
  --file <PATH_TO_DATA>
```

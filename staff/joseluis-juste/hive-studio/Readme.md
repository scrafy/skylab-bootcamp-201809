# Hive Studio

## DOCS
[Use Case](./docs/Readme.md)
## Deploy
In order to prepare the environment to run the app, first, we have setup the values in .env files in order to connect to servers correclty.


In order to launch the Application we will have to run these commands:

### Execute DB migrations
```javascript
adonis migration:run
```

### For launch the REST API
```javascript
adonis serve 
```

### For launch the Socket Server
```javascript
PORT=4000 node server.js
```

### NEUEnergy

using fossa for connecting backbone to mongo
the collection and model definitions are set to be the same as the mongo database meaning buildingdb, sitedb, and so on...

### generating with yo
example of using yo for generating backbone models, collections, views and so on: 'yo backbone:model building`

### setting up the development environment

You could use [Homebrew](http://brew.sh) to install npm.

make sure you have installed npm. If using *NIX machines you can use [Homebrew](http://brew.sh):
```
brew install npm
```
install yo with:
```
npm install -g yo
```
install bower with:
```
npm install -g bower
```

install the yo's library generator with:
```
npm install -g generator-lib
```
you can use `npm` to install [GRUNT](http://gruntjs.com/getting-started):
```
npm install -g grunt-cli
```

fork and clone the repo to your local and cd into it.

install the packeges:
```
npm install
```
and then
```
bower install
``` 

run the grunt tasks with:
```
grunt
```

in case of errors use:
```
grunt --force
```

make sure that the mongodb database is in the project folder, then start the database:
```
mongod --dbpath data/db --port 27016 --rest
```

if the mongodb instance already running you could shutdown server using the mongo shell:
```
mongo --port 27016
```

inside the mongo shell run:
```
use admin
db.shutdownServer()
```

start the express server with node:
```
node server.js
```

start the backbone MVC with:
```
grunt serve
```

the app should be running on http://localhost:9000

if the grunt plugins are not installed you can run `npm install` when cd'd in the project directory.



### example for the weather undergound api
http://api.wunderground.com/api/{api_key_here}/history_20110405/q/MA/Boston.json

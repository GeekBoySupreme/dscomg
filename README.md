# DevFest 2018 Kuala Lumpur PWA

Serve:

`preact watch --template src/template.html`


Build: 

`preact build --template src/template.html --prerenderUrls src/prerender-urls.json --service-worker false`

Set Google Cloud Project:

`gcloud config set project <project-id>`

Deploy: 

`gcloud app deploy devfest.yaml -v 1`
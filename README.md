# DevFest 2018 Kuala Lumpur PWA

Serve:

`preact watch --template src/template.html`


Build: 

`preact build --template src/template.html --prerenderUrls src/prerender-urls.json --service-worker false`


Deploy: 

`gcloud app deploy io.yaml -v 1`
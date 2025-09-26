# Jira Project Assistant #

This manual can help you install and deploy this app to your atlassian site.

### Quick start

* Go to ./forge directory and install dependencies by `npm install`

```
npm install
```

* Go to ./static directory and install dependencies by `npm install`

```
npm install
```

* Register app by running:

```
forge register
```

* Build and deploy app by running:

```
forge deploy
```

* Install your app in an Atlassian site by running:

```
forge install
```

* Develop your app by running `forge tunnel` to proxy invocations locally:

```
forge tunnel
```


### With Docker (not working)

* Install Docker and docker-compsoe on your machine

* Go to ./docker directory and create .env file with the next variables:

```
ATLASSIAN_SITE="your-site.atlassian.net"
ATLASSIAN_PRODUCT="jira"
FORGE_TOKEN="YOUR_API_TOKEN"
FORGE_EMAIL="your-email@example.com"
```

* Build container by running:

```
docker-compose up -d --build
```

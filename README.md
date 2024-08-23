# Simple Node.js Example

## Run locally

Firstly, install the packages, which is one-off thing:

```sh
npm install
```

Then, start it up:

```sh
npm start
```

Then we can access it through: http:<IP>:3000.

Or, if you want to use a custom port, do this:

```sh
PORT=8080 npm start
```


## Build Docker Image

```sh
export REPO_NAMESPACE=brightzheng100/nodejs-example

docker buildx create --name mybuilder
docker buildx use mybuilder

docker buildx inspect --bootstrap

docker buildx build --push \
  --platform linux/arm64,linux/amd64 \
  --tag ${REPO_NAMESPACE}:latest \
  .
```


## Deploy on K8s

```sh
export REPO_NAMESPACE=brightzheng100/nodejs-example

kubectl create ns demo
envsubst < k8s.yaml | kubectl apply -f - -n demo
```

To generate some load, run this:

```sh
CLUSTER_IP="`kubectl get service/nodejs-example -n demo -o jsonpath='{.spec.clusterIP}'`"
while true; do curl http://${CLUSTER_IP}:3000/ping; curl http://${CLUSTER_IP}:3000/random; sleep 1; done 
```

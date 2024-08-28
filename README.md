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

## When monitored by IBM Instana

IBM Instana offers great support for Node.js apps without any code changes.

The typical steps might look like:
1. Install the Instana agent's Node.js collector into your app, which will be automatically handled with webhook when you're with Kubernetes/OpenShift: `npm install --save @instana/collector`.
2. Export the `NODE_OPTIONS`, like: `NODE_OPTIONS="--require ./node_modules/@instana/collector/src/immediate"`.
3. Optionally, define a friendly service name, which will be discovered and displayed on UI, say `INSTANA_SERVICE_NAME=my-simple-nodejs-app`.
4. Optionally, enable `INSTANA_DEBUG=true` to output verbose instrumentation / tracing info, which helps when you're trying to learn more.

So the run command may look like this: 

```sh
$ nohup bash -c "NODE_OPTIONS='--require ./node_modules/@instana/collector/src/immediate' INSTANA_SERVICE_NAME=my-cool-nodejs-app INSTANA_DEBUG=true PORT=8080 npm start" &> app.out & echo $! > app.pid
```

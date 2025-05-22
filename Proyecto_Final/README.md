# Proyecto Final – Arquitectura de Microservicios

Esta plantilla incluye tres microservicios (autenticación, catálogo y pedidos) listos para ejecutarse en Docker y Kubernetes con CI/CD en GitHub Actions.

## Prueba local

```bash
docker-compose up --build
```

- Auth: http://localhost:3001/login
- Catálogo: http://localhost:3002/products
- Pedidos: http://localhost:3003/orders

## Despliegue en Kubernetes

```bash
# Crear cluster local
minikube start --memory 4g

# Aplicar manifiestos
kubectl apply -f k8s/

# Añade al hosts
echo "$(minikube ip) micro.final.local" | sudo tee -a /etc/hosts
```

Después accede a `http://micro.final.local/auth/login`, `.../catalog/products`, etc.

## CI/CD

Los workflows en `.github/workflows/ci-cd.yml` construyen y despliegan las imágenes en cada push a `main`.

Recuerda configurar los secretos: `REGISTRY`, `REGISTRY_USER`, `REGISTRY_PASSWORD`, `KUBE_CONFIG_DATA`.

## Ingeniería del caos

Integra Chaos Mesh para inyectar fallos:

```bash
kubectl apply -f https://raw.githubusercontent.com/chaos-mesh/chaos-mesh/master/manifests/crd.yaml
# Ejemplo PodChaos ...
```

---
Plantilla académica. Personalízala según tus necesidades.

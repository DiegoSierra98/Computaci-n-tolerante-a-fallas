# Proyecto Microservicios – Ejemplo

Este repositorio contiene una aplicación de **microservicios** de ejemplo dividida en tres servicios:
- **auth-service**: Autenticación con JWT.
- **catalog-service**: Catálogo de productos.
- **order-service**: Gestión de pedidos.

Cada servicio se ejecuta de manera independiente con **Node.js + Express** y se empaqueta en un contenedor **Docker**.

## Ejecución local con Docker Compose

```bash
docker-compose up --build
```

- Autenticación: <http://localhost:3001/login>
- Catálogo: <http://localhost:3002/products>
- Pedidos: <http://localhost:3003/orders>

## Despliegue en Kubernetes (Minikube)

1. Inicia tu clúster:

```bash
minikube start --memory 4g
```

2. Aplica los manifiestos:

```bash
kubectl apply -f k8s/
```

3. Habilita el Ingress de Minikube y añade `micro.local` a tu `/etc/hosts`:

```bash
minikube addons enable ingress
echo "$(minikube ip) micro.local" | sudo tee -a /etc/hosts
```

Accede luego a <http://micro.local/api/catalog/products>.

## CI/CD

- El workflow de GitHub Actions (`.github/workflows/ci-cd.yaml`) compila las imágenes Docker,
  las publica en un registro y despliega los YAML en tu clúster.

### Secretos requeridos

- `REGISTRY`, `REGISTRY_USER`, `REGISTRY_PASSWORD`
- `KUBE_CONFIG_DATA` (contenido base64 del kubeconfig)

## Seguridad

- Las APIs usan **JWT** (`auth-service`) para firmar y verificar tokens.
- Comunicación cifrada posible mediante mTLS con Istio (no incluido por defecto).

## Ingeniería del Caos

Para probar resiliencia, se puede instalar **Chaos Mesh** y aplicar un experimento `PodChaos`
que mate aleatoriamente réplicas de `catalog-service`.

```bash
# ejemplo de Chaos Mesh (no incluido):
kubectl apply -f chaos/catalog-pod-kill.yaml
```

---
> Proyecto generado como plantilla académica. Personalízalo según tu flujo de trabajo.

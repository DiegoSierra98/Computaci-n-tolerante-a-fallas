# IntroDockerApp

Pequeño proyecto demostrativo para la tarea de Docker. Incluye:

1. **node-service** – microservicio Node.js (Express) que responde “Welcome to my awesome app!” en `/`.
2. **nginx** – contenedor Nginx 1.23 que actúa como proxy inverso hacia *node-service*.
3. **docker-compose.yml** – orquestra ambos servicios y expone Nginx en `localhost:9090`.

## Requisitos

- Docker Desktop instalado → <https://www.docker.com/products/docker-desktop/>
- (Opcional) Docker Compose v2 (ya viene con Docker Desktop).

## Cómo construir y ejecutar

```bash
# Clona el repo y entra al directorio
docker compose build        # compila imágenes node-service y nginx
docker compose up -d        # levanta ambos contenedores en segundo plano
```

Abre tu navegador en **http://localhost:9090** y verás el mensaje.

Para inspeccionar:

```bash
docker ps              # contenedores corriendo
docker logs mi-web-app # registros de Nginx
docker images          # imágenes locales
```

Para detener todo:

```bash
docker compose down
```

## Qué demuestra

- Uso de `docker build`, `docker run`, `docker ps`, `docker logs`, `docker stop`.
- Descarga de imágenes oficiales (`nginx:1.23`, `node:19-alpine`) con `docker pull`.
- Exponer puertos (`-p 9090:80`).
- Nombrar contenedores (`--name mi-web-app`).
- **Microservicios**: dos contenedores comunicándose internamente.

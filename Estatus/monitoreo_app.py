
import threading
import time
import random
from multiprocessing import Process

# Función que simula el monitoreo de la aplicación
def monitor_estado():
    while True:
        estado = random.choice(['Todo funcionando', 'Error detectado', 'Reiniciando'])
        print(f"Estado de la aplicación: {estado}")
        time.sleep(5)

# Función para simulación de una tarea intensiva
def tarea_intensiva():
    while True:
        print("Realizando tarea intensiva...")
        time.sleep(10)

def main():
    # Crear un hilo para monitorear el estado
    monitor_thread = threading.Thread(target=monitor_estado)
    monitor_thread.daemon = True  # Hilo en segundo plano, se cierra al finalizar el programa
    monitor_thread.start()

    # Crear un proceso para la tarea intensiva
    tarea_process = Process(target=tarea_intensiva)
    tarea_process.start()

    # El programa principal sigue corriendo mientras los hilos y procesos están en ejecución
    try:
        while True:
            time.sleep(1)  # Mantener el programa principal en ejecución
    except KeyboardInterrupt:
        print("Programa detenido por el usuario")

if __name__ == "__main__":
    main()

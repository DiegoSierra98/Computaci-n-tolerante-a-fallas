import sentry_sdk 
# Configurar Sentry con el DSN de tu proyecto 
sentry_sdk.init( 
dsn="https://ejemploPublicKey@o0.ingest.sentry.io/123456", 
traces_sample_rate=1.0 
) 
# Función que genera un error 
def dividir_por_cero(): 
try: 
resultado = 1 / 0 
except ZeroDivisionError as e: 
sentry_sdk.capture_exception(e) 
print("Se ha registrado un error en Sentry") 
# Llamar a la función con error 
dividir_por_cero() 
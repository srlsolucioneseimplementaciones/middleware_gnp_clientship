const templates = [
    {
        "nombre": "gps_cobertura",
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además es indispensable para el pago de la cobertura por robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza. Para instalar y activar el dispositivo, es necesario programar una cita con {{Proveedor}}, nuestro proveedor autorizado, agenda tu cita ahora."
    },
    {
        "nombre": "gps_deducible", 
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza. Para instalar y activar el dispositivo, es necesario programar una cita con Proveedor, nuestro {{proveedor}} autorizado, agenda tu cita ahora."
    },
    {
        "nombre": "gps_cobertura_recordatorio_4", 
        "text": "Buen día {{nombre_cliente}}, ⏰ Recuerda concluir con el proceso de agendar tu cita para la instalación de tu dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🤔 ¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las posibilidades de localizarlo, además es indispensable para el pago de la cobertura robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza."
    },
    {
        "nombre": "gps_deducible_recordatorio_4", 
        "text": "Buen día {{nombre_cliente}}, ⏰ Recuerda concluir con el proceso de agendar tu cita para la instalación de tu dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🤔 ¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza."
    }
]

module.exports = { templates }
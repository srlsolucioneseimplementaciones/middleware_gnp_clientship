const templates = [
    {
        "nombre": "gps_cobertura",
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además es indispensable para el pago de la cobertura por robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza. Para instalar y activar el dispositivo, es necesario programar una cita con {{Proveedor}}, nuestro proveedor autorizado, agenda tu cita ahora."
    },
    {
        "nombre": "gps_deducible", 
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza. Para instalar y activar el dispositivo, es necesario programar una cita con {{Proveedor}}, nuestro proveedor autorizado, agenda tu cita ahora."
    },
    {
        "nombre": "gps_cobertura_recordatorio_4", 
        "text": "Buen día {{nombre_cliente}}, ⏰ Recuerda concluir con el proceso de agendar tu cita para la instalación de tu dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🤔 ¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las posibilidades de localizarlo, además es indispensable para el pago de la cobertura robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza."
    },
    {
        "nombre": "gps_deducible_recordatorio_4", 
        "text": "Buen día {{nombre_cliente}}, ⏰ Recuerda concluir con el proceso de agendar tu cita para la instalación de tu dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🤔 ¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza."
    },
    {
        "nombre": "gps_cobertura_version_2",
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además es indispensable para el pago de la cobertura por robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza. Para instalar y activar el dispositivo, es necesario programar una cita con {{Proveedor}}, nuestro proveedor autorizado, agenda tu cita ahora."
    },
    {
        "nombre": "gps_deducible_version2", 
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo y a domicilio de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza. Para la instalación y activación de tu dispositivo, es necesario programar una cita connuestro proveedor autorizado {{Proveedor}}. Puedes hacerlo de dos maneras: dando clic en Agendar cita o llamando al 55 5337 0900 en la opción 2 para solicitar la programación de tu cita."
    },
    {
        "nombre": "gps_cobertura_octubre",
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo y a domicilio de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además es indispensable para el pago de la cobertura por robo total de tu Póliza, podrás consultar más detalles en la sección observaciones de tu Póliza. Para la instalación y activación de tu dispositivo, es necesario programar una cita con nuestro autorizado {{Proveedor}}. Puedes hacerlo de dos maneras: dando clic en Agendar cita o llamando al 555337 0900 en la opción 2 para solicitar la programación de tu cita."
    },
    {
        "nombre": "gps_deducible_octubre", 
        "text": "Buen día {{nombre_cliente}}, te escribo de GNP Seguros. Tu Póliza de Seguro de Auto GNP te brinda la instalación sin costo y a domicilio de un dispositivo de localización para tu {{marca}} {{modelo}} con número de serie {{numero_serie}}. 🔎¿Por qué debes instalar y activar el dispositivo? Con la instalación y activación del dispositivo, tu vehículo está más protegido, en caso de robo se incrementan las probabilidades de localizarlo, además, de acuerdo a tu Póliza es indispensable para evitar variaciones en el porcentaje de tu deducible por robo total, podrás consultar más detalles en la sección observaciones de tu Póliza. Para la instalación y activación de tu dispositivo, es necesario programar una cita con nuestro proveedor autorizado {{Proveedor}}. Puedes hacerlo de dos maneras: dando clic en Agendar cita o llamando al 55 5337 0900 en la opción 2 para solicitar la programación de tu cita."
    },
    {
        "nombre": "gps_encuesta", 
        "text": "Apreciable {{nombre_cliente}}, Para nosotros usted es muy importante y por ello nos gustaría conocer su experiencia con la gestión de la instalación del dispositivo de localización de su vehículo {{marca}} {{modelo}}. Le tomará 3 minutos contestar la siguiente encuesta, por favor dar clic en el enlace 👇 {{liga_encuesta}} Agradecemos su tiempo y valoramos su opinion."
    }
]

module.exports = { templates }

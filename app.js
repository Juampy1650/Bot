const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const stripe = require('stripe')('sk_test_51Ng6nvJBtPv1GFwrG7PUslXdIco30ZOGuqSgVB3w5PIBK0mJX42Ha9LaQeqK2i0ED2mAlKbJXsIeiQeELwyWLeL400wLqWWGXa');

// Definir flujos
const flowBienvenida = createFlow()
  .addKeyword(['hola', 'inicio'])
  .addAnswer('¡Bienvenido a nuestra tienda!')
  .addAnswer('¿En qué te podemos ayudar hoy?')
  .addAnswer(
    [
      'Selecciona una opción:',
      '🛒 Ver catálogo',
      '🛒 Ver carrito',
    ],
    null,
    { capture: true }
  );

const flowCatalogo = createFlow()
  .addKeyword(['catálogo', 'productos'])
  .addAnswer('Estos son nuestros productos:')
  // Agregar respuestas y lógica para mostrar productos

const flowCarrito = createFlow()
  .addKeyword(['carrito'])
  .addAnswer('Tu carrito:')
  // Agregar respuestas y lógica para mostrar contenido del carrito

const flowConfirmarPago = createFlow()
  .addKeyword(['pagar', 'realizar pago'])
  .addAnswer('Para realizar el pago, haz clic en el siguiente enlace:')
  // Agregar respuestas y lógica para generar enlace de pago


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow()
    .addFlow(flowBienvenida)
    .addFlow(flowCatalogo)
    .addFlow(flowCarrito)
    .addFlow(flowConfirmarPago);
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

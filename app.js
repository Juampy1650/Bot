const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowPagina = addKeyword(['2','Pagina','web'])
    .addAnswer('🙌 En Proceso')

const flowOperador = addKeyword(['3','operador'])
    .addAnswer('😟 ¡Lo sentimos! 🚫 Nuestros ejecutivos no están disponibles por el momento. Vuelve a escribirnos en el siguiente horario de 9:00 a.m. a 9:00 p.m. y atenderemos tu consulta.')
    .addAnswer(
        [
            '🤔 Elige un horario y con gusto te contactaremos 💬 para retomar tu solicitud hoy.',
            'Escribe el dígito de la opción deseada:',
            '👉 *1* Entre 3:00 pm y 4:00 pm',
            '👉 *2* No es necesario'
        ],
        {capture:true},
        async (ctx, {gotoFlow}/*,{fallBack}*/ ) =>{
            /*if(!ctx.body.includes["1","2","3"]){
                return fallBack('Esa opcion no es valida')
            }*/
            if(ctx.body === '1'){
            consolog("Funciono 1 ")
            }
            if(ctx.body === '2'){
                consolog("Funciono 2 ")
            }
        }
    )

const flowPedido = addKeyword(['Pedido','pedir','1'])
    .addAnswer('Por favor comparte tu ubicacion aproximada',
    {
        media:'https://media.giphy.com/media/24g7VPicZiVwMnQ59T/giphy.mp4'
    }
    )

const flowBienvenida = addKeyword("hola")
    .addAnswer('Bienvenido')
    .addAnswer('🙌 Hola, Gracias por comunicarte a Sphera Digital en que te podemos ayudar hoy')
    .addAnswer(
        [
            'Escribe el numero para seleccionar la opcion',
            '👉 *1* Realizar un pedido',
            '👉 *2* Pagina Web',
            '👉 *3* Contactactar con un operador',
        ],
        {capture:true},
        async (ctx, {gotoFlow,fallBack} ) =>{
            /*if(!ctx.body.includes["1","2","3"]){
                return fallBack('Esa opcion no es valida')
            }*/
            if(ctx.body === '1'){
                gotoFlow(flowPedido)
            }
            if(ctx.body === '2'){
                gotoFlow(flowPagina)
            }
            if(ctx.body === '3'){
                gotoFlow(flowOperador)
            }
        }
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowBienvenida])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

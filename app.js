const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async function (request, reply) {
  await reply.send({ hello: 'world' })
})

fastify.post('/preprocess', async function (request, reply) {
  if (!request.body) {
    return { error: 'Invalid request: Missing body' }
  }

  // Get the payload from the request:
  const payload = request.body

  // @todo: validation

  // @todo: introduce timeout

  // Iterate over the keys in the collection:
  for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {
    // Iterate over the translations in the key:
    for (const [lang, v] of Object.entries(keyValue.translations)) {
      // Process the value of the translation:
      payload.collection.keys[keyId].translations[lang].translation = v.translation.replace(/&apos;/g, '\'');
    /*  payload.collection.keys[keyId].translations[lang].translation = v.translation.replace(
        '&amp;nbsp;',
        '&nbsp;',
      )*/
    }
  }

  // @todo: validate processed values

  await reply.send(payload)
})

fastify.post('/postprocess', async function (request, reply) {
  if (!request.body) {
    return { error: 'Invalid request: Missing body' }
  }

  // Get the payload from the request:
  const payload = request.body

  // @todo: validation

  // @todo: introduce timeout

  // Iterate over the keys in the collection:
  for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {
    // Iterate over the translations in the key:
    for (const [lang, v] of Object.entries(keyValue.translations)) {
      // Process the value of the translation:
      payload.collection.keys[keyId].translations[lang].translation = v.translation.replace(/\u00A0/g, '&#160;');
      
    }
  }

  // @todo: validate processed values

  await reply.send(payload)
})

fastify.listen({host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
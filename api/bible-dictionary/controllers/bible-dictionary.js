'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  bibleDictionaryList: async (ctx) => {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services['bible-dictionary'].search(ctx.query);
    } else {
      entities = await strapi.services['bible-dictionary'].find(ctx.query);
    }

    entities.forEach((v) => {
      delete v.description;
    })

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['bible-dictionary'] }));
  }
};
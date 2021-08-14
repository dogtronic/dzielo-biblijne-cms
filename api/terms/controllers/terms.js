'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  termsList: async (ctx) => {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services['terms'].search(ctx.query);
    } else {
      entities = await strapi.services['terms'].find(ctx.query);
    }

    entities.forEach((v) => {
      delete v.description;
    })

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['terms'] }));
  }
};
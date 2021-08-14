'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  readingsWithoutContentList: async (ctx) => {
    let entities;

    const withoutContent = ctx.query.withoutContent;

    delete ctx.query.withoutContent;

    if (ctx.query._q) {
      entities = await strapi.services['readings'].search(ctx.query);
    } else {
      entities = await strapi.services['readings'].find(ctx.query);
    }

    if(withoutContent) {
      entities.forEach((v) => {
        delete v.content;
      })
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['readings'] }));
  }
};
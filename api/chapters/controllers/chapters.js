'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  chaptersList: async (ctx) => {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.chapters.search(ctx.query);
    } else {
      entities = await strapi.services.chapters.find(ctx.query);
    }

    entities.forEach((v) => {
      delete v.text;
    })

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.chapters }));
  }
};
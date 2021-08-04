'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  logView: async (ctx) => {
    const { id } = ctx.params;
    try {
      const notification = await strapi.services.notifications.findOne({ id });
      await strapi.services.notifications.update(
        { id: notification.id },
        { view: parseInt(notification.view) + 1 }
      );
      return ctx.send({
        success: true,
      });
    } catch (error) {
      console.error(error);
      return ctx.send({
        success: false,
      });
    }
}
};

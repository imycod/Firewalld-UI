/** @format */

const Service = require('egg').Service;

class RuleService extends Service {
  async addRule(body) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.sync();
      // await ctx.model.Rule.sync({ force: true });
      const time = ctx.helper.getFormatNowDate();
      const data = await ctx.model.Rule.create({
        ...body,
        sort: (await ctx.model.Rule.max('sort')) + 1,
        time,
      });
      return ctx.helper.success(data, () => ctx.helper.serviceAddSystem(9, `新建规则 时间${time}`));
    });
  }
  async updateRuleEffective({ effective = '', id = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.update(
        {
          effective,
        },
        {
          where: {
            id,
          },
        }
      );
      return ctx.helper.success('成功');
    });
  }
  async getRule({ page = 1, pageSize = 10, effective = '' }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      const data = await ctx.model.Rule.findAndCountAll({
        where: ctx.helper.where(
          [effective != ''],
          [
            {
              effective: effective == 'true' || effective === true,
            },
          ]
        ),
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [['sort', 'DESC']],
      });
      return ctx.helper.success(data);
    });
  }
  async updateSortRule({ sorts }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await sorts.syncEach(
        async item =>
          await ctx.model.Rule.update(
            {
              sort: item.sort,
            },
            {
              where: {
                id: item.id,
              },
            }
          )
      );
      return ctx.helper.success('成功');
    });
  }
  async deleteRule({ ids }) {
    const { ctx } = this;
    return await ctx.helper.seqTransaction(async () => {
      await ctx.model.Rule.destroy({
        where: { id: ids },
      });
      ctx.helper.serviceAddSystem(10, `删除规则 ${ids.length} 条`);
      return ctx.helper.success('成功');
    });
  }
}

module.exports = RuleService;

/** @format */

const Service = require('egg').Service;

class AccessService extends Service {
  async getAccessLog({ page = 1, pageSize = 10, ip = '', port = '', startTime = '', endTime = '' }) {
    const { ctx, app } = this;

    const data = await ctx.model.Access.findAndCountAll({
      raw: true,
      include: [
        {
          attributes: [app.Sequelize.literal('project.name')],
          model: ctx.model.Project,
          as: 'project',
        },
      ],
      where: ctx.helper.where(
        [startTime && endTime, port, ip],
        [
          {
            time: {
              [ctx.helper.seq.Op.between]: ctx.helper.betweenTime(startTime, endTime),
            },
          },
          { port },
          {
            ip: {
              [ctx.helper.seq.Op.like]: `%${ip}%`,
            },
          },
        ]
      ),
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
    });
    return ctx.helper.success(data);
  }
  async findAllAccessLog({ ip, startTime, endTime }) {
    const { ctx } = this;
    const data = await ctx.model.Access.findAndCountAll({
      where: ctx.helper.where(
        [startTime && endTime, ip],
        [
          {
            time: {
              [ctx.helper.seq.Op.between]: [startTime, endTime],
            },
          },
          {
            ip: {
              [ctx.helper.seq.Op.like]: `%${ip}%`,
            },
          },
        ]
      ),
      order: [['id', 'DESC']],
    });
    return ctx.helper.success(data);
  }
  async addAccessLog(params) {
    const { ctx } = this;
    await ctx.model.Access.sync();
    // await ctx.model.Ip.sync();
    // await ctx.model.Ip.create({ ip: params.ip, site: params.site });
    const log = await ctx.model.Access.create({
      ...params,
    });
    log.num = await ctx.model.Access.count({
      where: {
        ip: params.ip,
      },
    });
    await log.save();
  }
  async deleteAccessLog({ ids }) {
    const { ctx } = this;
    for await (let id of ids) {
      await ctx.model.Access.destroy({
        where: { id },
      });
      // await ctx.model.Access.sync({ force: true });
    }
    await ctx.service.system.addSystem(8, `删除日志 ${ids.length} 条`);
    return ctx.helper.success({
      data: '成功',
    });
  }
}

module.exports = AccessService;

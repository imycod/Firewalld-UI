/** @format */

'use strict';

const Service = require('egg').Service;

class OverviewController extends Service {
  async getOverview() {
    const { ctx } = this;
    const nameListCount = await ctx.model.Blacklist.count();
    const accessCount = await ctx.model.Access.count();
    const ruleCount = await ctx.model.Rule.count();

    const { stdout, stderr, err } = await ctx.helper.command('firewall-cmd --state');

    const firewalldStatus = stderr && err ? false : stdout.indexOf('running') == -1 ? false : true;
    // const accessCount = await ctx.model.Access.count();
    const dates = [];
    const curDay = ctx.helper.getFormatNowDate('yyyy-MM-dd');
    for (let index = 0; index < 15; index++) {
      const date = new Date(curDay).getTime() - 86400000 * index;
      dates.push({
        date: new Date(date).Format('yyyy-MM-dd'),
        startTime: new Date(date).Format('yyyy-MM-dd 00:00:00'),
        endTime: new Date(date).Format('yyyy-MM-dd 23:59:59'),
      });
    }
    const access = [];
    for await (let item of dates) {
      access.unshift({
        date: item.date,
        count: await ctx.model.Access.count({
          where: ctx.helper.where(
            [item.startTime && item.endTime],
            [
              {
                time: {
                  [ctx.helper.seq.Op.between]: [item.startTime, item.endTime],
                },
              },
            ]
          ),
        }),
      });
    }
    const response = { firewalldStatus, nameListCount, accessCount, access, ruleCount };
    return ctx.helper.success(response);
  }
  async overviewStartFirewall() {
    const { ctx, app } = this;
    const { stdout, stderr, err } = await ctx.helper.command('systemctl start firewalld');
    await app.startUp(false);
    const response = stderr && err ? false : stdout == '' ? true : false;
    await ctx.service.system.addSystem(12, `开启防火墙${response ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`);
    return ctx.helper.success(response);
  }
  async overviewStopFirewall() {
    const { ctx } = this;
    const { stdout, stderr, err } = await ctx.helper.command('systemctl stop firewalld');
    const response = stderr && err ? false : stdout == '' ? true : false;
    await ctx.service.system.addSystem(12, `关闭防火墙${response ? '成功' : '失败'} 时间:${ctx.helper.getFormatNowDate()}`);
    return ctx.helper.success(response);
  }
}

module.exports = OverviewController;

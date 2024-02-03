const repository = require("./repository");

function formatDate(date) {
  const dateObject = new Date(date);

  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getUTCDate()).padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}

module.exports = {
  async execute(dateStart, dateEnd) {
    const dbAlerts = await repository.execute(dateStart, dateEnd);

    const alerts = dbAlerts.reduce(
      (result, alert) => {
        const formattedDate = formatDate(alert.date);

        result.dateSummary[formattedDate] = (result.dateSummary[formattedDate] || 0) + 1;
        result.totalDamageByDate[formattedDate] =
          (result.totalDamageByDate[formattedDate] || 0) + alert.damage;

        if (
          !result.maxDamageEventByDate[formattedDate] ||
          alert.damage > result.maxDamageEventByDate[formattedDate].damage
        ) {
          result.maxDamageEventByDate[formattedDate] = { event: alert.event, damage: alert.damage };
        }

        if (
          !result.minDamageEventByDate[formattedDate] ||
          alert.damage < result.minDamageEventByDate[formattedDate].damage
        ) {
          result.minDamageEventByDate[formattedDate] = { event: alert.event, damage: alert.damage };
        }

        return result;
      },
      {
        dateSummary: {},
        totalDamageByDate: {},
        maxDamageEventByDate: {},
        minDamageEventByDate: {},
      }
    );

    alerts.data = Object.keys(alerts.dateSummary).map((date) => ({
      date,
      avgDamage: Math.floor(alerts.totalDamageByDate[date] / alerts.dateSummary[date]),
      maxDamageEvent: alerts.maxDamageEventByDate[date],
      minDamageEvent: alerts.minDamageEventByDate[date],
    }));

    return { data: dates.data };

    return { data: alerts.data };
  },
};

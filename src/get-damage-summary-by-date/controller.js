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

    const dates = dbAlerts.reduce(
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

    dates.data = Object.keys(dates.dateSummary).map((date) => ({
      date,
      avgDamage: Math.floor(dates.totalDamageByDate[date] / dates.dateSummary[date]),
      maxDamageEvent: dates.maxDamageEventByDate[date],
      minDamageEvent: dates.minDamageEventByDate[date],
    }));

    return { data: dates.data };

    // return dbAlerts
    //   .reduce((result, alert) => {
    //     const dateAlreadySummarized = result.find(({ date }) => date === alert.date);
    //     const {
    //       damages: oldDamages,
    //       maxDamageEvent: oldMaxDamageEvent,
    //       minDamageEvent: oldMinDamageEvent,
    //     } = { ...dateAlreadySummarized };
    //     const date = alert.date;
    //     const damages = (oldDamages || []).concat([alert.damage]);
    //     let maxDamageEvent = alert;
    //     if (oldMaxDamageEvent && oldMaxDamageEvent.damage > alert.damage) {
    //       maxDamageEvent = oldMaxDamageEvent;
    //     }
    //     let minDamageEvent;
    //     if (oldMinDamageEvent && oldMinDamageEvent.damage < alert.damage) {
    //       minDamageEvent = oldMinDamageEvent;
    //     }
    //     minDamageEvent = alert;

    //     if (dateAlreadySummarized) {
    //       dateAlreadySummarized.damages = damages;
    //       dateAlreadySummarized.maxDamageEvent = maxDamageEvent;
    //       dateAlreadySummarized.minDamageEvent = minDamageEvent;
    //     } else {
    //       result.push({
    //         date,
    //         damages,
    //         maxDamageEvent,
    //         minDamageEvent,
    //       });
    //     }

    //     return result;
    //   }, [])
    //   .sort((a, b) => b.date.localeCompare(a.date))
    //   .forEach((summary) => {
    //     summary.avgDamage = summary.damages.reduce((result, damage) => result + damage, 0);
    //     delete summary.damages;
    //     return summary;
    //   });
  },
};

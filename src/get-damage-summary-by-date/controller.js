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

    const dateSummary = {};
    const totalDamageByDate = {};

    dbAlerts.forEach((alert) => {
      alert.date = formatDate(alert.date);

      if (dateSummary[alert.date]) {
        dateSummary[alert.date]++;
        totalDamageByDate[alert.date] += alert.damage;
      } else {
        dateSummary[alert.date] = 1;
        totalDamageByDate[alert.date] = alert.damage;
      }
    });

    const result = {
      data: [],
    };

    for (const date in dateSummary) {
      const averageDamage = totalDamageByDate[date] / dateSummary[date];
      const roundedAverageDamage = Math.floor(averageDamage);

      result.data.push({
        date: date,
        avgDamage: roundedAverageDamage,
      });
    }

    return result;

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

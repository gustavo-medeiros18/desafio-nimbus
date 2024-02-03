const controller = require("./controller");

test("should return average, maximum and minimum events daily in date range", async () => {
  const dateStart = "2014-01-01";
  const dateEnd = "2014-01-10";

  const result = await controller.execute(dateStart, dateEnd);

  expect(result).toHaveProperty("data");
  expect(Array.isArray(result.data)).toBe(true);
  expect(result.data.length).toBeGreaterThan(0);

  result.data.forEach((dailyResult) => {
    expect(dailyResult).toHaveProperty("date");
    expect(dailyResult.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    expect(dailyResult).toHaveProperty("avgDamage");
    expect(typeof dailyResult.avgDamage).toBe("number");

    expect(dailyResult).toHaveProperty("maxDamageEvent");
    expect(dailyResult.maxDamageEvent).toHaveProperty("event");
    expect(typeof dailyResult.maxDamageEvent.event).toBe("string");
    expect(dailyResult.maxDamageEvent).toHaveProperty("damage");
    expect(typeof dailyResult.maxDamageEvent.damage).toBe("number");

    expect(dailyResult).toHaveProperty("minDamageEvent");
    expect(dailyResult.minDamageEvent).toHaveProperty("event");
    expect(typeof dailyResult.minDamageEvent.event).toBe("string");
    expect(dailyResult.minDamageEvent).toHaveProperty("damage");
    expect(typeof dailyResult.minDamageEvent.damage).toBe("number");
  });
});

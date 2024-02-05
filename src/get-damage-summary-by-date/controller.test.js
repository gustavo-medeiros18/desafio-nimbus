const controller = require("./controller");

describe("Controller Tests", () => {
  describe("execute function", () => {
    it("should return average, maximum and minimum events daily in date range", async () => {
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

        if (dailyResult.avgDamage) {
          expect(dailyResult.maxDamageEvent).toHaveProperty("event");
          expect(typeof dailyResult.maxDamageEvent.event).toBe("string");
          expect(dailyResult.maxDamageEvent).toHaveProperty("damage");
          expect(typeof dailyResult.maxDamageEvent.damage).toBe("number");

          expect(dailyResult).toHaveProperty("minDamageEvent");
          expect(dailyResult.minDamageEvent).toHaveProperty("event");
          expect(typeof dailyResult.minDamageEvent.event).toBe("string");
          expect(dailyResult.minDamageEvent).toHaveProperty("damage");
          expect(typeof dailyResult.minDamageEvent.damage).toBe("number");
        } else {
          expect(dailyResult.maxDamageEvent).toBe(null);
          expect(dailyResult.minDamageEvent).toBe(null);
        }
      });
    });

    it("should throw an error if dateStart is greater than dateEnd", async () => {
      const dateStart = "2014-01-10";
      const dateEnd = "2014-01-01";

      await expect(controller.execute(dateStart, dateEnd)).rejects.toThrow(
        "dateStart must be less to dateEnd."
      );
    });

    it("should throw an error if dateStart is not a valid date", async () => {
      const dateStart = "2014-01-32";
      const dateEnd = "2014-01-01";

      await expect(controller.execute(dateStart, dateEnd)).rejects.toThrow(
        "Both dateStart and dateEnd must be in the format 'yyyy-mm-dd'."
      );
    });

    it("should throw an error if dateEnd is not a valid date", async () => {
      const dateStart = "2014-01-01";
      const dateEnd = "2014-01-32";

      await expect(controller.execute(dateStart, dateEnd)).rejects.toThrow(
        "Both dateStart and dateEnd must be in the format 'yyyy-mm-dd'."
      );
    });

    it("should throw an error if dateStart or dateEnd are in invalid format", async () => {
      const dateStart = "01-01-2014";
      const dateEnd = "2014/01/01";

      await expect(controller.execute(dateStart, dateEnd)).rejects.toThrow(
        "Both dateStart and dateEnd must be in the format 'yyyy-mm-dd'."
      );
    });

    it("should throw an error if dateStart and dateEnd are not provided", async () => {
      await expect(controller.execute()).rejects.toThrow(
        "Both dateStart and dateEnd query params are required."
      );
    });

    it("should throw an error if dateStart is the same dateEnd", async () => {
      const dateStart = "2014-01-01";
      const dateEnd = "2014-01-01";

      await expect(controller.execute(dateStart, dateEnd)).rejects.toThrow(
        "dateStart must be different to dateEnd."
      );
    });
  });
});

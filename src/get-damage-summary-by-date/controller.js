/* Módulo de acesso ao banco de dados */
const repository = require("./repository");

/* Funções auxiliares para formatar e validar datas */
const formatDate = require("./utils/formatDate");
const isValidDate = require("./utils/isValidDate");

module.exports = {
  async execute(dateStart, dateEnd) {
    /* Validação: ambas as datas de início e fim foram fornecidas */
    if (!dateStart || !dateEnd)
      throw new Error("Both dateStart and dateEnd query params are required.");

    /* Validação: datas fornecidas têm o formato correto (yyyy-mm-dd) */
    if (!isValidDate(dateStart) || !isValidDate(dateEnd))
      throw new Error("Both dateStart and dateEnd must be in the format 'yyyy-mm-dd'.");

    /* Validação: se a data de início é menor ou igual à data de fim */
    if (new Date(dateStart) > new Date(dateEnd))
      throw new Error("dateStart must be less than or equal to dateEnd.");

    /* Consulta ao repositório de dados de alerta com as datas fornecidas */
    const dbAlerts = await repository.execute(dateStart, dateEnd);

    /* Objeto com os resumos de alertas de data */
    const alerts = dbAlerts.reduce(
      (result, alert) => {
        const formattedDate = formatDate(alert.date);

        /**
         * Atualiza o resumo de alertas por data com a contagem de alertas para a data em
         * questão. Se a data já existe no resumo, incrementa a contagem de alertas para
         * essa data. Caso contrário, inicializa a contagem como 1 para a data fornecida.
         */
        result.dateSummary[formattedDate] = (result.dateSummary[formattedDate] || 0) + 1;

        /**
         * Atualiza o resumo do total de danos por data com o valor do dano do alerta
         * atual. Se a data já existe no resumo, adiciona o dano do alerta atual ao total
         * de danos para essa data. Caso contrário, inicializa o total de danos como o
         * valor do dano do alerta atual para a data fornecida.
         */
        result.totalDamageByDate[formattedDate] =
          (result.totalDamageByDate[formattedDate] || 0) + alert.damage;

        /**
         * Atualiza o resumo do evento de maior dano por data. Se a data ainda não tem
         * um evento de maior dano registrado ou se o dano do alerta atual é maior do que
         * o dano registrado para essa data, atualiza o evento de maior dano para a data
         * com os detalhes do alerta atual (nome do evento e dano).
         */
        if (
          !result.maxDamageEventByDate[formattedDate] ||
          alert.damage > result.maxDamageEventByDate[formattedDate].damage
        ) {
          result.maxDamageEventByDate[formattedDate] = { event: alert.event, damage: alert.damage };
        }

        /**
         * Atualiza o resumo do evento de menor dano por data. Se a data ainda não tem
         * um evento de menor dano registrado ou se o dano do alerta atual é menor do que
         * o dano registrado para essa data, atualiza o evento de menor dano para a data com
         * os detalhes do alerta atual (nome do evento e dano).
         */
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

    /**
     * Preenche o objeto de resumos de dados com as datas que não possuem alertas.
     * Essas datas sem alertas ficam com avgDamage = 0, maxDamageEvent = null
     * e minDamageEvent = null.
     */
    const currentDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate);

      if (!alerts.dateSummary[formattedDate]) {
        alerts.dateSummary[formattedDate] = 0;
        alerts.totalDamageByDate[formattedDate] = null;
        alerts.maxDamageEventByDate[formattedDate] = null;
        alerts.minDamageEventByDate[formattedDate] = null;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    /**
     * Calcula a média de danos para cada data que possui alertas registrados.
     * Se o total de danos para uma data não for nulo (isto é, se houver pelo menos
     * um alerta registrado para essa data), calcula a média de danos dividindo o
     * total de danos pelo número de alertas para essa data. Caso contrário, define
     * a média de danos como 0 para essa data.
     */
    alerts.data = Object.keys(alerts.dateSummary).map((date) => ({
      date,
      avgDamage:
        alerts.totalDamageByDate[date] !== null
          ? Math.floor(alerts.totalDamageByDate[date] / alerts.dateSummary[date])
          : 0,
      maxDamageEvent: alerts.maxDamageEventByDate[date],
      minDamageEvent: alerts.minDamageEventByDate[date],
    }));

    /* Ordena o array de alertas por data, da mais recente para a mais antiga. */
    alerts.data.sort((a, b) => new Date(b.date) - new Date(a.date));

    /* retorno: array de alertas resultante ordenado*/
    return { data: alerts.data };
  },
};

let logger;

// Verifica se o código está sendo executado no lado do servidor (Node.js)
if (typeof window === "undefined") {
  // A função require é usada para carregar módulos em Node.js.
  // Aqui, estamos carregando o módulo 'winston' para fazer o logging.
  const winston = require("winston");

  // Cria um novo logger (registrador de logs) usando o Winston
  // O logger é configurado com diferentes níveis de logs, formatos e transportes.
  logger = winston.createLogger({
    // Define o nível de log. Níveis podem ser 'error', 'warn', 'info', 'verbose', 'debug', 'silly'.
    // Aqui, 'info' inclui mensagens de nível 'info' e mais severas, como 'error' e 'warn'.
    level: 'info',

    // Define o formato do log. Aqui estamos usando o formato JSON.
    // Isso significa que os logs serão salvos como objetos JSON.
    format: winston.format.json(),

    // Define os "transports" (meios de saída) onde os logs serão salvos.
    transports: [
      // Cria um arquivo de logs chamado 'error.log' onde somente mensagens de erro serão salvas.
      new winston.transports.File({ filename: 'error.log', level: 'error' }),

      // Cria um arquivo de logs chamado 'combined.log' onde todos os tipos de logs (até nível 'info') serão salvos.
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
}

// Exporta o logger (que só será definido se o código estiver rodando no servidor).
// No lado do cliente, logger será indefinido, evitando erros de dependência do 'fs'.
export default logger;

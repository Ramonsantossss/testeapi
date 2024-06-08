const { GoogleGenerativeAI } = require("./@google/generative-ai"); // Google AI, ou seja, o módulo npm do Gemini. As referências de código foram retiradas da documentação oficial do projeto!
const fs = require('fs'); // Realizar leitura na pasta aonde foi depoisitada a imagem para realizar o que foi disposto pelo prompt.

/* - Expliçação de como pegar a API_KEY do Google Gemini AI:
   * Entre no site: https://ai.google.dev/tutorials/web_quickstart?hl=pt-br e procure na documentação à seguinte opção "Gerar uma chave de API"
   * Após ele vai te redirecionar à uma página de login no Google (caso não esteja logado no dispositivo acessado) ou caso esteja logado, ele já vai direcionar direto as opções nescessárias. Criou a chave API? Deposite no campo => GoogleGenerativeAI('API_KEY');
   * Exemplo de execução da function dentro deste arquivo mesmo, copie abaixo da function e salve o arquivo, depois execute em seu termnal desejado: 
         * Exemplo de Uso 1 (Somente responder ao texto, ou seja, sem mencionar uma imagem desejada para realizar uma leitura através do Gemini): GeminiAI("Quem é você e por quem foi criado?", {model: "gemini-pro"}).then(console.log);
         * Exemplo de Uso 2 (Leitura de imagens, por exemplo: "O que tem nessa imagem?", este seria um exemplo de prompt para a utilização da inteligência artificial do Google): GeminiImage("O que contém na imagem?", {model: "gemini-pro-vision"} {inlineData: {data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"), mimeType: "image/png"}}).then(console.log);
*/

const startGemini = new GoogleGenerativeAI('ZAIzaSyCgaEIdwxmtM6RgA7xjOQ-w_PLARC9hgRA');

/* Gemini Pro: Resposta somente com textos, sem a nescessidade de marcar imagens! */
async function GeminiAI(prompt, options = {}) {
  const getModelUsed = startGemini.getGenerativeModel(options);
  const result = await getModelUsed.generateContent(prompt);
  return result.response.text(); // Retornar resultado do Chat.
};

/* Gemini Pro Vision: Usa-se uma imagem e prompt de pesquisa para se obter a resposta da inteligência artificial */
async function GeminiImage(prompt, options = {}, setting = {}) {
    const model = startGemini.getGenerativeModel(options);
   const result = await model.generateContent([prompt, setting]);
   return result.response.text(); // Retornar resultado do Chat.
};

module.exports = { GeminiAI, GeminiImage };

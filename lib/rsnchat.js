const { RsnChat } = require("rsnchat");

const TOKEN_RSN_CHAT = "rsnai_VfOVGMiMY0wDow9B09TRdrp2"; // Abre a documentação do módulo e encontra a parte aonde fala sobre token: https://www.npmjs.com/package/rsnchat?activeTab=readme
//token 2 = rsnai_ZCkHLViaouCpSqKXDDMAMf0U
const rsnchat = new RsnChat(TOKEN_RSN_CHAT);

class ScrapperData {

    static async ChatGPTv4(question) {
        try {
const responseMessage = await rsnchat.gpt(question);
return Promise.resolve({status: "Online", Criador: 'Dark Stars', resultado: {resposta: responseMessage.message}, statusCode: 200});
} catch(errorMessage) {
return Promise.reject({status: "Offline", resultado: {message: 'Ocorreu um erro ao executar à ação, por favor, notifique ao administrador da página.', errorMessage: String(errorMessage)}, statusCode: 404});
}
    };
    
    static async BingAi(question) {
        try {
            const responseMessage = await rsnchat.bing(question);
            return Promise.resolve({status: "Online", resultado: {question: question, response: responseMessage.message}, statusCode: 200});
        } catch(errorMessage) {
             return Promise.reject({status: "Offline", resultado: {message: 'Ocorreu um erro ao executar à ação, por favor, notifique ao administrador da página.', errorMessage: String(errorMessage)}, statusCode: 404});
        }
    };

    static async DallE(prompt) {
        try {
            const responseMessage = await rsnchat.dalle(prompt);
            return Promise.resolve({status: "Online", resultado: {prompt: prompt, imageUrl: responseMessage.image.url}, statusCode: 200});
        } catch(errorMessage) {
            return Promise.reject({status: "Offline", resultado: {message: 'Ocorreu um erro ao executar à ação, por favor, notifique ao administrador da página.', errorMessage: String(errorMessage)}, statusCode: 404});
        }
    };
    
    static async Prodia(prompt, negative_prompt, model) {
        try {
            const responseMessage = await rsnchat.prodia(prompt, negative_prompt, model);
            return Promise.resolve({status: "Online", resultado: {typeModel: model, imageUrl: responseMessage.imageUrl}, statusCode: 200});
        } catch(errorMessage) {
             return Promise.reject({status: "Offline", resultado: {message: 'Ocorreu um erro ao executar à ação, por favor, notifique ao administrador da página.', errorMessage: String(errorMessage)}, statusCode: 404});
        }
    };
    
}

module.exports = new Object({
    chatgpt: (question) => ScrapperData.ChatGPTv4(question),
    bingai: (question) => ScrapperData.BingAi(question),
    dalle: (prompt) => ScrapperData.DallE(prompt),
    prodia: (prompt, model) => ScrapperData.Prodia(prompt, model)
});
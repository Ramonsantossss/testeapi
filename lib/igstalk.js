const axios = require("axios");

class Instagram {

    static async Stalker(username) {
        try {
          const { data } = await axios.get(`https://igram.world/api/ig/userInfoByUsername/${username}`, {
            headers: {
                "User-Agent": "PostmanRuntime/7.37.0"
            }
          });
            return Promise.resolve({
                username: data.result.user.username, 
                profileName: data.result.user.full_name, 
                followersAmount: data.result.user.follower_count, 
                followingAmount: data.result.user.following_count, 
                accountVerified: data.result.user.is_verified, 
                accountPrivate: data.result.user.is_private, 
                mediaCount: data.result.user.media_count, 
                biography: data.result.user.biography, 
                externalUrl: data.result.user.external_url, 
                URL: `https://instagram.com/${username}`, 
                profilePicture: data.result.user.hd_profile_pic_url_info.url
          });
       } catch (err) {
            return Promise.reject("Ocorreu algum erro desconhecido ao executar a scrapper! Solicite a presença de um administrador(a).");
       }
    }

}

module.exports = new Object({
    instaStalker: (username) => Instagram.Stalker(username)
})
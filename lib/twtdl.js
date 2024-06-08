/* Scrapper - Créditos à AtroxDev & Vitinho. */

const getTwitterMedia = require('get-twitter-media'); // Módulo que baixa do Twitter

function getFileTypeFromUrl(url) {
  let videoRegex = /\/ext_tw_video\//;
  let imageRegex = /\/media\//;
  if (videoRegex.test(url)) {
      return 'video';
  } else if (imageRegex.test(url)) {
      return 'image';
  }
  return 'unknown';
} 

async function fetchTwitterMedia(url) {
  try {
      let media = await getTwitterMedia(url, { text: true });
      let response = {
          status: true,
    resultado: {	
          caption: media.text || '',
          media: []
  }
      };
      for (let item of media.media) {
          let mediaItem = {};
          if (item.url) {
              let fileType = getFileTypeFromUrl(item.url);

              if (fileType === 'video') {
                  mediaItem = {
                      type: 'video',
                      url: item.url
                  };
              } else if (fileType === 'image') {
                  mediaItem = {
                      type: 'image',
                      url: item.url
                  };
              }
          }
          mediaItem.type && response.resultado.media.push(mediaItem);
      }
      return response;
  } catch (error) {
      return { status: false, error: error.message };
  }
}

module.exports = { fetchTwitterMedia }
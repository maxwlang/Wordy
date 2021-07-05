// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const thesaurus = require('thesaurus');
const sample = require('lodash.sample');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(501).json({ fail: true, message: 'Unsupported method.' });

  try {
    const { message, complicationStyle } = req.body;

    const wordsOnly = message.toLowerCase().match(/[a-z']+/ig);
    const wordsUnique = wordsOnly.filter((v, i, a) => a.indexOf(v) === i);
  
    let result = message;
    wordsUnique.forEach(word => {
        let synonym = word;
        if (word.length >= 3) {
            const synonyms = thesaurus.find(word);

            if (synonyms.length > 0 && complicationStyle === 'randomWords') synonym = sample(synonyms);
            if (synonyms.length > 0 && complicationStyle === 'longestWord') synonym = synonyms.reduce((a, b) => a.length > b.length ? a : b);
            if (synonyms.length > 0 && complicationStyle === 'shortestWord') synonym = synonyms.reduce((a, b) => a.length < b.length ? a : b);
        }
  
        result = result.replace(new RegExp(word, 'gi'), synonym);
    });

    return res.status(200).json({ success: true, result });
  } catch(e) {
    console.error(e);
    return res.status(500).json({ fail: true, message: 'A server error has occured.'});
  }

}

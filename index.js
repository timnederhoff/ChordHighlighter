const fs = require('fs');

const chordsPath = 'path/to/my/songs';
const song = ['Artist - song.txt'][0]
try {
  const data = fs.readFileSync(chordsPath + song, 'utf8');
  const html = ['<html lang="en"><head><title>Song</title><style> .chord {color: blue;}</style></head><body><code><pre>'];
  html.push(highlightChords(data));
  html.push('</pre></code></body></html>');

  fs.writeFileSync('output.html', html.join('\n'));
} catch (err) {
  console.error(err);
}

function highlightChords(input) {
  const chords = ['Em', 'Am', 'A', 'G', 'Bm', 'B', 'C', 'F', 'D']
  const regExpString = chords.map(chord => `${chord}(?=\\s)|(?<=\\s)${chord}`).join('|');
  console.log(regExpString);
  const chordsRegExp = new RegExp(regExpString, 'g');
  return input.replaceAll(chordsRegExp, function(matched) { return `<span class="chord">${matched}</span>` } );
}
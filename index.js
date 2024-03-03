const fs = require('fs');

const chordsPath = 'path/to/my/songs';
const song = ['Artist - song.txt'][0]
try {
  const data = fs.readFileSync(chordsPath + song, 'utf8');
  const html = [
    '<!DOCTYPE html><html lang="en">',
    '<head><title>Song</title>',
    '<style>span.chord {color: blue;}</style>',
    '</head>',
    '<body><code><pre>',
    highlightChords(data),
    '</pre></code></body></html>'
  ]
  fs.writeFileSync('output.html', html.join('\n'));
} catch (err) {
  console.error(err);
}

function highlightChords(input) {
  const chords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'].reduce((previousValue, currentValue) => {
    return previousValue.concat([
        currentValue,
        currentValue + 'b',
        currentValue + '#'].reduce((previousValue, currentValue) => {
          return previousValue.concat([
              currentValue + '7',
              currentValue + '6',
              currentValue + '9',
              currentValue + 'maj7',
              currentValue + 'min6',
              currentValue + 'm',
              currentValue + 'sus',
              currentValue + 'dim',
              currentValue,
          ]);
    }, []))
  }, []);
  const regExpString = chords.map(chord => `${chord}(?= )|(?<= )${chord}`).join('|');
  const chordsRegExp = new RegExp(regExpString, 'g');
  return input.replaceAll(chordsRegExp, function(matched) { return `<span class="chord">${matched}</span>` } );
}
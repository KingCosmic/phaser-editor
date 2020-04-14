import fs from 'fs';

type Entity = {
  type: string;
  id: string;
  x: number;
  y: number;
  texture?: string;
  text?: string;
};

type Data = {
  name: string;
  entities: Entity[];
};

function generateSceneFile(scenePath: string, data: Data) {
  // TODO: make this use js files if the project is setup for them.
  // remove the .scene from our filepath and add .ts
  const path = `${scenePath.slice(0, -6)}.ts`;
  const file = fs.readFileSync(path, 'utf8');

  const newLines = data.entities.map(entity => {
    const { type, text, texture, x, y } = entity;
    let line = '';

    if (type === 'Image')
      line = `    this.add.image(${x}, ${y}, '${texture}');`;

    if (type === 'Sprite')
      line = `    this.add.sprite(${x}, ${y}, '${texture}');`;

    if (type === 'Text') line = `    this.add.text(${x}, ${y}, '${text}');`;

    return line;
  });

  // split our file by new line.
  const lines = file.split('\n');

  // find the line with /* start of object generation */
  const startIndex = lines.findIndex(line => line.includes('_create() {'));
  const endIndex = lines.findIndex((line, index) => {
    if (index < startIndex) return false;
    return line.includes('}');
  });

  lines.splice(startIndex + 1, endIndex - startIndex - 1);

  const secondHalf = lines.splice(startIndex + 1);

  fs.writeFileSync(path, lines.concat(newLines, secondHalf).join('\n'));
}

export default generateSceneFile;

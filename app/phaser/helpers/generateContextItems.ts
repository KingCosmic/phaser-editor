import { Scene, GameObjects, Input } from 'phaser';

type Item = {
  label: string;
  color?: string;
  onClick(): void;
};

function generateContextItems(
  scene: Scene,
  pointer: Input.Pointer,
  manager: any,
  object?: GameObjects.GameObject
): Item[] {
  const spawnX = pointer.x;
  const spawnY = pointer.y;

  const items: Item[] = [
    {
      label: 'Add Image',
      onClick: () => {
        const obj = scene.add.image(spawnX, spawnY, 'logo');
        obj.setInteractive();
        scene.input.setDraggable(obj);
        manager.setState({ visible: false });
      }
    },
    {
      label: 'Add Sprite',
      onClick: () => {
        const obj = scene.add.sprite(spawnX, spawnY, 'logo');
        obj.setInteractive();
        scene.input.setDraggable(obj);
        manager.setState({ visible: false });
      }
    },
    {
      label: 'Add Tile Sprite',
      onClick: () => {
        const obj = scene.add.tileSprite(spawnX, spawnY, 100, 100, 'logo');
        obj.setInteractive();
        scene.input.setDraggable(obj);
        manager.setState({ visible: false });
      }
    },
    {
      label: 'Add Bitmap Text',
      onClick: () => {
        const obj = scene.add.bitmapText(spawnX, spawnY, '', 'Phas3r is cool');
        obj.setInteractive();
        scene.input.setDraggable(obj);
        manager.setState({ visible: false });
      }
    },
    {
      label: 'Add Text',
      onClick: () => {
        const obj = scene.add.text(spawnX, spawnY, 'Phas3r is cool');
        obj.setInteractive();
        scene.input.setDraggable(obj);
        manager.setState({ visible: false });
      }
    }
  ];

  if (object) {
    items.push({
      label: `Delete ${object.type}`,
      color: '#f04747',
      onClick: () => {
        object.destroy();
        manager.setState({ visible: false });
      }
    });
  }

  return items;
}

export default generateContextItems;

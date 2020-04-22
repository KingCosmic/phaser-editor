import { Scene, GameObjects, Input, Types } from 'phaser';
import fs from 'fs';

import { ContextMenu } from '../../components/ContextMenu';
import Inspector from '../../components/Inspector';

import { generateContextItems, generateSceneFile } from '../helpers';
import { saveFile } from '../../helpers/files';

// TODO: make object when clicked update inspector

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

function createEditScene(scenePath: string) {
  return class EditScene extends Scene {
    constructor() {
      super({
        key: 'editscene'
      });
    }

    create() {
      const data: Data = JSON.parse(fs.readFileSync(scenePath, 'utf8'));

      const contextMenu = this.add.reactDom(ContextMenu, {
        visible: false,
        items: [],
        x: 0,
        y: 0
      });
      const inspector = this.add.reactDom(Inspector, {
        type: 'scene',
        data: this
      });
      this.input.mouse.disableContextMenu();

      for (let i = 0; i < data.entities.length; i += 1) {
        const { type, text, texture, x, y, id } = data.entities[i];

        let obj;

        if (type === 'Image') obj = this.add.image(x, y, texture as string);
        if (type === 'Sprite') obj = this.add.sprite(x, y, texture as string);
        if (type === 'Text') obj = this.add.text(x, y, text as string);

        obj = obj as GameObjects.Sprite | GameObjects.Image | GameObjects.Text;

        obj.setInteractive();
        obj.setDataEnabled();
        obj.data.set('id', id);
        this.input.setDraggable(obj);
      }

      this.input.topOnly = true;
      this.input.on(
        'drag',
        (
          _p: Input.Pointer,
          gameObject: GameObjects.Image,
          dragX: number,
          dragY: number
        ) => {
          gameObject.setPosition(dragX, dragY);
        }
      );

      this.input.on(
        'gameobjectdown',
        (
          pointer: Input.Pointer,
          gameobject: GameObjects.GameObject,
          event: Types.Input.EventData
        ) => {
          if (pointer.rightButtonDown()) {
            contextMenu.setState({
              visible: true,
              x: pointer.event.clientX,
              y: pointer.event.clientY,
              items: generateContextItems(
                this,
                pointer,
                contextMenu,
                gameobject
              )
            });
          } else if (pointer.leftButtonDown()) {
            inspector.setState({ type: gameobject.type, data: gameobject });

            if (contextMenu.state.visible) {
              contextMenu.setState({ visible: false });
            }
          }

          event.stopPropagation();
        }
      );

      this.input.on('pointerdown', (pointer: Input.Pointer) => {
        if (pointer.rightButtonDown()) {
          contextMenu.setState({
            visible: true,
            x: pointer.event.clientX,
            y: pointer.event.clientY,
            items: generateContextItems(this, pointer, contextMenu)
          });
        } else if (pointer.leftButtonDown()) {
          inspector.setState({ type: 'Scene', data: this });

          if (contextMenu.state.visible) {
            contextMenu.setState({ visible: false });
          }
        }
      });

      this.input.keyboard.on('keydown-S', (event: KeyboardEvent) => {
        if (!event.ctrlKey) return;

        const children = this.children.getChildren().map(Child => {
          const child = Child as GameObjects.Sprite | GameObjects.Text;
          const childData: Entity = {
            id: child.getData('id'),
            x: child.x,
            y: child.y,
            type: child.type
          };

          if (['Sprite', 'Image'].includes(child.type)) {
            const c = child as GameObjects.Image;
            childData.texture = c.texture.key;
          }

          if (['Text'].includes(child.type)) {
            const c = child as GameObjects.Text;
            childData.text = c.text;
          }

          return childData;
        });

        const newData: Data = {
          name: data.name,
          entities: children
        };

        generateSceneFile(scenePath, newData);
        saveFile(scenePath, newData);
      });
    }
  };
}

export default createEditScene;

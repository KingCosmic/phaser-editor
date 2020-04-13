import { Scene, GameObjects, Input, Types } from 'phaser';
import fs from 'fs';

import { ContextMenu } from '../../components/ContextMenu';

import generateContextItems from '../helpers/generateContextItems';

// TODO: make object when clicked update inspector

type Entity = {
  x: number;
  y: number;
  type: string;
  texture: string;
};

type Data = {
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
      this.input.mouse.disableContextMenu();

      for (let i = 0; i < data.entities.length; i += 1) {
        const { texture, x, y } = data.entities[i];

        const object = this.add.image(x, y, texture).setInteractive();
        this.input.setDraggable(object);
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
          } else if (contextMenu.state.visible) {
            contextMenu.setState({ visible: false });
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
        } else if (contextMenu.state.visible) {
          contextMenu.setState({ visible: false });
        }
      });
    }
  };
}

export default createEditScene;

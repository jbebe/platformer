import { IBlock, IDimension2d, IModelPeek, IPosition2d } from "./types";
import { DisplayObject, Sprite, Texture } from "pixi.js";

export default class Block implements IBlock {

  public liveObj: Sprite

  constructor(
    private position: IPosition2d,
    private size: IDimension2d,
  ) {
    this.liveObj = new Sprite(Texture.WHITE)
    this.liveObj.x = position.x
    this.liveObj.y = position.y
    this.liveObj.width = size.width
    this.liveObj.height = size.height
  }

  getDisplayObject(): DisplayObject {
    return this.liveObj
  }

  peek(delta: number): IModelPeek {
    return {
      hasGravity: false,
      position: {
        x: this.liveObj.x,
        y: this.liveObj.y,
      },
      boundary: {
        width: this.liveObj.width,
        height: this.liveObj.height,
      },
    }
  }

  public update(peekObj: IModelPeek): void {}

}
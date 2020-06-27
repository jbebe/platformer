import { DisplayObject } from "pixi.js"
import Player from "./player";

export interface IPosition2d {
  x: number
  y: number
}

export interface IDimension2d {
  width: number
  height: number
}

export interface IBoundary2d extends IDimension2d {}

export interface IModel {
  peek(delta: number): IModelPeek
  update(peekObj: IModelPeek): void
  getDisplayObject(): DisplayObject
}

export interface ICreature extends IModel {}

export interface IBlock extends IModel {}

export interface IModelPeek {
  hasGravity: boolean
  position: IPosition2d
  velocity?: IVec2d
  boundary: IBoundary2d
}

export interface IVec2d extends IPosition2d {}
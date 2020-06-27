import { DisplayObject } from "pixi.js";

export interface LevelConfiguration {
  [key: string]: any,
  width: number,
  height: number,
}

export default interface ILevel {

  configuration: LevelConfiguration

  render(delta: number): void

  getDisplayObjects(): DisplayObject[]
}
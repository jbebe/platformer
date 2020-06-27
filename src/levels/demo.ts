import Player from "../models/player";
import ILevel, { LevelConfiguration } from "./ilevel";
import { DisplayObject, Point } from "pixi.js";
import { Configuration } from "../logic/configuration";
import { EntityContainer } from "../models/entity-container";
import PhysicsEngine from "../logic/physics-engine";
import Block from "../models/Block";

export default class DemoLevel implements ILevel {

  configuration: LevelConfiguration = {
    width: Configuration.Screen.Width,
    height: Configuration.Screen.Height,
  }

  private entities: EntityContainer
  private physics: PhysicsEngine

  constructor(){
    this.entities = new EntityContainer(
      new Player({ x: 40, y: 0 }, this.configuration),
      [

      ],
      [
        new Block({ x: 20, y: 100 }, { width: 100, height: 5 }),
        new Block({ x: 20, y: 40 }, { width: 50, height: 5 }),
        new Block({ x: 40, y: 60 }, { width: 40, height: 5 })
      ])

    this.physics = new PhysicsEngine(this.configuration)
  }

  public render(delta: number): void {
    const peekRequest = this.entities.peekAll(delta)
    const peekResult = this.physics.update(delta, peekRequest)
    this.entities.update(peekResult)
  }

  getDisplayObjects(): DisplayObject[] {
    return this.entities.getDisplayObjects()
  }

}
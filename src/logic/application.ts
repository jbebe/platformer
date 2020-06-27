import { Application as PixiApplication } from "pixi.js";
import Level from "../levels/ilevel";
import DemoLevel from "../levels/demo";
import { Configuration } from "./configuration";

export default class Application {

  private pixiApplication: PixiApplication
  private currentState: Level

  constructor() {
    this.pixiApplication = new PixiApplication({
      width: Configuration.Screen.Width,
      height: Configuration.Screen.Height,
    })

    this.currentState = new DemoLevel()
    document.querySelector('#container').appendChild(this.pixiApplication.view)
  }

  public setup(): void {
    for (const dObj of this.currentState.getDisplayObjects())
      this.pixiApplication.stage.addChild(dObj)

    this.pixiApplication.ticker.add(delta => this.gameLoop(delta))
  }

  private gameLoop(delta: number): void {
    this.currentState.render(delta)
  }

}

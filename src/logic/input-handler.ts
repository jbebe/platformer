import { PlayerActionHandler } from "./player-action-handler";

export enum InputState {
    Press,
    Hold,
    Release,
    Idle,
}

export class InputHandler {

    private keyState: { [key: string]: boolean }

    constructor(private actionHandler: PlayerActionHandler) {

        this.keyState = {}
        for (const key of actionHandler.trackedKeys){
            this.keyState[key] = false
        }

        window.addEventListener(
            "keydown", (evt) => this.onKeyEvent(evt), false
        );
        window.addEventListener(
            "keyup", (evt) => this.onKeyEvent(evt), false
        );
    }

    private onKeyEvent(evt: KeyboardEvent) {
        const isDown = evt.type === 'keydown'
        const keyCode = evt.code
        const action = this.actionHandler.getActionForKey(keyCode)
        if (action) {
            const inputState = this.getKeyStateFor(keyCode, isDown)
            action.sendEvent(inputState)
            this.keyState[keyCode] = isDown
            evt.preventDefault();
        }
    }

    private getKeyStateFor(key: string, isDown: boolean): InputState {
        const wasDown = this.keyState[key]
        const flagChange = [wasDown, isDown].map(x => +x).join('')
        const changeMap: { [key: string]: InputState } = {
            '00': InputState.Idle,
            '01': InputState.Press,
            '10': InputState.Release,
            '11': InputState.Hold,
        }
        return changeMap[flagChange]
    }
}

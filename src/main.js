import { optionData }        from "./data/optiondata.js"
import { gameState }         from "./state/gameState.js"
import { loadUI }            from "./ui/renderer.js"
import { initKeyboardEvents } from "./events/keyboardEvents.js"

document.addEventListener("DOMContentLoaded", () => {
    gameState.currentData = optionData["title"]
    initKeyboardEvents()
    loadUI()
})
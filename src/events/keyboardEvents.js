import { optionData } from "../data/optiondata.js"
import { gameState }  from "../state/gameState.js"
import { dom }        from "../ui/dom.js"
import { loadUI }     from "../ui/renderer.js"

export function initKeyboardEvents() {
    window.addEventListener("keydown", (event) => {
        if (event.key !== " ") return
        if (document.activeElement.tagName === "INPUT") return
        event.preventDefault()

        if (gameState.currentData.screen === "store") {
            gameState.currentData = optionData["title"]
            loadUI()
            return
        }

        if (gameState.readyToReturn) {
            gameState.currentData = optionData["title"]
            loadUI()
            return
        }

        if (gameState.currentTextIndex < gameState.currentData.text.length - 1) {
            gameState.currentTextIndex++
            dom.text.textContent = gameState.currentData.text[gameState.currentTextIndex]

            if (gameState.currentTextIndex === gameState.currentData.text.length - 1) {
                dom.toolTip.textContent = "press space to return"
                gameState.readyToReturn = true
            }
        }
    })
}
import { optionData }        from "../data/optiondata.js"
import { gameState }         from "../state/gameState.js"
import { dom }               from "./dom.js"
import { renderPartyLeaderScreen,
         renderPartyMembersScreen } from "./screens/partyScreens.js"
import { renderStoreScreen }        from "./screens/storeScreen.js"

export function removeUI() {
    dom.title.textContent        = ""
    dom.question.textContent     = ""
    dom.youMay.textContent       = ""
    dom.options.innerHTML        = ""
    dom.inputContainer.innerHTML = ""
    dom.text.textContent         = ""
    dom.toolTip.textContent      = ""
}

function loadOptions() {
    for (const op of gameState.currentData.options) {
        const li = document.createElement("li")
        if (op.description) {
            const promptSpan = document.createElement("span")
            promptSpan.textContent = op.prompt
            promptSpan.style.fontWeight = "bold"

            const descSpan = document.createElement("span")
            descSpan.textContent = ` — ${op.description}`
            descSpan.style.fontStyle = "italic"

            li.appendChild(promptSpan)
            li.appendChild(descSpan)
        } else {
            li.textContent = op.prompt
        }
        li.style.alignContent = "center"
        dom.options.appendChild(li)
    }
}

export function loadUI() {
    removeUI()
    loadOptions()
    gameState.currentTextIndex = 0
    gameState.readyToReturn    = false

    if (gameState.currentData.title) {
        dom.title.textContent = "Zombie Trail"
    }

    if (gameState.currentData.question) {
        dom.question.textContent  = gameState.currentData.question
        dom.question.style.textAlign = "center"
    }

    if (gameState.currentData.text.length > 0) {
        dom.text.textContent         = gameState.currentData.text[0]
        dom.text.style.textAlign     = "center"
        dom.text.style.padding       = "80px"
    }

    const screen = gameState.currentData.screen
    if (screen === "partyLeader")  { renderPartyLeaderScreen();  return }
    if (screen === "partyMembers") { renderPartyMembersScreen(); return }
    if (screen === "store")        { renderStoreScreen();        return }

    if (gameState.currentData.selectable) {
        dom.youMay.textContent = "You may:"
        dom.inputContainer.innerHTML = `
            <p>What is your choice?</p>
            <input type="text" maxlength="1" class="input-box" id="choice" autocomplete="off">
        `
        const choiceInput = document.getElementById("choice")
        choiceInput.focus()
        choiceInput.addEventListener("keydown", handleChoice)
    }
}

function handleChoice(event) {
    const input = event.target.value
    if (!input || event.key !== "Enter") return

    const selectedOption = gameState.currentData.options[input - 1]
    if (!selectedOption) return

    if (selectedOption.difficulty) {
        gameState.difficulty    = selectedOption.difficulty
        gameState.startingBonus = selectedOption.startingBonus
    }

    gameState.currentData = optionData[selectedOption.dest]
    loadUI()
}
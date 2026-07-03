import { optionData } from "../../data/optiondata.js"
import { gameState }  from "../../state/gameState.js"
import { dom }        from "../dom.js"
import { loadUI }     from "../renderer.js"

export function renderPartyLeaderScreen() {
    dom.inputContainer.innerHTML = `
        <p>What is the first name of the wagon leader?</p>
        <input type="text" class="input-box" id="leader-input" autocomplete="off">
    `
    const leaderInput = document.getElementById("leader-input")
    leaderInput.focus()

    leaderInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return
        gameState.partyNames      = [event.target.value.trim() || "Leader", "", "", "", ""]
        gameState.currentData     = optionData["partyMembers"]
        loadUI()
    })
}

export function renderPartyMembersScreen() {
    dom.toolTip.textContent = gameState.currentData.tooltip
    const leaderName        = gameState.partyNames[0] ?? ""

    dom.inputContainer.innerHTML = `
        <ol id="party-list">
            <li>${leaderName}</li>
            <li><input type="text" class="input-box party-input" data-index="1" autocomplete="off"></li>
            <li><input type="text" class="input-box party-input" data-index="2" autocomplete="off"></li>
            <li><input type="text" class="input-box party-input" data-index="3" autocomplete="off"></li>
            <li><input type="text" class="input-box party-input" data-index="4" autocomplete="off"></li>
        </ol>
    `
    document.querySelector(".party-input[data-index='1']").focus()

    document.querySelectorAll(".party-input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return
            const idx = parseInt(input.dataset.index)
            gameState.partyNames[idx] = input.value.trim()
            const next = document.querySelector(`.party-input[data-index="${idx + 1}"]`)
            if (next) {
                next.focus()
            } else {
                gameState.currentData = optionData["gameStart"]
                loadUI()
            }
        })
    })
}
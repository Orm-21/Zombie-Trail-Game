import { optionData } from "../../data/optiondata.js"
import { gameState }  from "../../state/gameState.js"
import { dom }        from "../dom.js"
import { loadUI }     from "../renderer.js"

const PURCHASE_KEYS = ["oxen", "food", "clothing", "ammunition", "spareParts"]

export function renderStoreScreen() {
    const data = gameState.currentData

    // Initialise money from difficulty bonus if not already set
    if (!gameState.money) {
        gameState.money = 1600 + (gameState.startingBonus?.money ?? 0)
    }

    showStoreFront()

    function showStoreFront() {
        const totalBill = calcTotalBill()
        const remaining = (gameState.money - totalBill).toFixed(2)

        const itemRows = data.items.map((item, i) => {
            const cost = (item.price * gameState.purchases[PURCHASE_KEYS[i]]).toFixed(2)
            return `<tr>
                <td>${item.key}.</td>
                <td>${item.name}</td>
                <td>$${cost}</td>
            </tr>`
        }).join("")

        dom.inputContainer.innerHTML = `
            <div class="store">
                <p class="store-header">${data.storeName}<br>${data.storeLocation}</p>
                <p class="store-date">${data.storeDate}</p>
                <table class="store-table">${itemRows}</table>
                <hr class="store-divider">
                <p>Total bill: $${totalBill.toFixed(2)}</p>
                <p>Amount you have: $${remaining}</p>
                <p>Which item would you like to buy?</p>
                <input type="text" maxlength="1" class="input-box" id="store-choice" autocomplete="off">
                <p>Press SPACE BAR to leave store</p>
            </div>
        `
        const storeInput = document.getElementById("store-choice")
        storeInput.focus()
        storeInput.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return
            const choice = parseInt(event.target.value)
            const item   = data.items.find(i => i.key === choice)
            if (!item) return
            showQuantityPrompt(item, PURCHASE_KEYS[choice - 1])
        })
    }

    function showQuantityPrompt(item, purchaseKey) {
        dom.inputContainer.innerHTML = `
            <div class="store">
                <p>How many ${item.name} would you like?<br>($${item.price} ${item.unit})</p>
                <input type="text" class="input-box" id="qty-input" autocomplete="off">
                <p id="qty-error" style="color:red"></p>
            </div>
        `
        const qtyInput = document.getElementById("qty-input")
        const qtyError = document.getElementById("qty-error")
        qtyInput.focus()

        qtyInput.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return
            const qty           = parseInt(event.target.value) || 0
            const otherTotal    = calcTotalBillExcluding(purchaseKey)
            const newTotal      = otherTotal + item.price * qty

            if (newTotal > gameState.money) {
                const canSpend = (gameState.money - otherTotal).toFixed(2)
                qtyError.textContent = `You can't afford that. You have $${canSpend} left to spend on this item.`
                qtyInput.value = ""
                qtyInput.focus()
                return
            }

            gameState.purchases[purchaseKey] = qty
            showStoreFront()
        })
    }

    function calcTotalBill() {
        return gameState.currentData.items.reduce((sum, item, i) => {
            return sum + item.price * gameState.purchases[PURCHASE_KEYS[i]]
        }, 0)
    }

    function calcTotalBillExcluding(excludeKey) {
        return gameState.currentData.items.reduce((sum, item, i) => {
            if (PURCHASE_KEYS[i] === excludeKey) return sum
            return sum + item.price * gameState.purchases[PURCHASE_KEYS[i]]
        }, 0)
    }
}
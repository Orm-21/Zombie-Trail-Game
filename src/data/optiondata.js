const titleData = {
    title: true,
    selectable: true,
    question: null,
    options: [
        { key: 1, prompt: "Drive the trail",    dest: "modes"    },
        { key: 2, prompt: "Read the lore",      dest: "lore"     },
        { key: 3, prompt: "How the game works", dest: "tutorial" }
    ],
    text: [],
    tooltip: null
}

const gameModes = {
    title: true,
    selectable: true,
    question: "Choose your background:",
    options: [
        {
            key: 1,
            prompt: "War Veteran",
            dest: "partyLeader",
            difficulty: "easy",
            description: "Battle-hardened and resourceful. You start with extra supplies and weapons.",
            startingBonus: { food: 200, ammo: 50, money: 300 }
        },
        {
            key: 2,
            prompt: "Average Citizen",
            dest: "partyLeader",
            difficulty: "medium",
            description: "A regular person making the journey. Balanced starting resources.",
            startingBonus: { food: 150, ammo: 25, money: 500 }
        },
        {
            key: 3,
            prompt: "Poor Farmer",
            dest: "partyLeader",
            difficulty: "hard",
            description: "Scraping by with little to your name. Only the strong survive.",
            startingBonus: { food: 75, ammo: 10, money: 150 }
        }
    ],
    text: [
        "Your background determines your starting resources and how difficult the trail will be.",
        "Choose wisely — the dead don't get a second chance."
    ],
    tooltip: "Select a difficulty to begin your journey"
}

const partyLeaderData = {
    title: true,
    selectable: false,
    question: null,
    options: [],
    text: [],
    tooltip: null,
    screen: "partyLeader"
}

const partyMembersData = {
    title: true,
    selectable: false,
    question: null,
    options: [],
    text: [],
    tooltip: "(Enter names or press Enter)",
    screen: "partyMembers"
}

const storeData = {
    title: false,
    selectable: false,
    question: null,
    options: [],
    text: [],
    tooltip: null,
    screen: "store",
    storeName: "Matt's General Store",
    storeLocation: "Independence, Missouri",
    storeDate: "April 1, 1848",
    items: [
        { key: 1, name: "Oxen",        price: 40,   unit: "per ox"     },
        { key: 2, name: "Food",        price: 0.20, unit: "per pound"  },
        { key: 3, name: "Clothing",    price: 10,   unit: "per set"    },
        { key: 4, name: "Ammunition",  price: 2,    unit: "per box"    },
        { key: 5, name: "Spare parts", price: 15,   unit: "per part"   }
    ]
}

const loreData = {
    title: true,
    selectable: false,
    question: null,
    options: [],
    text: [
        `It all starts in January 15, 1979 when a Soviet experiment in Warsaw got
        out of containment and spread across Europe. But on July 4, 1980
        the zombie virus landed in eastern United States.`,
        `You might encounter some brave newsmen that are sacrificing themselves to
        deliver news to those travelers who need it most. Some of those newsmen
        include Mike who had no family left, Henry who couldn't bear the fear of
        living in a world of zombies, and Harold who was old and grumpy in his
        past years, but wanted to compensate.`
    ],
    tooltip: "press space bar to continue"
}

const gameTutorial = {
    title: true,
    selectable: false,
    question: null,
    options: [],
    text: [ "Tutorial" ],
    tooltip: "press space bar to continue"
}

export const optionData = {
    title:        titleData,
    modes:        gameModes,
    partyLeader:  partyLeaderData,
    partyMembers: partyMembersData,
    gameStart:    storeData,
    lore:         loreData,
    tutorial:     gameTutorial
}
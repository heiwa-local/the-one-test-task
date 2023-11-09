class Game {
    constructor() {
        this.map = new Array()
        this.mapSize = [undefined, undefined]
        this.hero = {
            position: undefined,
            hp: 100,
            damage: 10,
            status: 1
        }
        this.enemies = []
    }

    //Generation

    createMap(x, y) {
        let rows = new Array(y)
        let row = new Array(x)

        let cellProps = { 
            type: undefined,
            unit: undefined
        }

        row.fill(cellProps)
        rows.fill(row)

        this.map = rows
        this.mapSize = [x, y]
    }

    fillMap(type) {
        let cellProps = { 
            type: type,
            unit: undefined
        }

        this.map = this.map.map(row => row.map(cell => (cellProps)))
    }

    placeItemOnMap(type, positionX, positionY, width, height, unit) {
        for (let y = positionY; y < positionY + height; y++) {
            this.map[y].fill(
                {
                    type: type,
                    unit: unit
                }, positionX, positionX + width)
        }
    }

    placeUnitOnMap(unit, positionX, positionY) {
        this.map[positionY][positionX] = {
            type: 1,
            unit: unit
        }
    }

    findPositionForRoomOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = Math.floor(Math.random() * this.mapSize[0])
            let positionY = Math.floor(Math.random() * this.mapSize[1])
            let isEnableToPlace = true
            let onRoad = false
    
            if (((positionX + width) >= this.mapSize[0]) || ((positionY + height) >= this.mapSize[1])) {
                isEnableToPlace = false
            } else {
                for (let y = positionY; y < positionY + height; y++) {
                    for (let x = positionX; x < positionX + width; x++) {
                        if (this.map[y][x].type === 2 || this.map[y][x].type === 3) {
                            onRoad = true
                        }
                        if (this.map[y][x].type === 1) {
                            isEnableToPlace = false
                            break
                        }
                    }
                }
            }
            if (isEnableToPlace && onRoad) {
                position = [positionX, positionY]
                break
            }
        }
        return position
    }

    findPositionForHorizontalRoadOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = 0
            let positionY = Math.floor(Math.random() * this.mapSize[1])
            let isEnableToPlace = true
    
            for (let y = positionY; y < positionY + height; y++) {
                for (let x = positionX; x < positionX + width; x++) {
                    if (this.map[y][x].type === 2) {
                        isEnableToPlace = false
                        break
                    }
                }
            }
            if (isEnableToPlace) {
                position = positionY
                break
            }
        }
        return position
    }

    findPositionForVerticalRoadOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = Math.floor(Math.random() * this.mapSize[0])
            let positionY = 0
            let isEnableToPlace = true
    
            for (let y = positionY; y < positionY + height; y++) {
                for (let x = positionX; x < positionX + width; x++) {
                    if (this.map[y][x].type === 3) {
                        isEnableToPlace = false
                        break
                    }
                }
            }
            if (isEnableToPlace) {
                position = positionX
                break
            }
        }
        return position
    }

    findPositionForSwordOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = Math.floor(Math.random() * this.mapSize[0])
            let positionY = Math.floor(Math.random() * this.mapSize[1])
            let isEnableToPlace = true
            let onRoad = false
    
            if (((positionX + width) >= this.mapSize[0]) || ((positionY + height) >= this.mapSize[1])) {
                isEnableToPlace = false
            } else {
                for (let y = positionY; y < positionY + height; y++) {
                    for (let x = positionX; x < positionX + width; x++) {
                        if (this.map[y][x].type === 0 || this.map[y][x].type === 4) {
                            isEnableToPlace = false
                            break
                        }
                    }
                }
            }
            if (isEnableToPlace) {
                position = [positionX, positionY]
                break
            }
        }
        return position
    }

    findPositionForPotionOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = Math.floor(Math.random() * this.mapSize[0])
            let positionY = Math.floor(Math.random() * this.mapSize[1])
            let isEnableToPlace = true
    
            if (((positionX + width) >= this.mapSize[0]) || ((positionY + height) >= this.mapSize[1])) {
                isEnableToPlace = false
            } else {
                for (let y = positionY; y < positionY + height; y++) {
                    for (let x = positionX; x < positionX + width; x++) {
                        if (this.map[y][x].type === 0 || this.map[y][x].type === 5) {
                            isEnableToPlace = false
                            break
                        }
                    }
                }
            }
            if (isEnableToPlace) {
                position = [positionX, positionY]
                break
            }
        }
        return position
    }

    findPositionForUnitOnMap(width, height) {
        let position = undefined
        while (true) {

            let positionX = Math.floor(Math.random() * this.mapSize[0])
            let positionY = Math.floor(Math.random() * this.mapSize[1])
            let isEnableToPlace = true
    
            if (((positionX + width) >= this.mapSize[0]) || ((positionY + height) >= this.mapSize[1])) {
                isEnableToPlace = false
            } else {
                for (let y = positionY; y < positionY + height; y++) {
                    for (let x = positionX; x < positionX + width; x++) {
                        if (this.map[y][x].type === 0 || this.map[y][x].type === 4 || this.map[y][x].type === 5 || this.map[y][x].type === 6 || this.map[y][x].type === 7 || this.map[y][x].unit !== undefined) {
                            isEnableToPlace = false
                            break
                        }
                    }
                }
            }
            if (isEnableToPlace) {
                position = [positionX, positionY]
                break
            }
        }
        return position
    }

    generateRooms() {
        let numberOfRooms = 5 + Math.floor(Math.random() * 5)

        for (let room = 0; room < numberOfRooms; room++) {
            let roomWidth = 3 + Math.floor(Math.random() * 5)
            let roomLength = 3 + Math.floor(Math.random() * 5)
            let roomProps = this.findPositionForRoomOnMap(roomLength, roomWidth)

            this.placeItemOnMap(1, roomProps[0], roomProps[1], roomLength, roomWidth)
        }
    }

    genegateRoads() {
        let numberOfHorizontalRoads = 3 + Math.floor(Math.random() * 2)
        let numberOfVerticalRoads = 3 + Math.floor(Math.random() * 2)


        for (let hRoad = 0; hRoad < numberOfHorizontalRoads; hRoad++) {
            let positionY = this.findPositionForHorizontalRoadOnMap(this.mapSize[0], 1)
            this.placeItemOnMap(2, 0, positionY, this.mapSize[0], 1)
        }

        for (let vRoad = 0; vRoad < numberOfVerticalRoads; vRoad++) {
            let positionX = this.findPositionForVerticalRoadOnMap(1, this.mapSize[1])
            this.placeItemOnMap(3, positionX, 0, 1, this.mapSize[1])
        }
    }

    generateSwords(numberOfSwords) {
        for (let sword = 0; sword < numberOfSwords; sword++) {
            let swordProps = this.findPositionForSwordOnMap(1, 1)

            this.placeItemOnMap(4, swordProps[0], swordProps[1], 1, 1)
        }
    }

    generatePotions(numberOfPotions) {
        for (let potion = 0; potion < numberOfPotions; potion++) {
            let potionProps = this.findPositionForPotionOnMap(1, 1)

            this.placeItemOnMap(5, potionProps[0], potionProps[1], 1, 1)
        }
    }

    generateHero() {
        let heroProps = this.findPositionForUnitOnMap(1, 1)

        this.placeUnitOnMap("hero", heroProps[0], heroProps[1])
        this.hero.position = heroProps
    }

    generateEnemies(numberOfEnemies) {
        for (let enemy = 0; enemy < numberOfEnemies; enemy++) {
            let enemyProps = this.findPositionForUnitOnMap(1, 1)
            this.placeUnitOnMap(enemy, enemyProps[0], enemyProps[1])
            this.enemies.push(
                {
                    id: enemy,
                    position: enemyProps,
                    hp: 100,
                    damage: 10,
                    status: 1
                }
            )
        }
    }

    //Atack

    enemyAtack(enemy) {
        if (enemy.status === 1) {
            let heroPositionX = this.hero.position[0]
            let heroPositionY = this.hero.position[1]
            for (let y = enemy.position[1] - 1; y <= enemy.position[1] + 1; y++) {
                for (let x = enemy.position[0] - 1; x <= enemy.position[0] + 1; x++) {
                    let unit = this.map?.at(y)?.at(x).unit
                    if (unit === "hero") {
                        if ( this.hero.hp - enemy.damage <= 0 ) {
                            this.hero.hp -= enemy.damage
                            this.hero.status = 0
                            this.map[heroPositionY][heroPositionX] = {
                                type: this.map[heroPositionY][heroPositionX].type,
                                unit: undefined
                            }
                        } else {
                            this.hero.hp -= enemy.damage
                        }
                        this.render()
                    }
                }   
            }
        }
    }

    heroAttack() {
        let heroPositionX = this.hero.position[0]
        let heroPositionY = this.hero.position[1]

        for (let y = heroPositionY - 1; y <= heroPositionY + 1; y++) {
            for (let x = heroPositionX - 1; x <= heroPositionX + 1; x++) {
                let unit = this.map?.at(y)?.at(x).unit
                if (typeof unit === "number") {
                    this.enemies = this.enemies.map(enemy => {
                        if (enemy.status === 1 && enemy.id === unit) {
                            if (enemy.hp - this.hero.damage <= 0) {
                                this.map[enemy.position[1]][enemy.position[0]] = {
                                    type: this.map[enemy.position[1]][enemy.position[0]].type,
                                    unit: undefined
                                }
                                return {
                                    id: enemy.id,
                                    position: enemy.position,
                                    hp: enemy.hp - this.hero.damage,
                                    damage: enemy.damage,
                                    status: 0
                                }
                            } else {
                                return {
                                    id: enemy.id,
                                    position: enemy.position,
                                    hp: enemy.hp - this.hero.damage,
                                    damage: enemy.damage,
                                    status: enemy.status
                                }
                            }
                        } else {
                            return enemy
                        }
                    })
                }
            }   
        }
        this.render()
        this.checkWin()
    }

    //Helpers

    checkPotionTake() {
        let positionX = this.hero.position[0]
        let positionY = this.hero.position[1]

        let currentCell = this.map[positionY][positionX]
        if (currentCell.type === 5) {
            this.hero.hp += 20
            this.map[positionY][positionX] = {
                type: 1,
                unit: this.map[positionY][positionX].unit
            }
        }
    }

    checkSwordTake() {
        let positionX = this.hero.position[0]
        let positionY = this.hero.position[1]

        let currentCell = this.map[positionY][positionX]
        if (currentCell.type === 4) {
            this.hero.damage += 20
            this.map[positionY][positionX] = {
                type: 1,
                unit: this.map[positionY][positionX].unit
            }
        }
    }

    checkWin() {
        let result = true
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].status !== 0) {
                result = false
            }
        }
        if (result) {
            alert("Congratulations! You cleared the dungeon")
        }
    }

    alertLose(atackIntervalId) {
        clearInterval(atackIntervalId)
        alert("You died")
    }

    //Movement

    checkIsMoveEnable(toPositionX, toPositionY) {
        if (toPositionX >= 0 && toPositionX < this.mapSize[0] && toPositionY >= 0 && toPositionY < this.mapSize[1]) {
            let cell = this.map?.at(toPositionY)?.at(toPositionX)
            if (!!cell?.type && cell.type !== 0) {
                if (cell?.unit === "hero" && this.hero.status === 1) {
                    return false
                }
                else if (typeof cell?.unit === "number") {
                    let enemy = this.enemies.filter(it => it.id === cell.unit)[0]
                    if (enemy.status === 0) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }

    moveEnemy(step, enemy) {
        let positionX = enemy.position[0]
        let positionY = enemy.position[1]

        let toPositionX = positionX + step[0]
        let toPositionY = positionY + + step[1]

        if (this.checkIsMoveEnable(toPositionX, toPositionY)) {
            this.map[positionY][positionX] = {
                type: this.map[positionY][positionX].type, 
                unit: undefined
            }
            this.map[toPositionY][toPositionX] = {
                type: this.map[toPositionY][toPositionX].type, 
                unit: enemy.id
            }
            this.enemies = this.enemies.map(it => {
                if (it.id === enemy.id) {
                    return {
                        id: it.id,
                        position: [toPositionX, toPositionY],
                        hp: it.hp,
                        damage: it.damage,
                        status: it.status
                    }
                } else {
                    return it
                }
            })
            this.render()
        }
    }

    async enemiesMoveLogic() {
        this.enemies.forEach(enemy => {
            if (enemy.status === 1) {
                let direction = Math.floor(Math.random() * 3)

                let step                
                switch (direction) {
                    case 0: {
                        step = [0, -1]
                        break
                    }
                    case 1: {
                        step = [0, 1]
                        break
                    }
                    case 2: {
                        step = [-1, 0]
                        break
                    }
                    case 3: {
                        step = [1, 0]
                        break
                    }
                }

                this.moveEnemy(step, enemy)
                    this.render()
                }
            }
        )
    }

    addMoveEventListener() {
        document.addEventListener("keypress", (event) => {
            const keyName = event.key;

            switch (keyName) {
                case "w": {
                    this.moveHero([0, -1])
                    this.checkPotionTake()
                    this.checkSwordTake()
                    this.render()
                    break
                }
                case "s": {
                    this.moveHero([0, 1])
                    this.checkPotionTake()
                    this.checkSwordTake()
                    this.render()
                    break
                }
                case "a": {
                    this.moveHero([-1, 0])
                    this.checkPotionTake()
                    this.checkSwordTake()
                    this.render()
                    break
                }
                case "d": {
                    this.moveHero([1, 0])
                    this.checkPotionTake()
                    this.checkSwordTake()
                    this.render()
                    break
                }
                case " ": {
                    this.heroAttack()
                }
            }
          });
    }

    moveHero(step) {
        if (this.hero.status === 1) {
            let currentHeroX = this.hero.position[0]
            let currentHeroY = this.hero.position[1]

            let toPositionX = currentHeroX + step[0]
            let toPositionY = currentHeroY + step[1]

            if (this.checkIsMoveEnable(toPositionX, toPositionY)) {
                this.map[currentHeroY][currentHeroX] = { 
                    type: this.map[currentHeroY][currentHeroX].type, 
                    unit: undefined
                } 
                this.map[toPositionY][toPositionX] = {
                    type: this.map[toPositionY][toPositionX].type, 
                    unit: "hero"
                }

                this.hero.position = [toPositionX, toPositionY]
            }
        }
    }

    //Rendering

    render() {
        let field = document.getElementsByClassName('field')[0]
        field.innerHTML = ``
        field.style = `
            display: grid;
            grid-template-columns: repeat(${this.mapSize[0]}, 1fr);
            grid-template-rows: repeat(${this.mapSize[1]}, 1fr);
        `

        this.map.map((row, rowIndex) => {
            row.map((cell, cellIndex) => {
                let cellWrapperElement = document.createElement("div")
                let cellElement = document.createElement("img")
                cellWrapperElement.style = `
                    class: tile;
                    position: relative;
                `
                cellElement.style = `
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 1 / 1;
                `

                if (cell.unit !== undefined) {
                    if (cell.unit === "hero") {
                        cellElement.src = "./images/tile-P.png"
                        let hpBar = document.createElement("div")

                        hpBar.style = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 4px;
                            background: green;
                            z-index: 1;
                            width: ${this.hero.hp}%;
                        `
                        cellWrapperElement.appendChild(hpBar)
                    } else {
                        cellElement.src = "./images/tile-E.png"
                        let hpBar = document.createElement("div")

                        let enemy = this.enemies.filter(it => it.id === this.map[rowIndex][cellIndex].unit)[0]
                        hpBar.style = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 4px;
                            background: red;
                            z-index: 1;
                            width: ${enemy.hp}%;
                        `
                        cellWrapperElement.appendChild(hpBar)
                    }
                }
                else {
                    switch(cell.type) {
                        case 0: {
                            cellElement.src = "./images/tile-W.png"
                            break
                        }
                        case 1: {
                            cellElement.src = "./images/tile-.png"
                            break
                        }
                        case 2: {
                            cellElement.src = "./images/tile-.png"
                            break
                        }
                        case 3: {
                            cellElement.src = "./images/tile-.png"
                            break
                        }
                        case 4: {
                            cellElement.src = "./images/tile-SW.png"
                            break
                        }
                        case 5: {
                            cellElement.src = "./images/tile-HP.png"
                            break
                        }
                    }
                }
                cellWrapperElement.appendChild(cellElement)
                field.appendChild(cellWrapperElement)
            })
        })
    }

    //Initalization

    init() {

        this.createMap(40, 24)
        this.fillMap(0)
        this.genegateRoads()
        this.generateRooms()
        this.generateSwords(2)
        this.generatePotions(10)
        this.generateHero()
        this.generateEnemies(10)
        this.addMoveEventListener()
        this.render()

        setInterval(() => {
            this.enemiesMoveLogic()
        }, 1000)

        let atackIntervalId = setInterval(() => {
            if (this.hero.status === 1) {
                this.enemies.map(enemy => {
                    if (enemy.status === 1) {
                        this.enemyAtack(enemy)
                    }
                })
            } else {

                this.alertLose(atackIntervalId)
                
            }
        }, 1000)
    }
}
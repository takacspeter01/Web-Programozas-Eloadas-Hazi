// Alap állat class
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return `${this.name} hangot ad ki.`;
  }
}

// Madár class, amely kiterjeszti az Állatot
class Bird extends Animal {
  constructor(name, canFly) {
    super(name);
    this.canFly = canFly;
  }

  makeSound() {
    return `${this.name} csiripel. ${this.canFly ? "Tud repülni!" : "Nem tud repülni."}`;
  }
}

// Állatok létrehozása és DOM-ba helyezése
function createZoo() {
  const zoo = document.getElementById('zoo');
  zoo.innerHTML = ''; // tisztítás

  const lion = new Animal("Oroszlán");
  const parrot = new Bird("Papagáj", true);
  const penguin = new Bird("Pingvin", false);

  const animals = [lion, parrot, penguin];

  animals.forEach(animal => {
    const p = document.createElement('p');
    p.textContent = animal.makeSound();
    document.body.appendChild(p);
    zoo.appendChild(p);
  });
}
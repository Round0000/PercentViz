function getPercents(data) {
  data.forEach((el) => {});
}

function getRadient(d) {
  let str = "";

  let prev = 0;

  d.forEach((el) => {
    str += el.clr + " " + prev + "% " + (el.percent + prev) + "%, ";
    prev += el.percent;
  });

  str = str.slice(0, -2);

  return str;
}

function displayGradient(str) {
  camembert.style.background = `
    conic-gradient(
        ${str} 
    )
    `;
  container.style.opacity = "1";
}

function displayLegende(data, total) {
  legende.innerHTML = `<p id="total">Total: <span>${total}</span></p>`;
  data.forEach((el) => {
    const item = document.createElement("DIV");
    item.classList.add("item");
    item.innerHTML = `
            <p class="title">${el.title}</p>
            <p class="chiffre"><span>${el.percent}</span>% (${el.chiffre})</p>
        `;
    item.style.borderLeft = "8px solid " + el.clr;
    legende.append(item);
  });
}

// Add input box
addInput.addEventListener("click", (e) => {
  const box = document.createElement("DIV");
  box.classList.add("inputBox");
  box.innerHTML = `
        <label>
          Couleur
          <input type="color" />
        </label>
        <label>
          Intitulé
          <input type="text" />
        </label>
        <label>
          Chiffre
          <input type="number" />
        </label>
        <button class="removeInput">Remove</button>
        `;
  inputs.append(box);
});

// Listen to box removal
form.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeInput")) {
    e.target.parentElement.remove();
  }
});

// User input submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.submitter.id != "submitBtn") return;

  const items = form.querySelectorAll(".inputBox");

  const inputData = [];

  let total = 0;
  form.querySelectorAll("input[type='number']").forEach((el) => {
    total += Number(el.value);
  });

  items.forEach((el) => {
    inputData.push({
      title: el.querySelector("input[type='text']").value,
      clr: el.querySelector("input[type='color']").value,
      chiffre: el.querySelector("input[type='number']").value,
      percent: Math.round(
        (el.querySelector("input[type='number']").value / total) * 100
      ),
    });
  });

  console.log(inputData);

  displayGradient(getRadient(inputData));
  displayLegende(inputData, total);
});

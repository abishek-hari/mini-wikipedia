const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formContainer = document.querySelector(".form");
const inputBox = document.querySelector(".form-input");
const resultBox = document.querySelector(".results");

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputBox.value;
  if (!value) {
    resultBox.innerHTML = `<div class="error">please enter a valid term</div>`;
    return;
  }
  fetchPage(value);
  inputBox.value = "";
});

const fetchPage = async (searchValue) => {
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultBox.innerHTML = `<div class="error">no matches found.please try later</div>`;
    }
    renderResult(results);
  } catch (error) {
    resultBox.innerHTML = `<div class="error">there was an error...</div>`;
  }
};

const renderResult = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
      <h4>${title}</h4>
      <p>
        ${snippet}
      </p>
    </a>`;
    })
    .join("");
  resultBox.innerHTML = `<div class="articles">
    ${cardsList}
    </div>`;
};

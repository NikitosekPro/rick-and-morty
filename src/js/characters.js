const API_URL = 'https://rickandmortyapi.com/api/character';

const nameInput = document.querySelector('.filter-item input');
const selects = document.querySelectorAll('.filter-item select');
const loadMoreBtn = document.querySelector('.load-more');
const filtersWrapper = document.querySelector('.characters-main-flex');

let cardsContainer = document.querySelector('.cards-list');
if (!cardsContainer) {
  cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-list';

  if (loadMoreBtn) filtersWrapper.insertBefore(cardsContainer, loadMoreBtn);
  else filtersWrapper.appendChild(cardsContainer);
}

let currentPage = 1;
let totalPages = 1;

let currentFilters = {
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
};

function mapSelectValue(labelText, optionText) {
  const txt = optionText.trim().toLowerCase();
  if (txt === 'all' || txt === 'none' || txt === 'other') return '';
  return txt;
}

function debounce(fn, wait = 350) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

async function fetchCharacters(page = 1) {
  const params = new URLSearchParams();
  params.set('page', page);

  if (currentFilters.name) params.set('name', currentFilters.name);
  if (currentFilters.status) params.set('status', currentFilters.status);
  if (currentFilters.species) params.set('species', currentFilters.species);
  if (currentFilters.type) params.set('type', currentFilters.type);
  if (currentFilters.gender) params.set('gender', currentFilters.gender);

  try {
    const res = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) {
      if (res.status === 404) {
        return { info: { pages: 0 }, results: [] };
      }
      throw new Error('Network error');
    }
    return await res.json();
  } catch (err) {
    console.error('Fetch error', err);
    return { info: { pages: 0 }, results: [] };
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createCard(character) {
  const div = document.createElement('div');
  div.className = 'char-card';
  div.dataset.id = character.id;

  div.innerHTML = `
    <img src="${character.image}" alt="${escapeHtml(character.name)}" />
    <div class="content">
      <h3>${escapeHtml(character.name)}</h3>
      <p>Status: ${escapeHtml(character.status)}</p>
      <p>Species: ${escapeHtml(character.species)}</p>
      <p>Gender: ${escapeHtml(character.gender)}</p>
    </div>
  `;
  return div;
}

function render(characters, append = false) {
  if (!append) cardsContainer.innerHTML = '';

  if (!characters.length) {
    cardsContainer.innerHTML = `
      <div class="no-results">
        <img src="./img/try-looking-for-something-else.png" alt="No results" />
        <p>Oops! Try looking for something else...</p>
      </div>
    `;
    return;
  }

  characters.forEach(ch => {
    cardsContainer.appendChild(createCard(ch));
  });
}

async function loadInitial() {
  currentPage = 1;
  const data = await fetchCharacters(currentPage);
  totalPages = data.info.pages;
  render(data.results);

  updateLoadMoreButton();
}

loadInitial();

async function loadMore() {
  if (currentPage >= totalPages) return;

  currentPage++;
  const data = await fetchCharacters(currentPage);
  render(data.results, true);

  updateLoadMoreButton();
}

function updateLoadMoreButton() {
  if (currentPage >= totalPages) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

loadMoreBtn?.addEventListener('click', loadMore);

nameInput.addEventListener(
  'input',
  debounce(() => {
    currentFilters.name = nameInput.value.trim().toLowerCase();
    loadInitial();
  }, 400)
);

selects.forEach(select => {
  select.addEventListener('change', () => {
    const label = select.previousElementSibling.textContent
      .trim()
      .toLowerCase();
    const val = mapSelectValue(label, select.value);
    currentFilters[label] = val;

    loadInitial();
  });
});

// script.js
const API_URL = 'https://rickandmortyapi.com/api/character';

// знайдемо елементи фільтрів
const nameInput = document.querySelector('.filter-item input');
const selects = document.querySelectorAll('.filter-item select');
const loadMoreBtn = document.querySelector('.load-more');
const filtersWrapper = document.querySelector('.characters-main-flex');

// створимо або знайдемо контейнер для карток
let cardsContainer = document.querySelector('.cards-list');
if (!cardsContainer) {
cardsContainer = document.createElement('div');
cardsContainer.className = 'cards-list';
  // вставимо контейнер перед кнопкою Load more (якщо є)
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

// helper: нормалізація значення select (текст -> API value)
// якщо в опціях є "All"/"None"/"Other" використовуємо пустий фільтр
function mapSelectValue(labelText, optionText) {
const txt = optionText.trim().toLowerCase();

if (txt === 'all' || txt === 'none' || txt === 'other') return '';

  // деякі мапи не потрібні — API приймає 'alive','dead','unknown','male','female','genderless'
if (labelText === 'status') {
    // варіанти: Alive, Dead, Unknown
    return txt;
}
if (labelText === 'gender') {
    // All, Female, Male, Genderless, Unknown
    return txt;
}
  // species and type: API expects plain text (human, alien, etc.)
return txt;
}

// debounce для поля ім'я
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
        // немає результатів
        return { info: { pages: 0 }, results: [] };
    }
    throw new Error('Network error');
    }
    const data = await res.json();
    return data;
} catch (err) {
    console.error('Fetch error', err);
    return { info: { pages: 0 }, results: [] };
}
}

function createCard(character) {
const div = document.createElement('div');
div.className = 'char-card';
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

function escapeHtml(str) {
return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// рендер (append = true -> додає до існуючих; інакше перезапис)
function render(characters, append = false) {
if (!append) cardsContainer.innerHTML = '';

if (characters.length === 0) {
    const empty = document.createElement('div');
    empty.style.padding = '12px';
    empty.style.color = '#6b7280';
    empty.textContent = 'No characters found';
    cardsContainer.appendChild(empty);
    return;
}

characters.forEach(ch => {
    const card = createCard(ch);
    cardsContainer.appendChild(card);
});
}

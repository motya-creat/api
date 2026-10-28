const app = document.getElementById('app');
const statusEl = document.getElementById('status');

function renderArticles(data) {
  if (!data || !Array.isArray(data)) {
    statusEl.textContent = 'Нет данных для отображения';
    return;
  }

  const listHtml = data.slice(0, 3).map(article => 
    `<li>
      <strong>${article.title}</strong>
      <p style="margin:5px 0 15px; color:#555;">${article.body.substring(0, 100)}...</p>
    </li>`
  ).join('');

  app.innerHTML = `ы
    <h2>📰 Лента статей (Hexlet API)</h2>
    <ul style="list-style: none; padding: 0;">${listHtml}</ul>
  `;
  statusEl.textContent = '';
  statusEl.style.color = '#333';
}

function handleError(message) {
  app.innerHTML = '';
  statusEl.textContent = message;
  
  if (message.includes('403')) {
    statusEl.style.color = 'red';
  } else {
    statusEl.style.color = '#666';
  }
}

async function loadArticles() {
  try {
    const res = await fetch('https://http.hexlet.app/api/articles');
    
    if (res.status === 403) {
      throw new Error('Доступ запрещён (403). У вас нет прав на просмотр.');
    }
    
    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    const data = await res.json();
    renderArticles(data);
    
  } catch (e) {
    handleError(e.message);
  }
}

loadArticles();

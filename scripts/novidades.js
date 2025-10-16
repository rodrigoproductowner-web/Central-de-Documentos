document.addEventListener('DOMContentLoaded', () => {
  fetch('scripts/novidades.json')
    .then(response => response.json())
    .then(lista => {
      const container = document.getElementById('novidades');
      if (!container) return;

      // Cria título e lista
      container.innerHTML = '<h3>Novidades</h3><ul id="lista-novidades"><li>Carregando novidades...</li></ul>';
      const listaEl = document.getElementById('lista-novidades');
      listaEl.innerHTML = ''; // limpa o "Carregando..."

      const recentes = lista
        .map(item => ({ ...item, data: new Date(item.data) }))
        .sort((a, b) => b.data - a.data)
        .slice(0, 5);

      if (recentes.length === 0) {
        listaEl.innerHTML = '<li>Nenhuma novidade recente.</li>';
        return;
      }

      recentes.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.href}" target="_blank">${item.texto}</a> (${item.data.toLocaleDateString()})`;
        listaEl.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar novidades:', error);
    });
});
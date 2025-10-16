document.addEventListener('DOMContentLoaded', () => {
  fetch('scripts/novidades.json')
    .then(response => response.json())
    .then(lista => {
      const container = document.getElementById('novidades');
      if (!container) return;

      const recentes = lista
        .map(item => ({ ...item, data: new Date(item.data) }))
        .sort((a, b) => b.data - a.data)
        .slice(0, 5);

      recentes.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.texto;
        link.target = '_blank';

        const data = document.createElement('span');
        data.textContent = ` (${item.data.toLocaleDateString()})`;

        const div = document.createElement('div');
        div.appendChild(link);
        div.appendChild(data);

        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar novidades:', error);
    });
});


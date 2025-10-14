const destinos = ['manuais/manuais.html', 'faq/faq.html', 'utilitarios/utilitarios.html'];
const novidadesBox = document.getElementById('novidades');
const arquivos = [];



destinos.forEach(pagina => {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('ul li a');

      links.forEach(link => {
			const href = link.getAttribute('href');
			const texto = link.textContent.trim();

		if (href && href.endsWith('.pdf')|| href.endsWith('.sql')) {
			const baseUrl = pagina.substring(0, pagina.lastIndexOf('/') + 1); // 'faq/', 'manuais/', etc.
			const fullHref = baseUrl + href;
			arquivos.push({ texto, href: fullHref });
		}
       /* const href = link.getAttribute('href');
        const texto = link.textContent.trim();

        if (href && href.endsWith('.pdf')) {
          arquivos.push({ texto, href });
        }*/
      });

      // Quando todas as páginas forem processadas
      if (arquivos.length >= 5 || pagina === destinos[destinos.length - 1]) {
        const promessas = arquivos.map(arquivo =>
          fetch(arquivo.href, { method: 'HEAD' })
            .then(res => {
              const modificado = res.headers.get('Last-Modified');
              arquivo.data = modificado ? new Date(modificado) : new Date(0);
            })
            .catch(() => {
              arquivo.data = new Date(0); // Se falhar, usa data antiga
            })
        );

        Promise.all(promessas).then(() => {
          const recentes = arquivos
            .sort((a, b) => b.data - a.data)
            .slice(0, 5);

          novidadesBox.innerHTML = '<h3>Novidades</h3><ul>' +
            recentes.map(item => `<li><a href="${item.href}" target="_blank">${item.texto}</a></li>`).join('') +
            '</ul>';
        });
      }
    })
    .catch(err => console.error(`Erro ao carregar ${pagina}:`, err));
});
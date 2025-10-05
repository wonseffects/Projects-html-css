document.addEventListener('DOMContentLoaded', () => {

    // --- Banco de Dados dos Campeões (Melhoria: Fácil de atualizar) ---
    const champions = [
        { name: 'Ahri', title: 'the Nine-Tailed Fox', role: 'Mid', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg', isFree: true },
        { name: 'Jinx', title: 'the Loose Cannon', role: 'ADC', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg', isFree: false },
        { name: 'Thresh', title: 'the Chain Warden', role: 'Support', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg', isFree: false },
        { name: 'Lee Sin', title: 'the Blind Monk', role: 'Jungle', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg', isFree: false },
        { name: 'Lux', title: 'the Lady of Luminosity', role: 'Mid', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg', isFree: true },
        { name: 'Darius', title: 'the Hand of Noxus', role: 'Top', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg', isFree: false },
        { name: 'Ezreal', title: 'the Prodigal Explorer', role: 'ADC', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg', isFree: false },
        { name: 'Yasuo', title: 'the Unforgiven', role: 'Mid', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg', isFree: true },
        { name: 'Ashe', title: 'the Frost Archer', role: 'ADC', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg', isFree: true },
        { name: 'Garen', title: 'the Might of Demacia', role: 'Top', image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg', isFree: true },
    ];

    const championGrid = document.getElementById('champion-grid');
    const searchInput = document.getElementById('main-search');
    const positionFilters = document.querySelectorAll('.position-filter');

    // --- Função para Renderizar os Campeões na Tela ---
    function displayChampions(filteredChampions) {
        championGrid.innerHTML = ''; // Limpa a grade antes de adicionar novos cards
        
        filteredChampions.forEach(champion => {
            const card = document.createElement('div');
            card.className = 'champion-card';
            
            card.innerHTML = `
                <img src="${champion.image}" alt="${champion.name}" class="bg-image">
                ${champion.isFree ? '<div class="free-tag">FREE</div>' : ''}
                <div class="card-overlay">
                    <div class="champion-info">
                        <h3>${champion.name}</h3>
                        <p>${champion.title}</p>
                        <a href="#" class="play-button">Play Now</a>
                    </div>
                </div>
                <div class="role-tag">${champion.role}</div>
            `;
            championGrid.appendChild(card);
        });
    }

    // --- Função para Filtrar e Atualizar a Tela ---
    function filterAndDisplay() {
        const searchTerm = searchInput.value.toLowerCase();
        const activePositions = Array.from(positionFilters)
                                     .filter(cb => cb.checked && cb.value !== 'all')
                                     .map(cb => cb.value);

        let filtered = champions;

        // 1. Filtra por busca
        if (searchTerm) {
            filtered = filtered.filter(champ => 
                champ.name.toLowerCase().includes(searchTerm) ||
                champ.title.toLowerCase().includes(searchTerm)
            );
        }

        // 2. Filtra por posição
        if (activePositions.length > 0) {
            filtered = filtered.filter(champ => activePositions.includes(champ.role));
        }

        displayChampions(filtered);
    }

    // --- Lógica para os checkboxes de posição ---
    positionFilters.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const allPositionsCheckbox = document.getElementById('pos-all');
            
            if (e.target.id === 'pos-all') {
                // Se "All" for marcado, desmarca os outros
                if (e.target.checked) {
                    positionFilters.forEach(cb => {
                        if(cb.id !== 'pos-all') cb.checked = false;
                    });
                }
            } else {
                // Se outro for marcado, desmarca "All"
                if (e.target.checked) {
                    allPositionsCheckbox.checked = false;
                }
            }

            // Se nenhum filtro específico estiver marcado, marca "All"
            const anySpecificChecked = Array.from(positionFilters).some(cb => cb.id !== 'pos-all' && cb.checked);
            if (!anySpecificChecked) {
                allPositionsCheckbox.checked = true;
            }

            filterAndDisplay();
        });
    });

    // --- Adiciona o evento de "input" para a busca ---
    searchInput.addEventListener('input', filterAndDisplay);

    // --- Exibição Inicial ---
    displayChampions(champions); 
});
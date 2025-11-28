

// Dados em localStorage
const STORAGE_LOTES = 'agrosmart_lotes';
const STORAGE_PLANTAS = 'agrosmart_plantas';
const STORAGE_NOTIFICACOES = 'agrosmart_notificacoes';

// Função para determinar estação
function getEstacao(data) {
  const date = new Date(data);
  const mes = date.getMonth() + 1;
  if (mes >= 3 && mes <= 5) return 'primavera';
  if (mes >= 6 && mes <= 8) return 'verao';
  if (mes >= 9 && mes <= 11) return 'outono';
  return 'inverno';
}

// Inicializar dados
function initData() {
  if (!localStorage.getItem(STORAGE_LOTES)) localStorage.setItem(STORAGE_LOTES, JSON.stringify([]));
  if (!localStorage.getItem(STORAGE_PLANTAS)) localStorage.setItem(STORAGE_PLANTAS, JSON.stringify([]));
  if (!localStorage.getItem(STORAGE_NOTIFICACOES)) localStorage.setItem(STORAGE_NOTIFICACOES, JSON.stringify([]));
  if (!localStorage.getItem('agrosmart_profile')) {
    const defaultProfile = { name: 'Seu Paulo', email: '', phone: '', address: '', avatar: null };
    localStorage.setItem('agrosmart_profile', JSON.stringify(defaultProfile));
  }
  if (!localStorage.getItem('agrosmart_settings')) {
    const defaultSettings = { notifyEmail: true, notifyPush: true, theme: 'light' };
    localStorage.setItem('agrosmart_settings', JSON.stringify(defaultSettings));
  }
}

// Obter dados
function getLotes() {
  return JSON.parse(localStorage.getItem(STORAGE_LOTES) || '[]');
}

function getPlantas() {
  return JSON.parse(localStorage.getItem(STORAGE_PLANTAS) || '[]');
}

function getNotificacoes() {
  return JSON.parse(localStorage.getItem(STORAGE_NOTIFICACOES) || '[]');
}

// Salvar dados
function saveLotesToStorage(lotes) {
  localStorage.setItem(STORAGE_LOTES, JSON.stringify(lotes));
}

function savePlantasToStorage(plantas) {
  localStorage.setItem(STORAGE_PLANTAS, JSON.stringify(plantas));
}

function saveNotificacoesToStorage(notificacoes) {
  localStorage.setItem(STORAGE_NOTIFICACOES, JSON.stringify(notificacoes));
}

// Aqui adicionar notificação// 
function addNotificacao(tipo, titulo, texto) {
  const notificacoes = getNotificacoes();
  notificacoes.unshift({
    id: Date.now(),
    tipo: tipo,
    titulo: titulo,
    texto: texto,
    data: new Date().toLocaleString('pt-BR'),
    lido: false
  });
  saveNotificacoesToStorage(notificacoes);
  updateNotificationBadge();
}

// Aqui adiciona o badge de notificação //
function updateNotificationBadge() {
  const notificacoes = getNotificacoes();
  const naoLidas = notificacoes.filter(n => !n.lido).length;
  const badge = document.getElementById('notificationBadge');
  if (naoLidas > 0) {
    badge.classList.add('active');
    badge.classList.remove('hidden');
  } else {
    badge.classList.remove('active');
    badge.classList.add('hidden');
  }
}

// Modal Lotes
function openLoteModal() {
  document.getElementById('loteModal').classList.add('active');
  document.getElementById('loteDateCreated').valueAsDate = new Date();
}

function closeLoteModal() {
  document.getElementById('loteModal').classList.remove('active');
  document.getElementById('loteForm').reset();
}

function saveLote(e) {
  e.preventDefault();
  const lotes = getLotes();
  const newLote = {
    id: Date.now(),
    name: document.getElementById('loteName').value,
    area: parseFloat(document.getElementById('loteArea').value),
    localizacao: document.getElementById('loteLocal').value,
    dataCriacao: document.getElementById('loteDateCreated').value,
    ativo: true
  };
  lotes.push(newLote);
  saveLotesToStorage(lotes);
  closeLoteModal();
  renderLotes();
  renderPlantas();
  updateDashboard();
  addNotificacao('atualizacao', 'Novo Lote', `Lote "${newLote.name}" foi criado com sucesso`);
}

function deleteLote(id) {
  if (confirm('Tem certeza que deseja deletar este lote?')) {
    let lotes = getLotes();
    const lote = lotes.find(l => l.id === id);
    lotes = lotes.filter(l => l.id !== id);
    saveLotesToStorage(lotes);
    
    let plantas = getPlantas();
    plantas = plantas.filter(p => p.loteId !== id);
    savePlantasToStorage(plantas);
    
    renderLotes();
    renderPlantas();
    updateDashboard();
    addNotificacao('atualizacao', 'Lote Removido', `Lote "${lote?.name}" foi removido`);
  }
}

function renderLotes() {
  const lotes = getLotes();
  const container = document.getElementById('lotesContainer');
  
  if (lotes.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhum lote cadastrado</div></div>';
    return;
  }
  
  container.innerHTML = lotes.map(lote => `
    <div class="item-card">
      <h3>${lote.name}</h3>
      <div class="item-info">
        <span>Área: <strong>${lote.area} ha</strong></span>
        <span class="badge ativo">Ativo</span>
      </div>
      <div class="item-info">
        <span>📍 ${lote.localizacao || 'Sem localização'}</span>
      </div>
      <div class="item-info">
        <span>📅 ${new Date(lote.dataCriacao).toLocaleDateString('pt-BR')}</span>
      </div>
      <div class="item-actions">
        <button class="btn" onclick="deleteLote(${lote.id})">🗑️ Deletar</button>
      </div>
    </div>
  `).join('');
}

// Modal Plantas
function openPlantaModal() {
  const lotes = getLotes();
  if (lotes.length === 0) {
    alert('Crie um lote primeiro!');
    navigateTo('lotes');
    return;
  }
  
  const select = document.getElementById('plantaLote');
  select.innerHTML = lotes.map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  document.getElementById('plantaModal').classList.add('active');
}

function closePlantaModal() {
  document.getElementById('plantaModal').classList.remove('active');
  document.getElementById('plantaForm').reset();
}

function savePlanta(e) {
  e.preventDefault();
  const plantas = getPlantas();
  const lotes = getLotes();
  const loteId = parseInt(document.getElementById('plantaLote').value);
  const lote = lotes.find(l => l.id === loteId);
  
  const newPlanta = {
    id: Date.now(),
    name: document.getElementById('plantaName').value,
    type: document.getElementById('plantaType').value,
    loteId: loteId,
    dataPlantio: document.getElementById('plantaDataPlantio').value,
    dataColheita: document.getElementById('plantaDataColheita').value,
    status: document.getElementById('plantaStatus').value,
    estacao: getEstacao(document.getElementById('plantaDataPlantio').value)
  };
  plantas.push(newPlanta);
  savePlantasToStorage(plantas);
  closePlantaModal();
  renderPlantas();
  updateDashboard();
  addNotificacao('atualizacao', 'Nova Plantação', `"${newPlanta.name}" foi plantada no ${lote?.name}`);
}

function deletePlanta(id) {
  if (confirm('Tem certeza que deseja deletar esta planta?')) {
    let plantas = getPlantas();
    const planta = plantas.find(p => p.id === id);
    plantas = plantas.filter(p => p.id !== id);
    savePlantasToStorage(plantas);
    renderPlantas();
    updateDashboard();
    addNotificacao('atualizacao', 'Plantação Removida', `"${planta?.name}" foi removida`);
  }
}

function renderPlantas() {
  const plantas = getPlantas();
  const lotes = getLotes();
  const container = document.getElementById('plantasContainer');
  
  if (plantas.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhuma planta cadastrada</div></div>';
    return;
  }
  
  container.innerHTML = plantas.map(planta => {
    const lote = lotes.find(l => l.id === planta.loteId);
    return `
      <div class="item-card">
        <h3>${planta.name}</h3>
        <div class="item-info">
          <span>Tipo: <strong>${planta.type}</strong></span>
          <span class="badge ${planta.status}">${planta.status}</span>
        </div>
        <div class="item-info">
          <span>Lote: <strong>${lote?.name || 'Lote removido'}</strong></span>
        </div>
        <div class="item-info">
          <span>📅 Plantio: ${new Date(planta.dataPlantio).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="item-info">
          <span>🌾 Colheita: ${new Date(planta.dataColheita).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="item-actions">
          <button class="btn" onclick="deletePlanta(${planta.id})">🗑️ Deletar</button>
        </div>
      </div>
    `;
  }).join('');
}

// Dashboard
function updateDashboard() {
  const lotes = getLotes();
  const plantas = getPlantas();
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  // Total de lotes
  document.getElementById('totalLotes').textContent = lotes.length;
  
  // Plantas ativas
  const plantasAtivas = plantas.filter(p => p.status === 'ativo').length;
  document.getElementById('plantasAtivas').textContent = plantasAtivas;
  
  // Colheitas próximas (próximos 30 dias) - inclui plantas com status ativo ou inativo
  const colheitasProximas = plantas.filter(p => {
    if (p.status === 'colhido') return false;
    
    // Trata a data corretamente
    let dataColheita;
    if (p.dataColheita instanceof Date) {
      dataColheita = new Date(p.dataColheita);
    } else {
      dataColheita = new Date(p.dataColheita + 'T00:00:00');
    }
    dataColheita.setHours(0, 0, 0, 0);
    
    const diasAte = Math.floor((dataColheita - hoje) / (1000 * 60 * 60 * 24));
    
    // Mostrar colheitas de hoje em diante, nos próximos 30 dias
    return diasAte >= 0 && diasAte <= 30;
  });
  
  document.getElementById('colheitasProximas').textContent = colheitasProximas.length;
  
  // Verificar colheitas próximas e adicionar alertas
  colheitasProximas.forEach(planta => {
    let dataColheita;
    if (planta.dataColheita instanceof Date) {
      dataColheita = new Date(planta.dataColheita);
    } else {
      dataColheita = new Date(planta.dataColheita + 'T00:00:00');
    }
    dataColheita.setHours(0, 0, 0, 0);
    const diasAte = Math.floor((dataColheita - hoje) / (1000 * 60 * 60 * 24));
    if (diasAte <= 7 && diasAte >= 0) {
      const notificacoes = getNotificacoes();
      const jaNotificado = notificacoes.some(n => n.texto.includes(`"${planta.name}"`));
      if (!jaNotificado) {
        addNotificacao('colheita', 'Colheita Próxima', `"${planta.name}" será colhida em ${diasAte} dias`);
      }
    }
  });
  
  // Renderizar próximas colheitas
  const container = document.getElementById('colheitasContainer');
  if (colheitasProximas.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhuma colheita próxima</div></div>';
  } else {
    const colheitasOrdenadas = colheitasProximas.sort((a, b) => {
      let dataA, dataB;
      if (a.dataColheita instanceof Date) {
        dataA = new Date(a.dataColheita);
      } else {
        dataA = new Date(a.dataColheita + 'T00:00:00');
      }
      if (b.dataColheita instanceof Date) {
        dataB = new Date(b.dataColheita);
      } else {
        dataB = new Date(b.dataColheita + 'T00:00:00');
      }
      dataA.setHours(0, 0, 0, 0);
      dataB.setHours(0, 0, 0, 0);
      return dataA - dataB;
    });
    
    container.innerHTML = colheitasOrdenadas.map(planta => {
      const lote = lotes.find(l => l.id === planta.loteId);
      let dataColheita;
      if (planta.dataColheita instanceof Date) {
        dataColheita = new Date(planta.dataColheita);
      } else {
        dataColheita = new Date(planta.dataColheita + 'T00:00:00');
      }
      dataColheita.setHours(0, 0, 0, 0);
      const diasAte = Math.floor((dataColheita - hoje) / (1000 * 60 * 60 * 24));
      const urgencia = diasAte <= 7 ? 'proximo' : 'ativo';
      
      return `
        <div class="item-card">
          <h3>${planta.name}</h3>
          <div class="item-info">
            <span>Lote: <strong>${lote?.name || 'Lote removido'}</strong></span>
            <span class="badge ${urgencia}">Em ${diasAte} dias</span>
          </div>
          <div class="item-info">
            <span>Tipo: ${planta.type}</span>
          </div>
          <div class="item-info">
            <span>📅 Colheita: ${dataColheita.toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Atividades Recentes
  renderAtividades();
  
  // Renderizar notificações
  renderNotificacoes();
}

// Atividades Recentes
function renderAtividades() {
  const plantas = getPlantas();
  const lotes = getLotes();
  const container = document.getElementById('atividadesContainer');
  
  // Últimas 5 plantas plantadas (ordem decrescente por data)
  const plantasRecentes = [...plantas]
    .sort((a, b) => new Date(b.dataPlantio) - new Date(a.dataPlantio))
    .slice(0, 5);
  
  if (plantasRecentes.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhuma atividade recente</div></div>';
    return;
  }
  
  container.innerHTML = plantasRecentes.map(planta => {
    const lote = lotes.find(l => l.id === planta.loteId);
    const estacao = getEstacao(planta.dataPlantio);
    const estagaoLabel = { primavera: '🌸', verao: '☀️', outono: '🍂', inverno: '❄️' }[estacao] || '';
    
    return `
      <div class="item-card">
        <h3>${planta.name}</h3>
        <div class="item-info">
          <span>Lote: <strong>${lote?.name || 'Lote removido'}</strong></span>
          <span class="badge ativo">${estagaoLabel} ${estacao.charAt(0).toUpperCase() + estacao.slice(1)}</span>
        </div>
        <div class="item-info">
          <span>Tipo: ${planta.type}</span>
        </div>
        <div class="item-info">
          <span>📅 Plantio: ${new Date(planta.dataPlantio).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Relatórios com Filtros
function updateRelatorios() {
  const status = document.getElementById('filterStatus').value;
  const estacao = document.getElementById('filterEstacao').value;
  const plantas = getPlantas();
  const lotes = getLotes();
  const container = document.getElementById('relatoriosContainer');
  
  let filtrados = [...plantas];
  
  // Filtrar por status
  if (status === 'plantada') {
    filtrados = filtrados.filter(p => p.status === 'ativo');
  } else if (status === 'colheita-proxima') {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    filtrados = filtrados.filter(p => {
      if (p.status === 'colhido') return false;
      const dataColheita = new Date(p.dataColheita);
      dataColheita.setHours(0, 0, 0, 0);
      const diasAte = Math.floor((dataColheita - hoje) / (1000 * 60 * 60 * 24));
      return diasAte >= 0 && diasAte <= 30;
    });
  } else if (status === 'pronta-colheita') {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    filtrados = filtrados.filter(p => {
      const dataColheita = new Date(p.dataColheita);
      dataColheita.setHours(0, 0, 0, 0);
      const diasAte = Math.floor((dataColheita - hoje) / (1000 * 60 * 60 * 24));
      return diasAte <= 0;
    });
  }
  
  // Filtrar por estação
  if (estacao) {
    filtrados = filtrados.filter(p => p.estacao === estacao);
  }
  
  if (filtrados.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhum resultado encontrado</div></div>';
    return;
  }
  
  const tabela = `
    <table class="relatorios-table">
      <thead>
        <tr>
          <th>Planta</th>
          <th>Tipo</th>
          <th>Lote</th>
          <th>Plantio</th>
          <th>Colheita</th>
          <th>Estação</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${filtrados.map(planta => {
          const lote = lotes.find(l => l.id === planta.loteId);
          const estacaoLabel = { primavera: '🌱 Primavera', verao: '☀️ Verão', outono: '🍂 Outono', inverno: '❄️ Inverno' }[planta.estacao] || '';
          return `
            <tr>
              <td><strong>${planta.name}</strong></td>
              <td>${planta.type}</td>
              <td>${lote?.name || 'Lote removido'}</td>
              <td>${new Date(planta.dataPlantio).toLocaleDateString('pt-BR')}</td>
              <td>${new Date(planta.dataColheita).toLocaleDateString('pt-BR')}</td>
              <td>${estacaoLabel}</td>
              <td><span class="badge ${planta.status}">${planta.status}</span></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = tabela;
}

// Notificações
function renderNotificacoes() {
  const notificacoes = getNotificacoes();
  const container = document.getElementById('notificacoesContainer');
  
  if (notificacoes.length === 0) {
    container.innerHTML = '<div class="card big empty"><div class="empty-text">Nenhuma notificação</div></div>';
    return;
  }
  
  const tiposIcon = {
    'alerta': '⚠️',
    'atualizacao': '✓',
    'colheita': '🌾'
  };
  
  container.innerHTML = notificacoes.map(notif => `
    <div class="notificacao-item ${notif.tipo}">
      <div class="notificacao-content">
        <div class="notificacao-tipo">${notif.tipo}</div>
        <div class="notificacao-texto"><strong>${notif.titulo}</strong></div>
        <div class="notificacao-texto">${notif.texto}</div>
        <div class="notificacao-data">${notif.data}</div>
      </div>
      <div class="icon">${tiposIcon[notif.tipo] || '•'}</div>
    </div>
  `).join('');
}

// Navegação
document.addEventListener('click', function(e){
  const a = e.target.closest('[data-page]');
  if(a){ e.preventDefault(); navigateTo(a.getAttribute('data-page')); }
});

function navigateTo(page){
  document.querySelectorAll('.menu a').forEach(x=>x.classList.remove('active'));
  const menuItem = document.querySelector('.menu a[data-page="'+page+'"]');
  if(menuItem) menuItem.classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const sel = document.getElementById(page);
  if(sel) sel.classList.add('active');
  document.getElementById('pageTitle').textContent = sel ? sel.querySelector('h1').textContent : 'AgroSmart';
  
  if (page === 'dashboard') updateDashboard();
  else if (page === 'lotes') renderLotes();
  else if (page === 'plantas') renderPlantas();
  else if (page === 'relatorios') updateRelatorios();
  else if (page === 'notificacoes') renderNotificacoes();
}

// Theme switch
document.getElementById('themeSelect')?.addEventListener('change', function(e){
  if(e.target.value === 'dark') document.documentElement.style.background = '#111';
  else document.documentElement.style.background = '';
});

// Toggle sidebar on small screens
document.getElementById('menuToggle')?.addEventListener('click', function(){
  const sb = document.querySelector('.sidebar');
  if(sb.style.display === 'block') sb.style.display = 'none'; else sb.style.display = 'block';
});

// --- Perfil e Configurações ---
let currentAvatarData = null;

function loadProfile() {
  const profile = JSON.parse(localStorage.getItem('agrosmart_profile') || '{}');
  document.getElementById('profileName').value = profile.name || 'Seu Paulo';
  document.getElementById('profileEmail').value = profile.email || '';
  document.getElementById('profilePhone').value = profile.phone || '';
  document.getElementById('profileAddress').value = profile.address || '';
  currentAvatarData = profile.avatar || null;
  const avatarPreview = document.getElementById('avatarPreview');
  if (currentAvatarData) {
    avatarPreview.innerHTML = `<img src="${currentAvatarData}" alt="avatar">`;
  } else {
    const initials = (profile.name || 'Seu Paulo').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
    avatarPreview.textContent = initials || 'SP';
    avatarPreview.style.background = '';
  }
}

function saveProfile(e) {
  e.preventDefault();
  const profile = {
    name: document.getElementById('profileName').value || 'Seu Paulo',
    email: document.getElementById('profileEmail').value || '',
    phone: document.getElementById('profilePhone').value || '',
    address: document.getElementById('profileAddress').value || '',
    avatar: currentAvatarData || null
  };
  localStorage.setItem('agrosmart_profile', JSON.stringify(profile));
  addNotificacao('atualizacao', 'Perfil Atualizado', `Perfil de ${profile.name} salvo.`);
  loadProfile();
}

function handleAvatarInput(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    currentAvatarData = evt.target.result;
    const avatarPreview = document.getElementById('avatarPreview');
    avatarPreview.innerHTML = `<img src="${currentAvatarData}" alt="avatar">`;
  };
  reader.readAsDataURL(file);
}

document.getElementById('avatarInput')?.addEventListener('change', function(e){
  const f = e.target.files && e.target.files[0];
  if (f) handleAvatarInput(f);
});

document.getElementById('removeAvatarBtn')?.addEventListener('click', function(){
  currentAvatarData = null;
  const avatarPreview = document.getElementById('avatarPreview');
  const profile = JSON.parse(localStorage.getItem('agrosmart_profile') || '{}');
  const initials = (profile.name || 'Seu Paulo').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  avatarPreview.innerHTML = '';
  avatarPreview.textContent = initials || 'SP';
});

// Configurações (notificações e tema)
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('agrosmart_settings') || '{}');
  document.getElementById('notifyEmail').checked = !!settings.notifyEmail;
  document.getElementById('notifyPush').checked = !!settings.notifyPush;
  document.getElementById('themeSelect').value = settings.theme || 'light';
  applyTheme(settings.theme || 'light');
}

function saveSettings() {
  const settings = {
    notifyEmail: !!document.getElementById('notifyEmail').checked,
    notifyPush: !!document.getElementById('notifyPush').checked,
    theme: document.getElementById('themeSelect').value || 'light'
  };
  localStorage.setItem('agrosmart_settings', JSON.stringify(settings));
  applyTheme(settings.theme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.remove('dark-theme');
  }
}

// toggles change -> save
document.getElementById('notifyEmail')?.addEventListener('change', saveSettings);
document.getElementById('notifyPush')?.addEventListener('change', saveSettings);
document.getElementById('themeSelect')?.addEventListener('change', saveSettings);

// Hook profile form
document.getElementById('profileForm')?.addEventListener('submit', saveProfile);

// Auth Functions
function goToLogin() {
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('signupPage').classList.remove('active');
}

function goToSignup() {
  document.getElementById('signupPage').classList.add('active');
  document.getElementById('loginPage').classList.remove('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simular autenticação (em produção seria com backend)
  if (email && password) {
    localStorage.setItem('agrosmart_loggedIn', 'true');
    localStorage.setItem('agrosmart_email', email);
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('signupPage').classList.remove('active');
    document.getElementById('appContainer').style.display = 'flex';
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
  
  if (password !== passwordConfirm) {
    alert('As senhas não coincidem!');
    return;
  }
  
  if (name && email && password) {
    // Simular criação de conta
    const profile = { name: name, email: email, phone: '', address: '', avatar: null };
    localStorage.setItem('agrosmart_profile', JSON.stringify(profile));
    localStorage.setItem('agrosmart_loggedIn', 'true');
    localStorage.setItem('agrosmart_email', email);
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('signupPage').classList.remove('active');
    document.getElementById('appContainer').style.display = 'flex';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupPasswordConfirm').value = '';
  }
}

function logout() {
  localStorage.setItem('agrosmart_loggedIn', 'false');
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('signupPage').classList.remove('active');
  loadProfile();
}

// Inicializar
initData();

// Verificar se está logado
const isLoggedIn = localStorage.getItem('agrosmart_loggedIn') === 'true';
if (isLoggedIn) {
  document.getElementById('appContainer').style.display = 'flex';
  loadProfile();
  loadSettings();
  renderLotes();
  renderPlantas();
  updateDashboard();
  updateNotificationBadge();
} else {
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('loginPage').classList.add('active');
}

import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cpf?: string;
  linkedin?: string;
}

interface UserStats {
  trilhas_concluidas: number;
  desafios_feitos: number;
  certificados_obtidos: number;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  date: string;
  icon: string;
}

type ProfileTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
};

const ProfileTab = ({ label, isActive, onClick, badge }: ProfileTabProps) => {
  return (
    <button 
      className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
      onClick={onClick}
    >
      <span className={styles.tabIcon}>
        {label === 'Progresso' && '⭐'}
        {label === 'Meu perfil' && '👤'}
        {label === 'Profissional' && '💼'}
        {label === 'Insignia' && '🏆'}
      </span>
      <span className={styles.tabLabel}>{label}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
    </button>
  );
};

type ProgressCardProps = {
  title: string;
  count: number;
};

const ProgressCard = ({ title, count }: ProgressCardProps) => {
  return (
    <div className={styles.progressCard}>
      <div className={styles.progressIcon}>{count}</div>
      <div className={styles.progressContent}>
        <p className={styles.progressTitle}>{title}</p>
      </div>
    </div>
  );
};


const AchievementBadge = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div className={styles.achievementBadge}>
      <div className={styles.achievementIcon}>
        <span>{achievement.icon}</span>
      </div>
      <div className={styles.achievementInfo}>
        <h4 className={styles.achievementName}>{achievement.name}</h4>
        <p className={styles.achievementDate}>{achievement.date}</p>
      </div>
    </div>
  );
};

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('progresso');
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: ''
  });

  // Estados para os campos profissionais
  const [businessField, setBusinessField] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [interestAreas, setInterestAreas] = useState<string[]>([]);

  useEffect(() => {
    fetchUserData();
    fetchUserStats();
    fetchAchievements();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/auth/users/me/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEditedUser(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/user/achievements/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const achievementsData = await response.json();
        setAchievements(achievementsData);
      }
    } catch (error) {
      console.error('Erro ao carregar conquistas:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('/auth/users/me/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('/auth/users/set_password/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });
      
      if (response.ok) {
        setPasswordData({ current_password: '', new_password: '' });
        alert('Senha alterada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        
        {/* Header do Perfil */}
        <section className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <div className={styles.avatarCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.userRole}>Aluno</p>
            <h1 className={styles.userName}>
              {user ? `${user.first_name} ${user.last_name}` : 'Júlia Bacelar'}
            </h1>
          </div>
        </section>

        {/* Container Principal com Menu e Conteúdo */}
        <section className={styles.mainContent}>
          
          {/* Menu Lateral */}
          <div className={styles.sidebar}>
            <ProfileTab 
              label="Progresso" 
              isActive={activeTab === 'progresso'}
              onClick={() => setActiveTab('progresso')}
            />
            <ProfileTab 
              label="Meu perfil" 
              isActive={activeTab === 'perfil'}
              onClick={() => setActiveTab('perfil')}
            />
            <ProfileTab 
              label="Profissional" 
              isActive={activeTab === 'profissional'}
              onClick={() => setActiveTab('profissional')}
            />
            <ProfileTab 
              label="Insignia" 
              isActive={activeTab === 'insignia'}
              onClick={() => setActiveTab('insignia')}
              badge={achievements.length > 0 ? achievements.length : 1}
            />
          </div>

          {/* Área de Conteúdo */}
          <div className={styles.contentArea}>
            
            {/* Aba Progresso */}
            {activeTab === 'progresso' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Meu progresso</h2>
                  <p className={styles.contentSubtitle}>
                    Continue aprendendo novas trilhas e treinando seus conhecimentos!
                  </p>
                </div>
                
                <div className={styles.progressGrid}>
                  <ProgressCard 
                    title="Trilhas concluídas"
                    count={stats?.trilhas_concluidas || 1}
                  />
                  <ProgressCard 
                    title="Desafios feitos"
                    count={stats?.desafios_feitos || 2}
                  />
                  <ProgressCard 
                    title="Certificados obtidos"
                    count={stats?.certificados_obtidos || 1}
                  />
                </div>
              </div>
            )}

            {/* Aba Meu Perfil */}
            {activeTab === 'perfil' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Informações pessoais</h2>
                  <button 
                    className={styles.editButton}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    ✏️ Editar
                  </button>
                </div>

                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nome completo (Obrigatório)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className={styles.formInput}
                        value={`${editedUser.first_name || ''} ${editedUser.last_name || ''}`}
                        onChange={(e) => {
                          const [firstName, ...lastName] = e.target.value.split(' ');
                          setEditedUser({
                            ...editedUser,
                            first_name: firstName,
                            last_name: lastName.join(' ')
                          });
                        }}
                      />
                    ) : (
                      <div className={styles.formValue}>
                        {user?.first_name} {user?.last_name}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>CPF</label>
                    <div className={styles.formValue}>
                      {user?.cpf || '123.456.789-10'}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Link do perfil"
                        value={editedUser.linkedin || ''}
                        onChange={(e) => setEditedUser({...editedUser, linkedin: e.target.value})}
                      />
                    ) : (
                      <div className={styles.formValue}>
                        {user?.linkedin || 'Link do perfil'}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <button className={styles.saveButton} onClick={handleSaveProfile}>
                      Salvar
                    </button>
                  )}
                </div>

                {/* Dados Cadastrais */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionSubtitle}>Dados cadastrais</h3>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>E-mail</label>
                    <div className={styles.formValue}>
                      {user?.email || 'julia.bacelar@gmail.com'}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Alterar senha</label>
                    <div className={styles.passwordFields}>
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Senha atual"
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                      />
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Nova senha"
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                      />
                    </div>
                    <button className={styles.changePasswordButton} onClick={handleChangePassword}>
                      Alterar senha
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Aba Profissional */}
            {activeTab === 'profissional' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Informações profissionais</h2>
                  <button className={styles.editButton}>
                    ✏️ Editar
                  </button>
                </div>

                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ramo empresarial</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Comércio"
                      value={businessField}
                      onChange={(e) => setBusinessField(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Área de atuação</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Automotivo e autopeças"
                      value={workArea}
                      onChange={(e) => setWorkArea(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Áreas de interesse</label>
                    <button className={styles.interestButton}>
                      🔗 Conectado
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Aba Insígnias */}
            {activeTab === 'insignia' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Conquistas</h2>
                </div>

                <div className={styles.achievementsGrid}>
                  {/* Conquistas obtidas */}
                  {Array.from({length: 8}).map((_, index) => (
                    <div key={index} className={styles.achievementItem}>
                      <div className={styles.achievementBadgeIcon}>
                        <div className={styles.hexagonBadge}>
                          <svg viewBox="0 0 100 100" className={styles.hexagonSvg}>
                            <polygon 
                              points="50,10 82,30 82,70 50,90 18,70 18,30" 
                              fill="#4F63D2"
                            />
                            <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12">
                              📄
                            </text>
                          </svg>
                        </div>
                      </div>
                      <div className={styles.achievementText}>
                        <p className={styles.achievementTitle}>Empenhado</p>
                        <p className={styles.achievementDate}>5 de 10</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}

export default ProfilePage;

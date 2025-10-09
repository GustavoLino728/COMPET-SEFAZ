import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css';
import { 
  getCurrentUser, 
  patchCurrentUser, 
  getUserProgress,
  changePassword 
} from '../../api';
import type { UserProgressResponse } from '../../api';
import { useBadges } from '../../hooks/useBadges';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cpf?: string;
  linkedin_url?: string;
  field_of_work?: string;
  interest_area?: string;
}

interface UserStats {
  trilhas_concluidas: number;
  desafios_feitos: number;
  certificados_obtidos: number;
}

const ProfileTab = ({ label, isActive, onClick }: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
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
  </button>
);

const ProgressCard = ({ title, count }: { title: string; count: number }) => (
  <div className={styles.progressCard}>
    <div className={styles.progressIcon}>{count}</div>
    <div className={styles.progressContent}>
      <p className={styles.progressTitle}>{title}</p>
    </div>
  </div>
);

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('progresso');
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const { userBadges, loading: badgesLoading } = useBadges();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: ''
  });
  const [businessField, setBusinessField] = useState('');
  const [interestAreas, setInterestAreas] = useState<string[]>([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadUserData(), loadStats()]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser(); 
      setUser(userData);
      setEditedUser(userData);
      setBusinessField(userData.field_of_work || '');
      setInterestAreas(userData.interest_area ? userData.interest_area.split(',').map(s => s.trim()) : []);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadStats = async () => {
    try {
      const progressResponse = await getUserProgress();
      setStats({
        trilhas_concluidas: progressResponse.overall_progress.total_trails_accessed,
        desafios_feitos: progressResponse.total_challenges_completed,
        certificados_obtidos: progressResponse.overall_progress.programs_completed.length,
      });
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      setStats({ trilhas_concluidas: 0, desafios_feitos: 0, certificados_obtidos: 0 });
    }
  };

  const handleSaveProfile = async () => {
    try {
      const dataToUpdate = { ...editedUser, field_of_work: businessField, interest_area: interestAreas.join(', ') };
      const response = await patchCurrentUser(dataToUpdate);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(passwordData);
      setPasswordData({ current_password: '', new_password: '' });
      alert('Senha alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    }
  };

  const handleSaveProfessional = async () => {
    try {
      const dataToUpdate = { field_of_work: businessField, interest_area: interestAreas.join(', ') };
      const response = await patchCurrentUser(dataToUpdate);
      setUser(response.data);
      setIsEditingProfessional(false);
      alert('Informações profissionais atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar informações profissionais:', error);
      alert('Erro ao salvar informações. Tente novamente.');
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
              {user ? `${user.first_name} ${user.last_name}` : 'Carregando...'}
            </h1>
          </div>
        </section>

        {/* Container Principal */}
        <section className={styles.mainContent}>
          {/* Menu Lateral */}
          <div className={styles.sidebar}>
            <ProfileTab label="Progresso" isActive={activeTab === 'progresso'} onClick={() => setActiveTab('progresso')} />
            <ProfileTab label="Meu perfil" isActive={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')} />
            <ProfileTab label="Profissional" isActive={activeTab === 'profissional'} onClick={() => setActiveTab('profissional')} />
            <ProfileTab label="Insignia" isActive={activeTab === 'insignia'} onClick={() => setActiveTab('insignia')} />
          </div>

          {/* Área de Conteúdo */}
          <div className={styles.contentArea}>
            {activeTab === 'progresso' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Meu progresso</h2>
                  <p className={styles.contentSubtitle}>
                    Continue aprendendo novas trilhas e treinando seus conhecimentos!
                  </p>
                </div>
                <div className={styles.progressGrid}>
                  <ProgressCard title="Trilhas concluídas" count={stats?.trilhas_concluidas || 0} />
                  <ProgressCard title="Desafios feitos" count={stats?.desafios_feitos || 0} />
                  <ProgressCard title="Certificados obtidos" count={stats?.certificados_obtidos || 0} />
                </div>
              </div>
            )}

            {activeTab === 'perfil' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Informações pessoais</h2>
                  <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
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
                          setEditedUser({ ...editedUser, first_name: firstName, last_name: lastName.join(' ') });
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
                    <div className={styles.formValue}>{user?.cpf || ''}</div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Link do perfil"
                        value={editedUser.linkedin_url || ''}
                        onChange={(e) => setEditedUser({...editedUser, linkedin_url: e.target.value})}
                      />
                    ) : (
                      <div className={styles.formValue}>{user?.linkedin_url || ''}</div>
                    )}
                  </div>

                  {isEditing && (
                    <button className={styles.saveButton} onClick={handleSaveProfile}>Salvar</button>
                  )}
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.sectionSubtitle}>Dados cadastrais</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>E-mail</label>
                    <div className={styles.formValue}>{user?.email || ''}</div>
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

            {activeTab === 'profissional' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Informações profissionais</h2>
                  <button className={styles.editButton} onClick={() => setIsEditingProfessional(!isEditingProfessional)}>
                    ✏️ Editar
                  </button>
                </div>
                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ramo empresarial</label>
                    {isEditingProfessional ? (
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Ex: Comércio"
                        value={businessField}
                        onChange={(e) => setBusinessField(e.target.value)}
                      />
                    ) : (
                      <div className={styles.formValue}>
                        {user?.field_of_work || 'Não informado'}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Áreas de interesse</label>
                    {isEditingProfessional ? (
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Digite suas áreas de interesse separadas por vírgula"
                        value={interestAreas.join(', ')}
                        onChange={(e) => setInterestAreas(e.target.value.split(',').map(s => s.trim()))}
                      />
                    ) : (
                      <div className={styles.formValue}>
                        {user?.interest_area || 'Não informado'}
                      </div>
                    )}
                  </div>

                  {isEditingProfessional && (
                    <button className={styles.saveButton} onClick={handleSaveProfessional}>Salvar</button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'insignia' && (
              <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                  <h2 className={styles.contentTitle}>Insignias</h2>
                </div>

                {badgesLoading ? (
                  <div className={styles.loading}>🔄 Carregando badges...</div>
                ) : (
                  <div>
                    {userBadges && userBadges.badges.length > 0 ? (
                      <>
                        {/* Grid de badges */}
                        <div className={styles.badgesGridTop}>
                          {userBadges.badges.map((badge) => (
                            <div key={`badge-mini-${badge.id}`} className={styles.badgeMini}>
                              <img 
                                src={badge.image_url}
                                alt={badge.name}
                                className={styles.badgeMiniImage}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNmZmQ3MDAiLz4KPHRleHQgeD0iMzIiIHk9IjM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSI+8J+PhjwvdGV4dD4KPC9zdmc+';
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Badge mais recente */}
                        <div className={styles.recentBadgeSection}>
                          <h3 className={styles.recentBadgeTitle}>Conquista recente</h3>
                          <div className={styles.recentBadgeCard}>
                            <div className={styles.recentBadgeImage}>
                              <img 
                                src={userBadges.badges[0].image_url}
                                alt={userBadges.badges[0].name}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjZmZkNzAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiPvCfj4Y8L3RleHQ+Cjwvc3ZnPg==';
                                }}
                              />
                            </div>
                            <div className={styles.recentBadgeInfo}>
                              {/* TEXTOS DINÂMICOS baseados nos dados reais do backend */}
                              <h4 className={styles.recentBadgeName}>
                                {userBadges.badges[0].name}
                              </h4>
                              <p className={styles.recentBadgeDescription}>
                                {userBadges.badges[0].description}
                              </p>
                              <p className={styles.recentBadgeDate}>
                                Obtido em: {new Date(userBadges.badges[0].earned_at!).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>

                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🏆</div>
                        <h3>Nenhuma conquista ainda</h3>
                        <p>Complete desafios para conquistar suas primeiras insignias!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
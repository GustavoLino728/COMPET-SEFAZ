import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import { IoIosArrowBack } from 'react-icons/io';
import { updateDiscursiveQuestion, updateMultipleChoiceQuestion, updateProblemQuestion } from '../api';

const PageWrapper = styled.div`
  background-color: #f4f5fa;
  min-height: 100vh;
`;
const MainContent = styled.main`
  padding: 2rem 3rem;
`;
const BackLink = styled(Link)`...`; // Reutilize o estilo
const PageTitle = styled.h1`...`; // Reutilize o estilo

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TagsContainer = styled.div`...`; // Reutilize o estilo de ChallengesGrid
const Tag = styled.span`...`; // Reutilize o estilo de ChallengesGrid
const ActionButtons = styled.div` display: flex; gap: 1rem; `;
const Button = styled.button<{ primary?: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.primary ? '#2f3a7d' : '#ffebee'};
  color: ${props => props.primary ? '#fff' : '#c62828'};
  border: 1px solid ${props => props.primary ? '#2f3a7d' : '#ef9a9a'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${props => props.primary ? '#212529' : '#ffcdd2'};
    border-color: ${props => props.primary ? '#212529' : '#e57373'};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;
const EditorContainer = styled.div`
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 1.5rem;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
`;
const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const CancelButton = styled.button`...`; // Estilize como desejar
const ApproveButton = styled.button`...`; // Estilize como desejar

const ChallengeGeneratedPage: React.FC = () => {
    const location = useLocation() as any;
    const navigate = useNavigate();
    const challenge = location?.state?.challenge;

    const [editing, setEditing] = useState<any>({});

    const grouped = useMemo(() => {
      if (!challenge) return null;
      return {
        discursive: challenge.discursive_questions || [],
        problems: challenge.problem_questions || [],
        mcqs: challenge.multiple_choice_questions || [],
        meta: {
          title: challenge.title,
          track: challenge.track_name,
          program: challenge.program_name,
          difficulty: challenge.difficulty,
        }
      };
    }, [challenge]);

    const handleChange = (key: string, value: string) => {
      setEditing((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
      const updates: Promise<any>[] = [];
      // Discursivas
      grouped?.discursive.forEach((q: any, idx: number) => {
        const s = editing[`disc_${idx}_statement`];
        const a = editing[`disc_${idx}_answer_text`];
        const j = editing[`disc_${idx}_justification`];
        if (s !== undefined || a !== undefined || j !== undefined) {
          updates.push(updateDiscursiveQuestion(q.id, {
            ...(s !== undefined ? { statement: s } : {}),
            ...(a !== undefined ? { answer_text: a } : {}),
            ...(j !== undefined ? { justification: j } : {}),
          }));
        }
      });
      // Problemas (cálculo)
      grouped?.problems.forEach((q: any, idx: number) => {
        const s = editing[`prob_${idx}_statement`];
        const a = editing[`prob_${idx}_correct_answer`];
        const j = editing[`prob_${idx}_justification`];
        if (s !== undefined || a !== undefined || j !== undefined) {
          updates.push(updateProblemQuestion(q.id, {
            ...(s !== undefined ? { statement: s } : {}),
            ...(a !== undefined ? { correct_answer: a } : {}),
            ...(j !== undefined ? { justification: j } : {}),
          }));
        }
      });
      // Múltipla escolha
      grouped?.mcqs.forEach((q: any, idx: number) => {
        const s = editing[`mc_${idx}_statement`];
        const a = editing[`mc_${idx}_option_a`];
        const b = editing[`mc_${idx}_option_b`];
        const c = editing[`mc_${idx}_option_c`];
        const d = editing[`mc_${idx}_option_d`];
        const e = editing[`mc_${idx}_option_e`];
        const corr = editing[`mc_${idx}_correct_option`];
        const j = editing[`mc_${idx}_justification`];
        if (s !== undefined || a !== undefined || b !== undefined || c !== undefined || d !== undefined || e !== undefined || corr !== undefined || j !== undefined) {
          updates.push(updateMultipleChoiceQuestion(q.id, {
            ...(s !== undefined ? { statement: s } : {}),
            ...(a !== undefined ? { option_a: a } : {}),
            ...(b !== undefined ? { option_b: b } : {}),
            ...(c !== undefined ? { option_c: c } : {}),
            ...(d !== undefined ? { option_d: d } : {}),
            ...(e !== undefined ? { option_e: e } : {}),
            ...(corr !== undefined ? { correct_option: corr } : {}),
            ...(j !== undefined ? { justification: j } : {}),
          }));
        }
      });

      await Promise.all(updates);
      alert('Alterações salvas com sucesso.');
      navigate('/admin');
    };

    return (
        <PageWrapper>
            <MainContent>
                <BackLink to="/admin"><IoIosArrowBack /> Voltar</BackLink>
                <HeaderActions>
                    <div>
                        <PageTitle>Desafio {challenge?.id || 'N/A'}</PageTitle>
                    </div>
                    <ActionButtons>
                        <Button primary onClick={handleSave}>Salvar Alterações</Button>
                    </ActionButtons>
                </HeaderActions>
                {grouped && (
                  <>
                    {grouped.discursive.map((q: any, idx: number) => (
                      <EditorContainer key={`disc-${q.id}`}>
                        <h3>Desafio Discursivo #{idx + 1}</h3>
                        <label>Enunciado</label>
                        <TextArea defaultValue={q.statement}
                          onChange={(e) => handleChange(`disc_${idx}_statement`, e.target.value)} />
                        <label>Resposta</label>
                        <TextArea defaultValue={q.answer_text}
                          onChange={(e) => handleChange(`disc_${idx}_answer_text`, e.target.value)} />
                        <label>Justificativa</label>
                        <TextArea defaultValue={q.justification || ''}
                          onChange={(e) => handleChange(`disc_${idx}_justification`, e.target.value)} />
                      </EditorContainer>
                    ))}

                    {grouped.problems.map((q: any, idx: number) => (
                      <EditorContainer key={`prob-${q.id}`}>
                        <h3>Desafio de Cálculo #{idx + 1}</h3>
                        <label>Enunciado</label>
                        <TextArea defaultValue={q.statement}
                          onChange={(e) => handleChange(`prob_${idx}_statement`, e.target.value)} />
                        <label>Resposta (número)</label>
                        <TextArea defaultValue={q.correct_answer}
                          onChange={(e) => handleChange(`prob_${idx}_correct_answer`, e.target.value)} />
                        <label>Justificativa</label>
                        <TextArea defaultValue={q.justification || ''}
                          onChange={(e) => handleChange(`prob_${idx}_justification`, e.target.value)} />
                      </EditorContainer>
                    ))}

                    {grouped.mcqs.map((q: any, idx: number) => (
                      <EditorContainer key={`mc-${q.id}`}>
                        <h3>Questão de múltipla escolha #{idx + 1}</h3>
                        <label>Enunciado</label>
                        <TextArea defaultValue={q.statement}
                          onChange={(e) => handleChange(`mc_${idx}_statement`, e.target.value)} />
                        <label>Alternativa A</label>
                        <TextArea defaultValue={q.option_a}
                          onChange={(e) => handleChange(`mc_${idx}_option_a`, e.target.value)} />
                        <label>Alternativa B</label>
                        <TextArea defaultValue={q.option_b}
                          onChange={(e) => handleChange(`mc_${idx}_option_b`, e.target.value)} />
                        <label>Alternativa C</label>
                        <TextArea defaultValue={q.option_c}
                          onChange={(e) => handleChange(`mc_${idx}_option_c`, e.target.value)} />
                        <label>Alternativa D</label>
                        <TextArea defaultValue={q.option_d}
                          onChange={(e) => handleChange(`mc_${idx}_option_d`, e.target.value)} />
                        <label>Alternativa E</label>
                        <TextArea defaultValue={q.option_e}
                          onChange={(e) => handleChange(`mc_${idx}_option_e`, e.target.value)} />
                        <label>Resposta correta (A/B/C/D/E)</label>
                        <TextArea defaultValue={q.correct_option}
                          onChange={(e) => handleChange(`mc_${idx}_correct_option`, e.target.value)} />
                        <label>Justificativa</label>
                        <TextArea defaultValue={q.justification || ''}
                          onChange={(e) => handleChange(`mc_${idx}_justification`, e.target.value)} />
                      </EditorContainer>
                    ))}
                  </>
                )}
            </MainContent>
        </PageWrapper>
    );
}

export default ChallengeGeneratedPage;
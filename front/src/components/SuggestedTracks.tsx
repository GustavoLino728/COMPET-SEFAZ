import React from 'react';
import styled from 'styled-components';

// Lembre-se de colocar suas imagens em src/assets e descomentar as linhas de import
// import prodepeImg from '../assets/illustration-prodepe.svg';
// import prodeautoImg from '../assets/illustration-prodeauto.svg';
// import proindImg from '../assets/illustration-proind.svg';

const Section = styled.section`
  margin-bottom: 3.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrackCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

interface ImageContainerProps {
  bgColor: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  background-color: ${props => props.bgColor || '#f1f3f5'};
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-height: 90px;
    width: auto;
  }
`;

const InfoContainer = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #6c757d;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }
`;

interface TrackData {
    title: string;
    description: string;
    bgColor: string;
}

const tracks: TrackData[] = [
    {
        title: "PRODEPE",
        description: "Descubra como o Programa de Desenvolvimento de Pernambuco estimula empregos com incentivos fiscais...",
        bgColor: "#e0f3f2"
    },
    {
        title: "PRODEAUTO",
        description: "Entenda os benefícios do programa voltado ao setor automotivo, que incentiva a instalação e expansão de indústrias...",
        bgColor: "#e9e4f4"
    },
    {
        title: "PROIND",
        description: "Aprenda como esse programa de incentivos apoia empreendimentos industriais, promovendo inovação...",
        bgColor: "#dff0e1"
    }
];

const SuggestedTracks: React.FC = () => {
    return (
        <Section>
            <SectionTitle>Trilhas Sugeridas</SectionTitle>
            <Grid>
                {tracks.map(track => (
                    <TrackCard key={track.title}>
                        <ImageContainer bgColor={track.bgColor}>
                            {/* <img src={prodepeImg} alt={track.title} /> */}
                        </ImageContainer>
                        <InfoContainer>
                            <h3>{track.title}</h3>
                            <p>{track.description}</p>
                        </InfoContainer>
                    </TrackCard>
                ))}
            </Grid>
        </Section>
    )
}

export default SuggestedTracks;
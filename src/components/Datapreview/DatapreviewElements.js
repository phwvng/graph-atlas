import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    `;

export const PreviewButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: #0c0c0c;
    color: #fff;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    `;

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 50px;
    height: 100vh;
    width: 50%;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);

    `;

export const PreviewContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;

export const PreviewHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;

export const PreviewTitle = styled.h1`
    color: #0c0c0c;
    font-size: 48px;
    text-align: center;
    `;
export const PreviewSubtitle = styled.p`
    color: #0c0c0c;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
    `;
export const PreviewDescription = styled.p`
    color: #0c0c0c;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
    `;
export const PreviewImage = styled.img`
    width: 100%;
    max-width: 250px;
    `;

export const Metadata = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;
export const MetadataItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `;
export const MetadataLabel = styled.p`
    color: #0c0c0c;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
    `;
export const MetadataValue = styled.p`
    color: #0c0c0c;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
    `;
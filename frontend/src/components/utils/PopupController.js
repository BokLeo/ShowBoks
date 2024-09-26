import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';

// 비밀번호 검증을 위해 API 호출
import { checkFreeTalkPassword } from 'services/common/PasswordApi';


const PopupController = ({ open, onClose, loc, type, title, postId, method }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handlePasswordSubmit = async () => {
    console.log('loc:', loc);
    if(loc === 'freeTalk') {
      const res = await checkFreeTalkPassword({ loc, postId, password });
      const data = res.data;

      if (!data.result) {
        setError(data.error);
      } else {
        const isPasswordCorrect = data.result;
        method(isPasswordCorrect);
        onClose();
      }
    }else{
      console.log('loc error');
    };
  };

  const handleClose = () => {
    setPassword(''); // 모달을 닫을 때 비밀번호 입력창 초기화
    onClose();
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={handleClose} modal nested overlayStyle={overlayStyle}>
      {close => (
        <Modal>
          <HeaderContainer>
            <Header>{title}</Header>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
          </HeaderContainer>
          <>
              <Content>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호를 입력해주세요"
                />
                <Button className='send-button' onClick={handlePasswordSubmit}><SendIcon /></Button>
              </Content>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </>
        </Modal>
      )}
    </Popup>
  );
};

export default PopupController;



const Modal = styled.div`
  font-size: 16px;
  background: #101528;
  border: 1px solid #6f42c1;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 0px 10px 10px rgb(25 34 75 / 30%);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: #101528;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #fff;  
  border: 1px solid #6f42c1;
  border-radius: 30px;
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -14px;
  right: -14px;

  &:hover {
    background: #6f42c1;
  }
`;

const Header = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  color: #fff;
`;

const Content = styled.div`
  display : flex;
  border: 1px solid #555555;
  border-radius: 4px;
  background-color: #1a1a2e;  
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease;
  opacity: 0.8;
  color: #fff;
  width: 40px;
  height: 40px;

  &:hover {
    color: #27c8e1;
    opacity: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 0.875rem;
  padding: 8px;
  background: transparent;
  border:0;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

const overlayStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
};

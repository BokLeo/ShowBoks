import styled from "styled-components";

const AlertBox = ({ message, type = 'info', isVisible, icon }) => {
  // 컴포넌트 로직
  return isVisible ? (
		<AlterBoxStyle className={`alert-box alert-${type}`}>
			{icon && <span className="alert-icon">{icon}</span>}
			<span className="alert-message">{message}</span>
		</AlterBoxStyle>
  ) : null;
};

export default AlertBox;

const AlterBoxStyle = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 4px;
	margin: 10px 0;
	.alert-icon {
		margin-right: 10px;
	}
	&.alert-info{
		background-color: #d1ecf1;
		color: #0c5460;
	}
	&.alert-error{
		background-color: #f8d7da;
    color: #721c24;    
	}
`;

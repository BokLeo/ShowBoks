import React, { useEffect, useState } from 'react';
import moment from 'moment';

// popup component
import PopupController from 'components/utils/PopupController';

// API 호출
import { deleteFreeTalkDataApi } from 'services/talk/TalkFreeApi';


const FreeTalkMessage = ({ talkData, onEdit, onDelete, lastTalkElementRef, onDeleteSuccess }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(talkData.content);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPopupTitle, setIsPopupTitle] = useState('');

	const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(talkData.id, editedContent);
    setIsEditing(false);
		setIsPopupTitle('게시글 수정');
		setIsPopupOpen(true); // 팝업 활성화
  };

  const handleCancelClick = () => {
    setEditedContent(talkData.content);
    setIsEditing(false);
  };

	const handleDeleteClick = () => {
		setIsPopupTitle('게시글 삭제');
		setIsPopupOpen(true); // 팝업 활성화
	};

	const closeModal = () => {
    setIsPopupOpen(false);
		setIsHovered(false);		
  };

	const deleteFreeTalkData = async (postId, password) => {
		try {
      const deleteRes = await deleteFreeTalkDataApi(postId, password);
      if (deleteRes.data.result) {
				console.log('게시글 삭제 성공(FreeTalkMessage):', deleteRes.data);
				onDelete(deleteRes.data.message);
      } else {
        console.error('게시글 삭제 실패:', deleteRes.data.error);
      }
    } catch (err) {
      console.error('게시글 삭제 오류:', err);
    }
	};

	return (	
		<li
			className={`talk-body-chat-message ${isHovered ? 'hovered' : 'not-hovered'}`}
			ref={lastTalkElementRef}
			onMouseEnter={() => setIsHovered(true)} // mouseEnter
			onMouseLeave={() => setIsHovered(false)}// mouseLeave
		>
			<div className='talk-body-chat-message-idx'>{talkData.id}</div>
      <div className='talk-body-chat-message-id'>{talkData.free_nickname}</div>
      <div className='talk-body-chat-message-text'>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          talkData.content
        )}
      </div>
      <div className='talk-body-chat-message-date'>{moment(talkData.created_dt).format('YYYY-MM-DD HH:mm:ss')}</div>

			{isHovered && !isEditing && (
					<div className='talk-body-chat-message-actions'>
						<button onClick={handleEditClick}>수정</button>
						<button onClick={handleDeleteClick}>삭제</button>
					</div>
				)}
				{isEditing && (
					<div className='talk-body-chat-message-actions'>
						<button onClick={handleSaveClick}>저장</button>
						<button onClick={handleCancelClick}>취소</button>
					</div>
				)}

				<PopupController
					open={isPopupOpen}
					onClose={closeModal}
					loc={'freeTalk'}
					type={'pass'}
					title={isPopupTitle}
					postId={talkData.id}
					onPasswordVerified={deleteFreeTalkData} 
				/>
		</li>
	);
};

export default FreeTalkMessage;
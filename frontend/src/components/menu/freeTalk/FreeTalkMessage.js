import React, { useEffect, useState } from 'react';
import moment from 'moment';


const FreeTalkMessage = ({ talkData, onEdit, onDelete, lastTalkElementRef }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(talkData.content);


	const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(talkData.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedContent(talkData.content);
    setIsEditing(false);
  };

	return (	
		<li
			className='talk-body-chat-message'
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
						<button onClick={() => onDelete(talkData.id)}>삭제</button>
					</div>
				)}
				{isEditing && (
					<div className='talk-body-chat-message-actions'>
						<button onClick={handleSaveClick}>저장</button>
						<button onClick={handleCancelClick}>취소</button>
					</div>
				)}
		</li>
	);
};

export default FreeTalkMessage;
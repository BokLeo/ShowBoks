import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

// popup component
import PopupController from "components/utils/PopupController";

// API 호출
import { deleteFreeTalkDataApi } from "services/talk/TalkFreeApi";

const FreeTalkMessage = ({ talkData, onEdit, onDelete, lastTalkElementRef }) => { 
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(talkData.content);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupTitle, setIsPopupTitle] = useState("");
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 항목의 ID

  const handleSaveClick = () => {
    onEdit(talkData.id, editedContent);
    setIsEditing(false);
    setIsPopupTitle("게시글 수정");
    setIsPopupOpen(true); // 팝업 활성화
  };

  const handleCancelClick = () => {
    setEditedContent(talkData.content);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDeleteClick = () => {
    setIsPopupTitle("게시글 삭제");
    setIsPopupOpen(true); // 팝업 활성화
  };

  const closeModal = () => {
    setIsPopupOpen(false);
    setIsHovered(false);
  };

  const prevEditingIdRef = useRef();
  
  useEffect(() => {
    console.log("editingId:", editingId);
    console.log("prevEditingId.current:", prevEditingIdRef.current);
  
    if(prevEditingIdRef.current === null) {
      console.log("null 실행");
      setIsEditing(true);
    } else if (prevEditingIdRef.current !== editingId){
      console.log("else if 실행");
      setIsEditing(true);
      // prevEditingIdRef.current = editingId;
    } else {
      console.log("else 실행");
      setIsEditing(false);
      setEditedContent(talkData.content);
    }
    console.log("전) prevEditingId.current:", prevEditingIdRef.current);
    prevEditingIdRef.current = editingId;
    console.log("후) prevEditingId.current:", prevEditingIdRef.current);

    // if(prevEditingIdRef.current === null || editingId !== prevEditingIdRef.current) {
    //   console.log("true");
    //   // prevEditingIdRef.current = editingId;
    //   setIsEditing(true);
    // } else if (prevEditingIdRef.current !== editingId) {
    //   console.log("false");
    //   setIsEditing(false);
    //   setEditedContent(talkData.content);
    // }
  
    // // 논리 실행 후 prevEditingIdRef 업데이트
    // console.log("여기")
    // console.log("여기 prevEditingId.current:", prevEditingIdRef.current);
    // console.log("여기 editingId:", editingId);
    // prevEditingIdRef.current = editingId;
    // console.log("여기2 prevEditingId.current:", prevEditingIdRef.current);
  }, [editingId, talkData.id]);

  const editFreeTalkData = (postId, password) => {

  };

  const deleteFreeTalkData = async (postId, password) => {
    try {
      const deleteRes = await deleteFreeTalkDataApi(postId, password);
      if (deleteRes.data.result) {
        console.log("게시글 삭제 성공(FreeTalkMessage):", deleteRes.data);
        onDelete(deleteRes.data.message);
      } else {
        console.error("게시글 삭제 실패:", deleteRes.data.error);
      }
    } catch (err) {
      console.error("게시글 삭제 오류:", err);
    }
  };

  return (
    <li
      className={`talk-body-chat-message ${isHovered ? "hovered" : "not-hovered"}`}
      ref={lastTalkElementRef}
      onMouseEnter={() => setIsHovered(true)} // mouseEnter
      onMouseLeave={() => editingId !== talkData.id && setIsHovered(false)} // InfoIcon에서 마우스 뗄 때, 수정 상태가 아니면 hovered 해제
    >
      <div className="talk-body-chat-message-idx">{talkData.id}</div>
      <div className="talk-body-chat-message-id">{talkData.free_nickname}</div>
      <div className={`talk-body-chat-message-text ${isEditing ? "message-text" : ""}`}>
        {isEditing && editingId === talkData.id ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={textAreaStyle.messageInput}
          />
        ) : (
          talkData.content
        )}
      </div>
      <div className="talk-body-chat-message-date">
        {moment(talkData.created_dt).format("YYYY-MM-DD HH:mm:ss")}
      </div>

      {isHovered && editingId !== talkData.id && (
        <div className='talk-body-chat-message-actions'>
          <button onClick={() => setEditingId(talkData.id) }>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
      {editingId === talkData.id && (
        <div className='talk-body-chat-message-actions'>
          <button onClick={() => { /* 저장 로직 추가 */ }}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      )}

      <PopupController
        open={isPopupOpen}
        onClose={closeModal}
        loc={"freeTalk"}
        type={"pass"}
        title={isPopupTitle}
        postId={talkData.id}
        onPasswordVerified={deleteFreeTalkData}
      />
    </li>
  );
};

export default FreeTalkMessage;

const textAreaStyle = {
  messageText: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #6f42c1',
    borderRadius: '4px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: '4px',
  },
  messageInput: {
    width: '100%',
    backgroundColor: 'transparent',
    border: '0',
    resize: 'none',
    padding: '4px',
    paddingRight: '40px',
    height: '2rem',
    maxHeight: '300px', // 최대 높이를 설정하여 너무 커지는 것을 방지
    lineHeight: '1.5', // 줄 높이를 설정
    border: 'none',
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'none',
    resize: 'none',
  },
};
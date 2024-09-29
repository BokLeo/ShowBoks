import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

// popup component
import PopupController from "components/utils/PopupController";

// API 호출
import { deleteFreeTalkDataApi, editFreeTalkDataApi } from "services/talk/TalkFreeApi";

const FreeTalkMessage = ({ talkData, onSuccess, lastTalkElementRef }) => { 
  const [isHovered, setIsHovered] = useState(false);
  const [editedContent, setEditedContent] = useState(talkData.content);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupTitle, setIsPopupTitle] = useState("");
  const [type, setType] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  // const [editingId, setEditingId] = useState(null); // 현재 수정 중인 항목의 ID
  const [isEditState, setIsEditState] = useState({
    isEditing: false,
    editingId: null,
  });

  const handleCancelClick = () => {
    setEditedContent(talkData.content); // 이전 수정 내용을 초기화
    setIsEditState({
      isEditing: false,
      editingId: null,
    });
  };

  const handleDeleteClick = () => {
    setIsPopupTitle("게시글 삭제");
    setIsPopupOpen(true); // 팝업 활성화
    setType("delete");
  };


  

  // Edit 상태 변경 이벤트 리스너 추가
  useEffect(() => {
    const handleEditStateChange = (event) => {
      if (event.detail !== talkData.id) {
        // 현재 컴포넌트가 아닌 다른 컴포넌트에서 수정 상태가 변경된 경우
        setIsEditState({
          isEditing: false,
          editingId: null,
        });
      }
    };

    window.addEventListener('editStateChange', handleEditStateChange);


    return () => {
      // REMIND useEffect에서 **window.removeEventListener**를 사용해 컴포넌트가 언마운트될 때 이벤트 리스너를 제거해야 메모리 누수를 방지할 수 있습니다.
      window.removeEventListener('editStateChange', handleEditStateChange);
    };
  }, [talkData.id]);

  const handleEditClick = () => {
    setIsPopupTitle("게시글 수정");
    setIsPopupOpen(true); // 팝업 활성화
    setType("edit");
  };
  
  const closeModal = () => {
    setIsPopupOpen(false);
    setIsHovered(false);
  };

  const checkFreeTalkPassword = (isPasswordCorrect) => {
    const broadcastEditState = (editingId) => {
      const event = new CustomEvent('editStateChange', { detail: editingId });
      window.dispatchEvent(event);
    };

    if(isPasswordCorrect) {
      if(type === "delete") {
        console.log("delete 실행");
        deleteFreeTalkData(talkData.id);
      } else if(type === "edit") {
        console.log("edit 실행");
        broadcastEditState(talkData.id); // 현재 게시글을 수정 상태로 전파
        setIsEditState({
          isEditing: true,
          editingId: talkData.id,
        });
      }
    }
  };

  const editFreeTalkData = async () => {
    try {
      // console.log("editingId:", editingId);
      console.log("editedContent:", editedContent);

      const editRes = await editFreeTalkDataApi(isEditState.editingId, editedContent);
      if (editRes.data.result) {
        console.log("게시글 수정 성공(FreeTalkMessage):", editRes.data);
        onSuccess(editRes.data.message);
        setIsEditState({
          isEditing: false,
          editingId: null,
        });
      } else {
        console.error("게시글 수정 실패:", editRes.data.error);
      }
    } catch (err) {
      console.error("게시글 수정 오류:", err);  
    }
  };

  const deleteFreeTalkData = async (postId) => {
    console.log("postId:", postId); 

    try {
      const deleteRes = await deleteFreeTalkDataApi(postId);
      if (deleteRes.data.result) {
        console.log("게시글 삭제 성공(FreeTalkMessage):", deleteRes.data);
        onSuccess(deleteRes.data.message);
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
      // className={`talk-body-chat-message hovered`}
      ref={lastTalkElementRef}
      onMouseEnter={() => setIsHovered(true)} // mouseEnter
      onMouseLeave={() => setIsHovered(false)} // InfoIcon에서 마우스 뗄 때, 수정 상태가 아니면 hovered 해제
    >
      <div className="talk-body-chat-message-idx">{talkData.id}</div>
      <div className="talk-body-chat-message-id">{talkData.free_nickname}</div>
      <div className="talk-body-chat-message-text">
        {isEditState.editingId === talkData.id ? (
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

      {isHovered && isEditState.editingId !== talkData.id && (
        <div className='talk-body-chat-message-actions'>
          <button onClick={handleEditClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
      {isEditState.editingId === talkData.id && (
        <div className='talk-body-chat-message-actions'>
          <button onClick={editFreeTalkData}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      )}

      <PopupController
        open={isPopupOpen}
        onClose={closeModal}
        loc={"freeTalk"}
        type={type}
        title={isPopupTitle}
        postId={talkData.id}
        method={checkFreeTalkPassword}
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
    // height: '2rem',
    maxHeight: '300px', // 최대 높이를 설정하여 너무 커지는 것을 방지
    lineHeight: '1.5', // 줄 높이를 설정
    overflow: 'hidden',
    outline: 'none',
    boxShadow: 'none',
  },
};
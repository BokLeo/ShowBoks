import React, { useEffect, useRef } from 'react';

import { Logout } from "@mui/icons-material";


function UserTab() {
    // userIcon을 클릭하면 사용자 정보를 보여주는 기능
    const onClickUserIcon = () => {
        // user-panel의 right값을 0으로 변경
        const userPanel = document.querySelector(".user-panel");
        userPanel.style.right = "0";
    }

    const tabRef = useRef(null); // UserTab 컴포넌트의 참조 생성

    const onClickOther = () => {
        // user-panel의 right값을 -200px로 변경
        const userPanel = document.querySelector(".user-panel");
        userPanel.style.right = "-240px";
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (tabRef.current && !tabRef.current.contains(event.target)) {
          onClickOther(); // 클릭된 요소가 UserTab 외부인 경우 함수 호출
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 정리
      };
    }, [tabRef]); // tabRef가 변경될 때마다 useEffect 실행

		const handleKeyPress = (event, handler) => {
			if (event.key === 'Enter' || event.key === ' ') {
				handler();
			}
		};

    return (
        <div ref={tabRef}>

            <div className="user-tab">
                <div>
                    <span
											className="circle-icon"
											onClick={onClickUserIcon}
											onKeyPress={(event) => handleKeyPress(event, onClickUserIcon)}
											role="button"
											tabIndex="0"
											aria-label="User Icon"
										/>
                </div>

                <div className="user-panel">
                    <div className="user-panel-top">
                        <span className="circle-icon"></span>
                        <span className="user-name">아이디</span>
                    </div>
                    <div className="user-panel-middle">
                        <span>정보 수정</span>
                    </div>
                    <div className="user-panel-bottom">
                    <span className="user-panel-option__logout"><Logout />로그아웃</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserTab;

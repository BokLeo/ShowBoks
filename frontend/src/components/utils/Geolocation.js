// 사용자의 위치 정보를 가져오는 컴포넌트
// -- Geolocation API를 사용하여 사용자의 위치 정보를 가져온다.

function getGeolocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ success: false });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
					console.log('position:', position);
          resolve({
            success: true,
            x: position.coords.latitude,
            y: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve({ success: false });
        }
      );
    }
  });
}

export default getGeolocation;
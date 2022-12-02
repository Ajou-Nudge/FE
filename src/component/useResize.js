import { useEffect, useState } from "react";

// 사용자 화면의 가로 사이즈를 return 하는 요소
function useResize() {
    const [ width, setWidth ] = useState(window.innerWidth)

    useEffect(() => {
        // resize 발생 시 동작할 함수
        function handleResize() {
            setWidth(window.innerWidth)
        } 
        // 이벤트 리스너 추가
        window.addEventListener("resize", handleResize)
        // 사용 끝난 리스너 정리
        return () => window.removeEventListener("resize", handleResize)
    })

    return [ width ]
}

export default useResize
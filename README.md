# DIDNOW FE

### 목차
* 프로젝트 요약<br />
* 사용기술안내<br />
* Advanced Feature<br />
* 개선사항<br />
* 플로우차트<br />
* 제공기능
___

### 프로젝트 소개
___

* #### 프로젝트 요약
    
    자격증의 해쉬값을 블록체인에 저장하고, 제출된 이력서의 자격증을 실시간으로 검증할 수 있는 서비스위한 웹페이지를 만들어본다.
    ___
* #### 사용기술안내
    
    |Icon|Stack|Description|
    |----|-----|-----------|
    |<img src=./src/img/readme/react.png height= 30px>|React|프론트앤드 구성|
    |<img src=./src/img/readme/antd.png height= 30px>|ANTD|컴포넌트 UI|
    |<img src=https://ko.redux.js.org/img/redux.svg height= 30px>|Redux|사용자 state 관리|
    |<img src=./src/img/readme/kaikas.png height= 30px>|Kaikas|블록체인지갑관리, 메소드호출|
    ||react-cookie|사용자 jwt 토큰 관리|
    ___
* #### Advanced Feature

    1. 반응형 페이지 개발

        <img src=./src/img/readme/responsive.gif width=640px>
        <hr />

    2. antd carousel응용하여 FullPage 구현

        <img src=./src/img/readme/fullpage.gif width=640px>
        <hr />

    3. JWT 토큰기반 로그인 구현

        받아온 토큰 쿠키에 넣어 보관, 받아온 사용자 데이터는 redux로 관리

        ```javascript
                const cookieValue =`${data.data.accessToken}`
                setCookie("Authorization", cookieValue, [])
                axios({
                    url: `http://localhost:8080/user/info`,
                    method: "GET",
                    withCredentials: true,
                    headers: {authorization: `Bearer ${cookieValue}`},
                })
                .then((data) => {
                    SignInToStore(data.data)
                    NavigateToHome(data.data, navigate)
                    messageInfo("로그인 성공!");
                })
        ```
        <hr />

    4. Caver, 블록체인 메소드 호출 구현

        <img src=./src/img/readme/caverTest.gif width=640px>
        <hr />

    ___

* #### 개선필요사항

    1. 각 버튼 스타일에 맞는 hover 이벤트 필요
    2. antd로 제작한 fullpage와 footer 통합필요
    3. fullpage의 반응형 미흡
    4. JWT token 일반 쿠키에 보관하여 보안 미흡, httpOnly 쿠키로 대체해야함
    
    ___

* #### 웹페이지의 전체적인 구조

    메인페이지(로그인 전)
    <img src=./src/img/readme/Vone_%20FE%20%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8.png width=640px>
    ___

### 시연영상
        추후기재 예정
    ___
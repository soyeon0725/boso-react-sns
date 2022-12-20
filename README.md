# B♥️S♥️ React SNS Project

### Project setup

```
# install dependencies
$ npm install
```
***

### Compiles and hot-reloads for development

```
# server with hot reload at localhost:3000 (Develop Server)
$ npm start
```
***

#### 디렉터리 구조

public : 가상 DOM을 위한 html 파일로 index.html을 포함하고 있습니다.
> 우리가 웹을 배포한다는 건 특정 폴더를 서버 컴퓨터에 올려두는 것이다.    
> 그래서 서버랑 연결된 url로 접근하면 해당 폴더의 파일을 요청할 수 있다 -> 뒤에 따로 추가적인 url을 안 붙이면 index.html을 요청한다.   
> 우리가 CRA를 배포했을 때 실제 서버에 배포되는 폴더가 public 폴더이다.

package.json : CRA 기본 패키지 외 추가로 설치된 라이브러리/패키지 정보(종류, 버전)가 기록되는 파일입니다.

> "dependencies"
>
> 리액트를 사용하기 위한 모든 패키지 리스트, 버전 확인이 가능.   
> 실제 코드는 node.modules 폴더에 존재한다.
>
> "scripts"
>
> start : 프로젝트 development mode(개발 모드) 실행을 위한 명령어. npm run start   
> build : 프로젝트 production mode(배포 모드) 실행을 위한 명령어. 서비스 상용화.
>
> 근데 왜 node.modules과 package.json에서 이중으로 패키지를 관리할까?
>
> 실제 내가 작성한 코드, 내가 설치한 패키지는 내 로컬에만 존재.   
> github에 올릴 때 내가 작성한 코드와 함께 pacakge.json(추가로 설치한 패키지)를 넘긴다.    
> 다른 사람이 그것을 (pull) 받아서 npm install만 입력하면 package.json에 기록되어 있는 패키지의 이름과 버전 정보를 확인하여 자동으로 설치한다.   
> 이 때, github에 올릴 때, node.modules는 올리면 안되는데 (불필요한 용량 차지)   
> .gitignore 파일에 github에 올리고 싶지 않은 폴더와 파일을 작성할 수 있다.

src : React의 시작 index.js을 포함하고 있습니다. (보다 자세한 내용은 하단 내용 참고)

node_modules : CRA를 구성하는 모든 패키지 소스 코드가 존재하는 폴더입니다.

package-lock.json : 프로그래머가 관리할 필요가 없고 npm이나 yarn이 알아서 관리해 주는 파일들로 lock 파일은 해당 프로젝트에 설치한 패키지, 그 패키지와 관련된 모든 패키지의 버전 정보를 포함한다.

.gitignore : github에 올리고 싶지 않은 폴더와 파일을 작성할 수 있다. push를 해도 .gitignore 파일에 작성된 폴더와 파일은 올라가지 않습니다.

```bash
┌── node_module
├── public
├── src
│    ├── api // api 연동 모듈
│    │   ├── adaptor.js
│    │   └── api.js
│    ├── app // 라우터 리스트 및 store를 구성하는 모든 slice와 reducer를 정의
│    │   ├── router.js
│    │   ├── slice.js
│    │   └── store.js 
│    ├── assets // 프로젝트에서 사용할 이미지, 비디오, json 파일 등 미디어 파일들을 모아두어 저장하는 곳.
│    │   ├── fonts
│    │   ├── images
│    │   └── scss
│    ├── componenets // pages에서 사용 할 컴포넌트 모음
│    │   ├── markdown
│    │   │   └── MarkdownRenderer.js
│    │   ├── Footer.jsx
│    │   ├── Header.jsx
│    │   └── Sider.jsx
│    ├── lang // 다국어 설정 파일 및 언어 리소스 파일
│    │   ├── resources
│    │   │   ├── translation.en.json
│    │   │   └── translation.ko.json
│    │   └── i18n.js
│    ├── pages // 화면 단위의 라우팅 컴포넌트 모음
│    │   ├── Api.jsx
│    │   ├── Bootstrap.jsx
│    │   ├── Home.jsx
│    │   ├── I18next.jsx
│    │   ├── Redux.jsx
│    │   └── RouterV6.jsx
│    ├── utils // 유틸 함수 모음, birth regex check 등의 함수들 모음
│    │   └── utilCommon.js
│    ├── wiki // 마크다운 파일 모음
│    │   ├── before
│    │   │   └── ssr_csr.md
│    │   ├── common
│    │   │   ├── api.md
│    │   │   ├── bootstrap.md
│    │   │   ├── home.md
│    │   │   ├── i18next.md
│    │   │   ├── redux.md
│    │   │   └── router.md
│    │   └── react
│    │       ├── useCallback.md
│    │       ├── useEffect.md
│    │       ├── useMemo.md
│    │       ├── useRef.md
│    │       └── useState.md
│    ├── App.js // 컴포넌트를 정의하는 프로그램이다. 실제로 화면에 표시되는 내용 등은 여기에서 정의된다.
│    ├── index.css
│    └── index.js // 메인 프로그램이라고 할 수 있다. HTML 템플릿 및 JavaScript의 컴포넌트를 조합하여 렌더링하고 실제 표시
├── .gitignore
├── package.json
├── package-lock.json 
├── README.md
└── webpack.config.js 
```
***

#### 버전 정보

- react : 18.2.0
- redux : 8.0.2
- redux-toolkit : 1.8.3
- react-router : 6.3.0
- axios : 0.27.2
- bootstrap : 5.2.0
- react-bootstrap : 2.5.0
- react-i18next : 11.18.3
- react-markdown : 8.0.3
- react-router-dom : 6.3.0
- antd : 4.22.4
***

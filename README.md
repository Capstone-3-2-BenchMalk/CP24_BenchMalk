# CP24_BenchMalk

2024-2 캡스톤디자인 2조

<br/>

# 1. Project Overview

- Project Name : BenchMalk 벤치말크
- Description : 롤모델을 이용한 스피치 벤치마킹 서비스

<br/>

# 2. Team Members

|                송정현                 |  안필온  |  이민섭   |
| :-----------------------------------: | :------: | :-------: |
|               Front-end               | Back-end | Front-end |
| [GitHub](https://github.com/katie424) | [GitHub] | [Github]  |

<br/>

# 3. Key Features

- **롤모델 설정**:

  - 롤모델 생성하기
  - 롤모델 둘러보기

- **말하기 비교 분석**:

  - 연습 추가하기(녹음, 파일 첨부)
  - 분석하기

- **롤모델을 활용한 피드백**:
  - 빠르기
  - 끊어읽기
  - 에너지
    <br/>

# 4. Demo

https://github.com/user-attachments/assets/23eaf800-2424-4d0e-afaa-4ad06ecdd256

<br/>

# 5. Tasks & Responsibilities

| **이름**    | **주요 역할**                    | **세부 책임**                                                                 |
|-------------|---------------------------------|------------------------------------------------------------------------------|
| **송정현** | Front-end 개발, UI 설계          | - UI 디자인 및 구현<br>- 화면 구성 및 UX 최적화<br>- 프론트엔드 기능 개발 및 성능 최적화<br>- 음성 분석 결과 구현 및 시각화 |
| **안필온** | Back-end 개발, 음성 데이터 분석  | - 서버 아키텍처 설계 및 구현<br>- 음성 데이터 수집 및 분석 알고리즘 개발<br>- 데이터베이스 설계 및 관리<br>- Front-end와의 데이터 연동 지원 |
| **이민섭** | Front-end 개발, 분석 알고리즘 설계 | - 프론트엔드 기능 개발 및 UI 구현<br>- 분석 알고리즘 설계 및 개선<br>- 분석 결과 기반 피드백 설계<br>- 다양한 데이터셋과 분석 알고리즘 통합 |

<br/>

# 6. Project Structure

```
CP24_BenchMalk
├─ .DS_Store
├─ README.md
└─ frontend
   ├─ .DS_Store
   ├─ README.md
   ├─ package-lock.json
   ├─ package.json
   ├─ public/
   └─ src
      ├─ index.js
      ├─ App.js
      ├─ App.css
      ├─ App.test.js
      ├─ index.css
      ├─ logo.svg
      ├─ reportWebVitals.js
      ├─ setupTests.js
      ├─ assets/                     # 이미지, 아이콘 등 정적 자원
      ├─ components
      │  ├─ CreateDraft
      │  │  ├─ CreateDraft.jsx       # 연습 생성 페이지
      │  │  ├─ DraftDropBox.jsx      # 파일 업로드 컴포넌트
      │  │  ├─ FilePreview.jsx       # 파일 미리보기 컴포넌트
      │  │  ├─ FileUploadButton.jsx  # 파일 업로드 버튼 컴포넌트
      │  │  └─ RecordButton.jsx      # 녹음 버튼 컴포넌트
      │  ├─ CreateProject
      │  │  └─ CreateProject.jsx     # 프로젝트 생성 컴포넌트
      │  ├─ dashboard
      │  │  ├─ Dashboard.jsx         # 대시보드 메인 페이지
      │  │  └─ TableForm.jsx         # 테이블 컴포넌트
      │  ├─ ProjectPage
      │  │  ├─ AnalysisCard.jsx      # 분석 결과 카드 컴포넌트
      │  │  ├─ AudioPlayer.jsx       # 오디오 재생 컴포넌트
      │  │  ├─ Graph.jsx             # 분석 결과 시각화
      │  │  ├─ PracticeCard.jsx      # 연습 카드 컴포넌트
      │  │  ├─ ProjectPage.jsx       # 프로젝트 상세 페이지
      │  │  ├─ projectPageApi.js     # API 호출 함수
      │  │  └─ SelectRoleModel.jsx   # 롤모델 선택 컴포넌트
      │  ├─ RoleModels
      │  │  └─ RoleModels.jsx        # 롤모델 둘러보기 페이지
      │  ├─ Home.jsx                 # 홈 페이지
      │  ├─ Login.jsx                # 로그인 페이지
      │  ├─ Sidebar.jsx              # 사이드바 컴포넌트
      │  └─ Signup.jsx               # 회원가입 페이지
      ├─ hooks
      │  └─ useProjectData.js        # 프로젝트 데이터 관리 hook
      ├─ styles
      │  ├─ AnalysisCard.css
      │  ├─ AudioPlayer.css
      │  ├─ CreateDraft.css
      │  ├─ CreateProject.css
      │  ├─ Dashboard.css
      │  ├─ Home.css
      │  ├─ Login.css
      │  ├─ ProjectPage.css
      │  ├─ Sidebar.css
      │  └─ TableForm.css
      └─ utils
         └─ formatters.js          # 데이터 포맷팅 유틸리티

```

<br/>

# 7. Development Workflow

## Branch Strategy

우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch

  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.

- {feature} Branch
  - 기능 각자의 개발 브랜치입니다.
  - 각 기능의 개발은 이 브랜치에서 이루어집니다.
    <br/>

# 8. Coding Convention

## 명명 규칙

- 상수 : 영문 대문자 + 스네이크 케이스

```
const NAME_ROLE;
```

- 변수 & 함수 : 카멜케이스

```
// state
const [isLoading, setIsLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [currentUser, setCurrentUser] = useState(null);

// 배열 - 복수형 이름 사용
const datas = [];

// 정규표현식: 'r'로 시작
const = rName = /.*/;

// 이벤트 핸들러: 'on'으로 시작
const onClick = () => {};
const onChange = () => {};

// 반환 값이 불린인 경우: 'is'로 시작
const isLoading = false;

// Fetch함수: method(get, post, put, del)로 시작
const getEnginList = () => {...}
```

<br/>

# 9. 커밋 컨벤션

## 기본 구조

```
type : subject

body
```

<br/>

## type 종류

```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```

<br/>


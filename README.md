# CP24_BenchMalk
2024-2 캡스톤디자인 2조

<br/>

# 1. Project Overview
- Project Name : BenchMalk 벤치말크
- Description : 롤모델을 이용한 스피치 벤치마킹 서비스

<br/>

# 2. Team Members
|                                                        송정현                                                        |                                                        안필온                                                        |                                                        이민섭                                                        |
|:-----------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| | |  |
|                                                       None                                                        |                                                        None                                                         |                                                        None                                                         |
|                                       [GitHub]                                        |                                       [GitHub](https://github.com/katie424)|                                                                                |

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
  - 호흡
  - 발성
<br/>

# 4. Tasks & Responsibilities
<br/>

# 5. Technology Stack
<br/>

# 6. Project Structure
```plaintext
project_root/
├── lib/
│   ├── main.dart                 # 앱의 진입점 파일
│   ├── screens/
│   │   ├── home_screen.dart       # 각 화면 파일
│   │   └── next_screen.dart
│   ├── widgets/
│   │   ├── custom_button.dart     # 재사용 가능한 위젯
│   │   └── custom_text_field.dart
│   └── models/
│       └── user.dart              # 데이터 모델 파일
├── assets/                        # 이미지, 폰트 등의 리소스 파일
│   └── image1.png                 # 예시 image1.png
├── pubspec.yaml                   # 의존성 및 설정 파일
└── README.md 
```
<br/>

# 7. Development Workflow
## Branch Strategy
우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch
    - 배포 가능한 상태의 코드를 유지합니다.
    - 모든 배포는 이 브랜치에서 이루어집니다.

- {feature} Branch
    - 기능 각자의 개발 브랜치입니다.
    - 각 기능의 개발은 이 브랜치에서 이루어집니다.
 <br/>

# 8. Coding Convention
## 명명 규칙
* 상수 : 영문 대문자 + 스네이크 케이스
```
const NAME_ROLE;
```
* 변수 & 함수 : 카멜케이스
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

## 커밋 이모지
```
== 코드 관련
📝	코드 작성
🔥	코드 제거
🔨	코드 리팩토링
💄	UI / style 변경

== 문서&파일
📰	새 파일 생성
🔥	파일 제거
📚	문서 작성

== 버그
🐛	버그 리포트
🚑	버그를 고칠 때

== 기타
🐎	성능 향상
✨	새로운 기능 구현
💡	새로운 아이디어
🚀	배포
```

<br/>

## 커밋 예시
```
== ex1
✨Feat: "회원 가입 기능 구현"

SMS, 이메일 중복확인 API 개발

== ex2
📚chore: styled-components 라이브러리 설치

UI개발을 위한 라이브러리 styled-components 설치
```

<br/>
<br/>

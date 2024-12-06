# Bigs Front-end 개발자 테스트

지원자 - 조한빈

# 실행방법

1. 레포지토리를 클론 후 터미널에서 `npm install` 하여 패키지를 설치해주세요. (사전에 Node.js 설치가 필요합니다.)
2. 환경변수를 설정해야 합니다.
   루트 폴더에 `.env` 파일을 생성하고 아래 값을 저장해주세요.

```
NEXT_PUBLIC_BASE_URL_DEV=http://localhost:3000
NEXT_PUBLIC_BASE_URL=https://bigs-front-end.vercel.app
```
`BASE_URL` 기본값은 `http://localhost:3000`으로 환경 변수가 없어도 dev 모드 실행 시 정상 작동할 것입니다. (포트는 3000이어야 합니다.)

3. `npm run dev`하면 개발환경으로 실행할 수 있습니다.
`npm run build`로 빌드 후 `npm run start`를 입력하여 프로덕션 환경으로 실행할 수 있으나 환경 변수가 달라서 기능이 작동하지 않을 것입니다.
프로덕션 테스트는 환경변수를 수정해주시거나 아래 배포 주소를 확인해주세요.

## 배포주소

https://bigs-front-end.vercel.app

# Bigs

빅스홀딩스 사전 테스트 과제 제출용 프로젝트입니다.

- 제공받은 API를 활용하여 로그인 / 글 작성, 수정이 가능합니다.

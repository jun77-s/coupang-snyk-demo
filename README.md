# coupang-snyk-demo

소프트웨어공학 6팀 팀과제3 (4번 영역: 정적 테스트 및 코드 품질·보안 검증) Snyk 시연용 예제입니다.

> ⚠️ 일부러 보안 취약점을 넣은 **교육용 코드**입니다. 실제 서비스에 사용하지 마세요.

## 심어둔 문제
| 구분 | 위치 | 내용 | 잡아낼 Snyk 기능 |
|---|---|---|---|
| 외부 라이브러리 | package.json | 오래된 lodash, jsonwebtoken, express, minimist | Snyk Open Source |
| 소스코드 | src/app.js | 하드코딩된 비밀 키 | Snyk Code |
| 소스코드 | src/app.js | MD5로 비밀번호 저장 | Snyk Code |
| 소스코드 | src/app.js | SQL 인젝션 | Snyk Code |

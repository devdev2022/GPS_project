# GPS_project

## 소개 
- kakaoMap API를 이용한 택시 예약 API
  - 사용자는 요청한 원하는 탑승일시, 출발지, 도착지 등을 입력하여 예약을 요청할 수 있다. 
  - 사용자는 자신이 예약한 예약내역을 조회할 수 있다.
  - 운전자는 요청된 예약을 수락할 수 있다.
  - 운전자는 요청된 예약을 예약날짜, 지역 등으로 검색할 수 있다.
  - 운전자는 탑승일시, 택시비, 본인과 가까운 출발지을 동적 필터링으로 자유롭게 정렬할 수 있다.

- JWT를 사용한 사용자 인증
  - 사용자는 예약요청, 예약조회시 로그인 토큰이 필요함
  - 운전자는 예약수락, 예약검색, 예약정렬시 운전자 로그인 토큰이 필요함 

## Tech Stack
- Node.js
- express
- MySQL

## Tools 
- VS Code
- Git

## ERD

<img width="944" alt="스크린샷 2023-06-12 오후 4 51 19" src="https://github.com/devdev2022/GPS_project/assets/100466989/0be3ce20-17c1-42e1-a2f9-15c2903c6369">

## API DOCUMENTATION
https://documenter.getpostman.com/view/24104497/2s93saatPR

## 기능
1. 운전자와 유저의 회원가입과 로그인
2. 유저의 예약조회
3. 유저의 예약요청
4. 운전자의 예약수락
5. 운전자의 예약검색
6. 운전자의 예약정렬

## 기능시연
### 1. 운전자와 유저의 회원가입과 로그인

#### 운전자 회원가입
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/c1c9705c-cdfd-49fa-9590-b0e778859629.mp4

#### 운전자 회원가입시 차번호 중복인 경우 
<img width="775" alt="차 번호 중복시" src="https://github.com/devdev2022/GPS_project/assets/100466989/e32660d2-f3d3-4a6c-81a0-b47a69acd33c">

<br>

#### 유저 회원가입
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/249bc003-c167-4ef7-bc1b-5689ea6795bf.mp4

<br>

#### 운전자 로그인
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/df90369e-dcb9-4095-a296-a79004d6fb61.mp4

<br>

#### 유저 로그인
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/2105aaa4-6e82-402b-8d2f-6c57ea424955.mp4

<br>

### 2. 유저의 예약조회
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/08b45527-87c8-4884-b2d6-b2a1f154b662.mp4

<br>

### 3. 유저의 예약요청
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/d3baef73-3796-4a77-bf30-62924e8968a2.mp4

<br>

### 4. 운전자의 예약수락
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/abb8abd4-0e48-4bae-9c8e-8e8d01e9c9d0.mp4

<br>

### 5. 운전자의 예약검색
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/5b878a25-229c-4bb4-a6e0-5b0c2e5e7e36.mp4

<br>

### 6. 운전자의 예약정렬

#### 동적 필터링
https://github.com/devdev2022/GPS_project/assets/100466989/b67756fe-ae5c-4705-86d9-5a71a225d747.mp4

<br>

#### 운전자 정렬 - 거리 오름차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/12649aa9-c165-4106-b694-06df50739c88.mp4

<br>

#### 운전자 정렬 - 거리 내림차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/57010a13-77e3-47fa-b0c3-43422f58d51f.mp4

<br>

#### 운전자 정렬 - 시간 오름차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/f1f2dc4d-2878-4074-a309-79da1d4a998c.mp4

<br>

#### 운전자 정렬 - 시간 내림차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/a28f099f-0682-4846-b77f-9fb771bf7f4b.mp4

<br>

#### 운전자 정렬 - 요금 오름차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/429fe046-e9b9-4853-8282-f188a5610466.mp4

<br>

#### 운전자 정렬 - 요금 내림차순
https://github.com/devdev2022/39-1st-PickEat-backend/assets/100466989/fc0f8547-c003-4d10-b7db-986a5450c6aa.mp4

<br>

#### 기간이 지난 예약 제외 
<img width="667" alt="지난 예약 제외" src="https://github.com/devdev2022/GPS_project/assets/100466989/0653327e-438f-4166-b303-6a36e960069c">

현재시간 2023-06-18 11:00 기준, 그 이전 예약상태가 '미완료'인 예약의 경우 제외

## 제작과정 
https://sparkly-boat-991.notion.site/GPS_PROJECT-69341ac9b0ec4cb983df929d3d413d7a?pvs=4

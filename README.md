# GPS_project

## 소개 
- kakaoMap API를 이용한 택시 예약 API 
- JWT를 사용한 사용자 인증

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
![운전자 회원가입](https://github.com/devdev2022/GPS_project/assets/100466989/c33dc32b-da71-426d-a928-5da52cb5af0f)

#### 운전자 회원가입시 차번호 중복인 경우 
<img width="775" alt="차 번호 중복시" src="https://github.com/devdev2022/GPS_project/assets/100466989/e32660d2-f3d3-4a6c-81a0-b47a69acd33c">

<br>

#### 유저 회원가입
![유저 회원가입](https://github.com/devdev2022/GPS_project/assets/100466989/c2c192ba-4e1c-4dd0-a8a5-385113d66b52)

<br>

#### 운전자 로그인
![운전자 로그인](https://github.com/devdev2022/GPS_project/assets/100466989/ad97b203-c427-41b8-af7a-90ba26101f00)

<br>

#### 유저 로그인
![유저 로그인](https://github.com/devdev2022/GPS_project/assets/100466989/77a11423-c251-41ec-bc7a-88bf440cd9ba)

<br>

### 2. 유저의 예약조회
![유저_예약조회_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/77f3a307-b939-455c-a60f-32a4a06a4952)

<br>

### 3. 유저의 예약요청
![유저_예약요청_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/cc96015b-14b1-4d2e-ab0d-c6d740a4a439)

<br>

### 4. 운전자의 예약수락
![운전자의_예약수락_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/270365ca-4df9-4197-b2d4-1292ec551742)

<br>

### 5. 운전자의 예약검색
![운전자의_예약_검색_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/7b7bb10f-9b6c-4f39-b692-532cf14d9cd4)

<br>

### 6. 운전자의 예약정렬

<br>

#### 동적 필터링
![동적_필터링__AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/53be2bd1-856b-42cb-9f72-0250ef16517d)

<br>

#### 운전자 정렬 - 거리 오름차순
![운전자_정렬_-_거리_오름차순_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/f7aad7ba-35fa-4a83-a52c-f4978958a741)

<br>

#### 운전자 정렬 - 거리 내림차순
![운전자_정렬_-_거리_내림차순_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/0b3e294b-6e54-4dd4-8fcc-7b99e4fc9e36)

<br>

#### 운전자 정렬 - 시간 오름차순

<br>

#### 운전자 정렬 - 시간 내림차순
![운전자_정렬_-_시간_내림차순_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/451af370-87fa-4296-863a-92c28cc643ef)

<br>

#### 운전자 정렬 - 요금 오름차순
![운전자_정렬_-_요금_내림차순_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/39f047c6-333b-4338-b4ac-f07709b530bc)

<br>

#### 운전자 정렬 - 요금 내림차순
![운전자_정렬_-_요금_오름차순_AdobeExpress](https://github.com/devdev2022/GPS_project/assets/100466989/ae84e506-85a5-4702-9ddb-951a6ea8ce03)

<br>

#### 기간이 지난 예약 제외 
<img width="667" alt="지난 예약 제외" src="https://github.com/devdev2022/GPS_project/assets/100466989/0653327e-438f-4166-b303-6a36e960069c">

현재시간 2023-06-18 11:00 기준, 그 이전 예약상태가 '미완료'인 예약의 경우 제외

## 제작과정 
https://sparkly-boat-991.notion.site/GPS_PROJECT-69341ac9b0ec4cb983df929d3d413d7a?pvs=4

## UYeong Store (Closed)

미래에 기회가 된다면 저만의 스토어를 만들어 운영하고 싶어서 스토어에 필요한 화면과 기능들을 조금씩 경험삼아 만들어 보았습니다.

## Skill

- Next.js
- React Hooks
- MongoDB
- Bootstrap

## Deploy

- [vercel](https://vercel.com)

## Excution Screen and Function

### 1. User Pages

#### Home, Detail

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689489/uyeongs-store-readme/user-home_c0dc3b.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/user-view_jfflw8.png" width="350px" height="300px">

- Home
  - home, cart, sign in 버튼 > 각 페이지로 이동
  - category, filter, search bar
  - veiw 버튼 > detail 페이지
  - cart 버튼 > cart 하나 추가

<br>

- Detail
  - 이미지 클릭시 해당 이미지 보임
  - cart 버튼 > cart 하나 추가
  - buy 버튼 > cart 페이지

<br>

#### Sign in, Register

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689486/uyeongs-store-readme/user-login_xxrhxr.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/user-register_omruxd.png" width="350px" height="300px">

- Sign in
  - login 버튼 > 로그인 성공, 실패 메세지
  - register 버튼 > register 페이지

<br>

- Register
  - register 버튼 > 각 단계별 에러 메세지, 성공 메세지
  - login 버튼 > login 페이지

<br>

#### Cart, Empty cart

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/user-cart_vnvzvr.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/user-nocart_ua7khs.png" width="350px" height="300px">

- Cart
  - quantity 버튼 > quantity +,- / price +,-
  - delete 버튼
  - address and mobile 폼
  - total price 확인
  - payment 버튼 > order 페이지
  - cart에 담긴 상품이 없으면 빈 카트 이미지 보여주기

<br>

#### Profile

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/user-profile_rms622.png" width="350px" height="300px">

- Profile
  - profile 사진 변경
  - 새로운 닉네임, 비번 설정
  - 주문목록(상품id, delivery, payment) 확인

<br>

#### Order(Delivery, Payment, Paypal)

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/user-paypal_mqbywp.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/user-order_pjmgxp.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/user-payment_ngcctl.png" width="350px" height="300px">

- Order
  - order item, price 확인
  - paypal 버튼 > paypal로 연결
  - delivery, payment 확인

<br><br><br>

### 2. Admin Pages

#### Home, Create or Edit

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/admin-home_nzjfbv.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/admin-create_rcoado.png" width="350px" height="300px">

- Home
  - check box(select, select all) > delete, delete all 버튼 > 삭제
  - edit 버튼 > edit 페이지

<br>

- Create or Edit
  - title, price, stock, dexcription, category 폼
  - 이미지 업로드, 업로드된 이미지 삭제
  - create or edit 버튼

<br>

#### Users, Categories

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/admin-users_oaxwj9.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689487/uyeongs-store-readme/admin-categories_ewdtjq.png" width="350px" height="300px">

- Users
  - user목록, user 관리(수정, 삭제)

<br>

- Category
  - category 관리(생성, 수정, 삭제)

<br>

#### Toast, Delivery

<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689489/uyeongs-store-readme/admin-toast_er9yvt.png" width="350px" height="300px">
<img src="https://res.cloudinary.com/uyeong/image/upload/v1645689488/uyeongs-store-readme/admin-deliver_zjyiwa.png" width="350px" height="300px">

- Toast
  - 제거, 수정시 해당 상품에 대한 toast msg 띄우기

<br>

- Delivery
  - 배송시 배송 버튼 체크

<br>

#### 모든 페이지는 반응형 디자인이 적용되어 있습니다.

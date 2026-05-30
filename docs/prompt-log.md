## React Vite 프로젝트 생성
현재 repository는 restaurant-recommender이고, 루트에는 docs, data, README.md가 이미 있습니다.

Day 3 구현을 시작하려고 합니다.

요구사항:
1. 기존 docs, data, README.md 파일은 절대 삭제하거나 덮어쓰지 마세요.
2. React + Vite 프로젝트는 frontend 폴더 안에 구성한다고 가정하고 작업해 주세요.
3. frontend/src 안의 기본 예제 코드를 정리해 주세요.
4. 이후 MVP 구현을 위해 아래 폴더 구조를 만들어 주세요.

frontend/src/
- components/
- data/
- repositories/
- services/

아직 복잡한 기능 구현은 하지 말고, 프로젝트 구조 정리와 기본 실행 가능한 상태까지만 만들어 주세요.
변경한 파일과 이유를 마지막에 요약해 주세요.

## 데이터 파일 연결
현재 루트 data/restaurants.sample.json 파일에 식당 샘플 데이터가 있습니다.

요구사항:
1. data/restaurants.sample.json의 데이터를 frontend/src/data/restaurants.json으로 복사해서 사용해 주세요.
2. 원본 data/restaurants.sample.json은 삭제하지 마세요.
3. 데이터 구조는 아래 필드를 기준으로 사용합니다.

- id
- name
- district
- dong
- nearStation
- address
- category
- menus: [{ name, price }]
- priceRange

4. 프론트엔드 코드에서는 frontend/src/data/restaurants.json을 import해서 사용할 수 있게 해 주세요.
5. 아직 추천 로직은 구현하지 말고, 데이터 파일 복사와 사용 준비까지만 해 주세요.

## Data Access Layer 구현
architecture.md 기준으로 Data Access Layer를 구현하려고 합니다.

요구사항:
1. frontend/src/repositories/restaurantRepository.js 파일을 만들어 주세요.
2. frontend/src/data/restaurants.json을 import해서 사용해 주세요.
3. getRestaurants() 함수를 export해 주세요.
4. getRestaurants()는 식당 데이터 배열을 반환해야 합니다.
5. 추천 로직이나 화면 로직은 이 파일에 넣지 마세요.
6. 싱글톤 패턴을 너무 복잡하게 클래스화하지 말고, 모듈 import 특성을 활용해 데이터가 한 번 로드되어 재사용되는 구조로 작성해 주세요.
7. 유지보수하기 쉽게 주석을 짧게 달아 주세요.

## Business Logic Layer 구현
architecture.md 기준으로 Business Logic Layer를 구현하려고 합니다.

현재 데이터 구조:
- id
- name
- district
- dong
- nearStation
- address
- category
- menus: [{ name, price }]
- priceRange

구현할 파일:
1. frontend/src/services/filterStrategies.js
2. frontend/src/services/recommendService.js

요구사항:
1. filterStrategies.js에는 조건별 필터 함수를 분리해 주세요.
   - matchBudget(restaurant, budget)
   - matchCategory(restaurant, category)
2. budget은 숫자 입력값입니다.
   - budget이 비어 있으면 true 처리
   - budget이 있으면 restaurant.menus 중 price가 budget 이하인 메뉴가 하나라도 있을 때 true
3. category가 비어 있으면 true 처리
   - category가 있으면 restaurant.category와 정확히 일치할 때 true
4. recommendService.js에는 recommendRestaurants(filters) 함수를 만들어 주세요.
5. recommendRestaurants는 restaurantRepository의 getRestaurants()를 사용해야 합니다.
6. 추천 결과에는 추천 이유(reasons)를 포함해 주세요.
   예:
   - "예산 안에 주문 가능한 메뉴가 있습니다."
   - "선택한 음식 종류와 일치합니다."
7. 식사 목적 purpose는 filters에 포함하되, 현재 데이터에 목적 필드가 없으므로 필터링에는 사용하지 말고 추천 조건 요약에만 사용할 수 있게 유지해 주세요.
8. 화면 코드(App.jsx)에 필터링 조건문을 직접 넣지 마세요.
9. 유지보수하기 쉽게 함수 단위로 작성해 주세요.

## Presentation Layer: 입력 화면 구현
와이어프레임의 Screen 1 입력 화면을 구현해 주세요.

구현 파일:
- frontend/src/components/Header.jsx
- frontend/src/components/SearchForm.jsx
- frontend/src/App.jsx
- frontend/src/App.css

요구사항:
1. Header에는 FoodPick 서비스명과 간단한 Home, About 메뉴를 표시해 주세요.
2. SearchForm에는 아래 입력 요소를 만들어 주세요.
   - 예산 입력 input
   - 음식 카테고리 선택 버튼
   - "식당 추천 받기 →" 버튼
   - "조건 초기화" 버튼
3. 음식 카테고리는 다음 값을 사용해 주세요.
   - 한식, 중식, 일식, 양식, 분식, 패스트푸드, 카페, 아시안, 기타
4. 선택된 버튼은 시각적으로 구분되게 해 주세요.
5. 입력값 상태는 App.jsx에서 관리하고 SearchForm에 props로 전달해 주세요.
6. 아직 결과 화면은 구현하지 말고, 추천 버튼 클릭 시 console.log로 filters 값이 제대로 찍히게 해 주세요.
7. 기존 docs, data 파일은 수정하지 마세요.

와이어프레임의 Screen 2 추천 결과 화면을 구현해 주세요.

구현 파일:
- frontend/src/components/ResultList.jsx
- frontend/src/components/RestaurantCard.jsx
- frontend/src/App.jsx
- frontend/src/App.css

요구사항:
1. App.jsx에서 추천 버튼을 누르면 recommendRestaurants(filters)를 호출해 주세요.
2. 추천 결과가 1개 이상이면 ResultList 화면을 보여 주세요.
3. ResultList 상단에는 다음을 표시해 주세요.
   - "← 조건 수정" 버튼
   - "추천 결과 (N곳)"
   - 입력 조건 요약 예: "한식 · 15,000원 이하 · 혼밥"
4. RestaurantCard에는 다음 정보를 표시해 주세요.
   - 순위
   - 식당 이름
   - 카테고리
   - priceRange
   - district, dong
   - nearStation
   - menus 목록과 가격
   - 추천 이유 reasons
5. 조건 수정 버튼을 누르면 다시 입력 화면으로 돌아가게 해 주세요.
6. 데이터에 이미지나 별점이 없으므로 이미지와 별점 기능은 구현하지 마세요.
   대신 이미지 영역이 필요하면 회색 placeholder만 표시해 주세요.
7. 추천 로직은 services 폴더의 함수를 사용하고, App.jsx에 직접 필터링 조건문을 넣지 마세요.

와이어프레임의 Screen 3 결과 없음 화면을 구현해 주세요.

구현 파일:
- frontend/src/components/EmptyState.jsx
- frontend/src/App.jsx
- frontend/src/App.css

요구사항:
1. 추천 결과가 0개이면 EmptyState 화면을 보여 주세요.
2. 상단에는 "추천 결과 (0곳)"과 입력 조건 요약을 표시해 주세요.
3. 본문에는 다음 문구를 표시해 주세요.
   - "조건에 맞는 식당이 없어요"
   - "예산을 높이거나 카테고리를 변경해 보세요."
4. 버튼은 3개를 만들어 주세요.
   - 예산 높이기
   - 카테고리 변경
   - 조건 다시 설정하기
5. 예산 높이기 버튼은 현재 budget 값에 5000을 더한 뒤 다시 추천을 실행하게 해 주세요.
6. 카테고리 변경 버튼은 category를 빈 값으로 만들고 입력 화면으로 돌아가게 해 주세요.
7. 조건 다시 설정하기 버튼은 입력 화면으로 돌아가게 해 주세요.
8. EmptyState에서도 App.jsx에 직접 추천 조건문을 넣지 말고, 기존 recommendService를 재사용해 주세요.
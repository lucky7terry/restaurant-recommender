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


## Presentation Layer: 추천 결과 화면 구현
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

## Presentation Layer: 결과 없음 화면 구현
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


## Test 과정에서 수정점 발견 !!
## 여러 카테고리를 복수 선택할 수 있게 하고, 선택된 항목을 다시 누르면 선택 해제 (토글)되도록 할 것

* 음식 카테고리 다중 선택 기능 추가

현재 음식점 추천 서비스에서 음식 카테고리는 단일 선택만 가능합니다.
다음 요구사항을 반영하여 수정해 주세요.

요구사항: 
1. 음식 카테고리를 여러 개 선택할 수 있도록 변경

   - 사용자는 한 번에 여러 음식 카테고리를 선택할 수 있어야 합니다.
   - 예시:
      ex1. 한식 + 중식
      ex2. 양식 + 일식 + 디저트

2. 토글 방식으로 동작

   - 선택되지 않은 카테고리를 클릭하면 선택 상태가 됩니다.
   - 이미 선택된 카테고리를 다시 클릭하면 선택이 해제됩니다.

3. UI 표시

   - 선택된 카테고리는 사용자가 쉽게 구분할 수 있도록 활성화 스타일을 적용합니다.
   - 선택되지 않은 카테고리는 기본 스타일을 유지합니다.

4. 상태 관리

   - 기존 단일 문자열(category) 구조를 사용 중이라면 다중 선택이 가능한 배열(categories) 구조로 변경합니다.
   - 카테고리 클릭 시, 배열에 없으면 추가, 배열에 있으면 제거

5. 추천 로직

   - 선택된 카테고리가 여러 개인 경우 해당 카테고리 중 하나 이상에 해당하는 식당을 추천 대상으로 포함합니다.
   - 선택된 카테고리가 없으면 전체 식당을 대상으로 합니다.

6. 기존 가격대 선택 기능은 그대로 유지합니다.


## "식사 목적" 검색 조건 추가
식사 목적 필터링 기능을 추가하기 위해 먼저 식당 데이터에 `purposes` 필드를 추가하려고 합니다.

수정 대상 파일:
- `frontend/src/data/restaurants.json`

요구사항:
1. 각 식당 객체에 아래 필드를 추가해 주세요.
   ```json
   "purposes": ["혼밥", "직장점심"]
   ```

2. 사용할 식사 목적 값은 아래 4개로 제한합니다.
   - 혼밥
   - 데이트
   - 친구모임
   - 직장점심

3. 목적 배정 기준:
   식당 정보에 맞게 자연스럽게 배정해 주세요.
   예시 기준은 다음과 같습니다.
   - 빠르게 먹을 수 있고, 가성비 좋은 식당: 혼밥, 직장점심
   - 양식, 카페, 디저트: 데이트
   - 여러 명이 방문하기 좋아 보이는 식당: 친구모임

주의사항:
- 기존 데이터 구조를 바꾸지 마세요.
- 기존 필드 이름을 변경하지 마세요.
- `id`, `name`, `district`, `dong`, `nearStation`, `address`, `category`, `menus`, `priceRange` 필드는 그대로 유지하세요.
- 모든 식당에 `purposes` 필드를 추가하세요.
- `purposes`는 빈 배열이면 안 됩니다.
- 코드 파일은 수정하지 말고 `restaurants.json`만 수정하세요.


## 식사 목적 필터 추가 및 전체 적용 패턴 변경 : 전략 -> Specification

이번 작업의 목표는 기존 식당 추천 서비스에 **식사 목적(Purpose) 필터를 추가**하고, 동시에 현재의 검색 조건 처리 구조를 **Specification Pattern(명세 패턴)** 기반으로 리팩토링하는 것입니다.

현재 검색 조건은 음식 카테고리와 예산을 기준으로 동작하고 있으며, 앞으로 식사 목적, 평점 등의 조건이 추가될 수 있으므로 조건별 로직을 독립적으로 분리할 수 있는 구조로 개선해 주세요.

---

수정 대상 파일:
   - `frontend/src/components/SearchForm.jsx`
   - `frontend/src/App.jsx`
필요 시 검색 조건 처리를 위한 별도 파일 또는 폴더를 추가해도 됩니다.


요구사항:
1. 기존 예산 입력 영역과 음식 카테고리 선택 영역 아래에 식사 목적 선택 영역을 추가해 주세요.

```text
DINING PURPOSE (식사 목적)
```

2. 버튼 목록:
   - 혼밥
   - 데이트
   - 친구모임
   - 직장점심

3. 동작 요구사항:
   - 단일 선택
   - 선택된 버튼은 시각적으로 활성화 상태 표시
   - 선택된 버튼을 다시 클릭하면 선택 해제
   - 기존 예산 입력 기능 유지
   - 기존 카테고리 다중 선택 기능 유지
   - 추천 버튼 및 초기화 버튼 기능 유지

추가 props 예시:
```js
purpose
onPurposeChange
```

3. 식사 목적 상태를 추가해 주세요.
예시:
```js
const [purpose, setPurpose] = useState('')
```

4. 초기화 버튼 클릭 시 목적도 함께 초기화되도록 해 주세요.
예시:
```js
setPurpose('')
```

5. 현재 검색 조건을 단순한 if문 체인으로 처리하지 말고 Specification Pattern 구조로 변경해 주세요.

각 검색 조건은 독립적인 명세(Specification) 객체 또는 함수로 분리해 주세요.

예시:
```js
BudgetSpecification
CategorySpecification
PurposeSpecification
```

각 명세는 다음과 같은 역할을 가집니다.

```js
specification.isSatisfiedBy(restaurant)
```

또는

```js
specification(restaurant)
```

형태로 구현 가능합니다.


6. 사용자가 선택한 조건만 동적으로 조합하도록 구현해 주세요.

예시:

```js
[
  BudgetSpecification,
  CategorySpecification,
  PurposeSpecification,
]
```

선택된 명세만 활성화하여 최종 필터를 수행합니다.

예시:
```js
restaurants.filter(
  restaurant =>
    activeSpecifications.every(
      spec => spec.isSatisfiedBy(restaurant)
    )
)
```


주의사항:
   * 데이터 파일 구조는 가능하면 변경하지 마세요.
   * 기존 UI 스타일은 유지해 주세요.
   * 기존 카테고리 선택 기능이 깨지면 안 됩니다.
   * 기존 예산 필터 기능이 깨지면 안 됩니다.
   * 식사 목적 추가와 함께 검색 로직을 Specification Pattern 기반으로 리팩토링해 주세요.
   * 단순 if문 추가 방식은 사용하지 말아 주세요.

## 식당 데이터에 역 거리 정보 추가

1. 작업 지시: 식당 데이터에 역 거리 필드 추가

현재 저장소의 식당 추천 서비스에서 각 식당 데이터에 가까운 역으로부터의 거리 정보를 추가해줘.

2. 현재 구조 확인

- 실제 앱에서 사용하는 데이터 파일은 `frontend/src/data/restaurants.json`이다.
- `frontend/src/repositories/restaurantRepository.js`에서 `../data/restaurants.json`을 import해서 사용하고 있다.
- 루트의 `data/restaurants.sample.json`도 샘플 데이터로 존재하므로, 데이터 스키마 일관성을 위해 함께 수정한다.
- 기존 추천 로직은 예산, 카테고리, 목적 중심으로 동작하므로 이번 작업에서는 거리 기반 필터링이나 정렬은 추가하지 않는다.

3.  수정 요구사항

4. 식당 데이터에 거리 필드 추가

`frontend/src/data/restaurants.json`의 모든 식당 객체에 `distanceFromStation` 필드를 추가해줘.

- 필드명: `distanceFromStation`
- 타입: number
- 단위: 미터(m)
- 값에는 `"m"` 같은 문자열을 붙이지 말 것
- 값 범위: 0 이상 500 이하의 정수
- `nearStation` 바로 다음 줄에 추가하는 것을 권장
- 기존 필드명과 기존 값은 절대 변경하지 말 것

## 가까운 역 선택 필터 추가
1. 작업 지시: 가까운 역 선택 필터 추가

2. 작업 목표

식당 추천 조건에 **가까운 역 선택 필터**를 추가한다.

사용자가 역을 하나 이상 선택하면, 해당 역이 `nearStation` 값으로 들어있는 식당만 추천 결과에 나오도록 한다.

예를 들어 사용자가 `마포구청`을 선택하면 아래 조건을 만족하는 식당만 추천된다.

```json
"nearStation": "마포구청"
```

역은 복수 선택이 가능해야 한다.

이번 작업은 **역 선택 필터 기능 추가**가 목적이다.

3. 현재 구조

현재 앱은 아래 조건을 기준으로 식당을 추천한다.

```text
- 예산 budget
- 음식 종류 categories
- 식사 목적 purpose
```

현재 `App.jsx`에서는 `budget`, `categories`, `purpose` 상태를 관리하고 있고, `handleSubmit`에서 이 값을 `recommendRestaurants`로 전달한다.

현재 `frontend/src/specifications/index.js`에서는 아래 Specification들을 조합해서 필터링한다.

```text
- BudgetSpecification
- CategorySpecification
- PurposeSpecification
```

이번 작업에서는 기존 구조를 유지하면서 `StationSpecification`을 추가한다.

4. 수정 대상 파일

아래 파일들을 수정하거나 추가한다.

```text
frontend/src/App.jsx
frontend/src/components/SearchForm.jsx
frontend/src/specifications/index.js
frontend/src/specifications/StationSpecification.js
```

필요한 경우 CSS 파일도 최소한으로 수정한다.

```text
frontend/src/App.css
```

5.  세부 요구사항

5-1. App.jsx에 역 선택 상태 추가

`App.jsx`에 선택된 역 목록을 저장하는 상태를 추가한다.

```jsx
const [stations, setStations] = useState([])
```

역은 복수 선택이 가능해야 하므로 배열로 관리한다.

카테고리 선택과 비슷하게 역 선택 토글 함수를 추가한다.

예시:

```jsx
const handleStationToggle = (selectedStation) => {
  setStations((currentStations) =>
    currentStations.includes(selectedStation)
      ? currentStations.filter((station) => station !== selectedStation)
      : [...currentStations, selectedStation],
  )
}
```

`handleSubmit`에서 추천 조건에 `stations`를 함께 전달한다.

```jsx
runRecommendation({
  budget: budget === '' ? '' : Number(budget),
  categories,
  purpose,
  stations,
})
```

초기화 함수에서도 `stations`를 빈 배열로 초기화한다.

```jsx
setStations([])
```

`SearchForm`에도 아래 props를 전달한다.

```jsx
stations={stations}
onStationToggle={handleStationToggle}
```

5-2. SearchForm.jsx에 역 선택 UI 추가

`SearchForm.jsx`에 가까운 역 선택 영역을 추가한다.

역 목록은 현재 데이터에 있는 역을 기준으로 작성한다.

```jsx
const STATION_OPTIONS = [
  '홍대입구',
  '공덕',
  '합정',
  '상수',
  '마포',
  '망원',
  '디지털미디어시티',
  '대흥',
  '마포구청',
]
```

`SearchForm` props에 아래 값을 추가한다.

```jsx
stations,
onStationToggle,
```

음식 종류 선택 UI처럼 버튼 방식으로 구현한다.

화면 문구는 아래처럼 작성한다.

```text
NEAR STATION (가까운 역)
```

각 역 버튼은 선택되었을 때 기존 `category-button is-selected` 스타일을 재사용한다.

예시 구조:

```jsx
<div className="field-group">
  <p className="field-label">
    NEAR STATION <span>(가까운 역)</span>
  </p>
  <div className="category-grid">
    {STATION_OPTIONS.map((station) => (
      <button
        key={station}
        type="button"
        className={`category-button${
          stations.includes(station) ? ' is-selected' : ''
        }`}
        aria-pressed={stations.includes(station)}
        onClick={() => onStationToggle(station)}
      >
        {station}
      </button>
    ))}
  </div>
</div>
```

새로운 UI를 만들되 기존 디자인 흐름과 최대한 맞춘다.

5-3. StationSpecification 추가

아래 파일을 새로 만든다.

```text
frontend/src/specifications/StationSpecification.js
```

선택된 역 목록에 식당의 `nearStation`이 포함되어 있으면 통과하도록 작성한다.

```jsx
export function createStationSpecification(stations) {
  return {
    isSatisfiedBy(restaurant) {
      return stations.includes(restaurant.nearStation)
    },
    getReason() {
      return '선택한 역과 가깝습니다.'
    },
  }
}
```

추천 이유에는 아래 문구가 나오도록 한다.

```text
선택한 역과 가깝습니다.
```

5-4. specifications/index.js에 StationSpecification 연결

`frontend/src/specifications/index.js`에서 `StationSpecification`을 import한다.

```jsx
import { createStationSpecification } from './StationSpecification'
```

`specificationFactories`에 `stations` 조건을 추가한다.

```jsx
{
  key: 'stations',
  create(filters) {
    return createStationSpecification(filters.stations)
  },
}
```

기존 `budget`, `categories`, `purpose` 조건은 삭제하거나 변경하지 않는다.

5-5. ResultList 필터 요약에 역 조건 추가

추천 결과 화면의 조건 요약에 선택한 역도 표시되도록 한다.

현재 `ResultList.jsx`의 `buildFilterSummary`에서 카테고리, 목적, 예산을 요약하고 있다면 `stations`도 추가한다.

예시:

```jsx
const stations = filters.stations ?? []
const stationSummary = stations.length > 0 ? `${stations.join(', ')}역` : ''
```

요약 순서는 아래처럼 해도 된다.

```text
음식 종류 · 가까운 역 · 식사 목적 · 예산
```

예시 결과:

```text
한식 · 마포구청역 · 혼밥 · 15,000원 이하
```

복수 선택 시:

```text
한식 · 마포구청, 망원역 · 혼밥 · 15,000원 이하
```

문구가 어색하면 자연스럽게 다듬어도 된다.

6. EmptyState 동작 확인

역 조건 때문에 추천 결과가 없을 수도 있다.

기존 EmptyState가 깨지지 않도록 확인한다.

이번 작업에서 EmptyState에 새로운 버튼이나 기능을 추가할 필요는 없다.

7. 작업 범위 제한

이번 작업에서는 아래 작업을 하지 않는다.

```text
- 거리 기반 정렬 추가
- distanceFromStation 기준 필터 추가
- 지도 기능 추가
- 주소 검색 기능 추가
- 역 선택과 거리 선택을 동시에 구현
- 데이터 파일의 기존 값 변경
- 불필요한 파일 생성
```

이번 요구사항은 `nearStation` 값 기준 필터링이다.
`distanceFromStation`은 이번 필터 조건에 사용하지 않는다.

8. 검증 방법

수정 후 아래 명령어를 실행한다.

```bash
cd frontend
npm run lint
npm run build
```

확인해야 할 동작은 아래와 같다.

```text
- 역을 선택하지 않으면 기존 추천 기능이 그대로 동작한다.
- 역을 하나 선택하면 해당 nearStation 값을 가진 식당만 추천된다.
- 역을 여러 개 선택하면 선택한 역 중 하나에 해당하는 식당들이 추천된다.
- 추천 이유에 "선택한 역과 가깝습니다." 문구가 표시된다.
- 조건 초기화를 누르면 역 선택도 초기화된다.
- 기존 예산, 음식 종류, 식사 목적 필터가 깨지지 않는다.
```

9. 완료 후 보고 내용

작업이 끝나면 아래 내용만 간단히 정리해서 알려줘.

```text
- 수정한 파일 목록
- 추가한 상태값/필터명
- 새로 추가한 Specification 파일
- 역 복수 선택 동작 여부
- 추천 이유 문구 표시 여부
- npm run lint 결과
- npm run build 결과
```

## 추천 결과 정렬 기능 추가
1. 작업 지시: 추천 결과 정렬 기능 추가

2. 작업 목표

추천 결과 리스트를 사용자가 원하는 기준으로 정렬할 수 있도록 수정한다.

정렬 기준은 아래 3가지다.

```text
- 가까운 순
- 높은 가격순
- 낮은 가격순
```

이번 작업은 **추천 결과 정렬 기능 추가**가 목적이다.

3. 수정 대상 파일

아래 파일들을 중심으로 수정한다.

```text
frontend/src/App.jsx
frontend/src/components/ResultList.jsx
frontend/src/services/recommendService.js
```

필요한 경우 아래 파일도 최소한으로 수정한다.

```text
frontend/src/App.css
```

불필요한 새 파일은 만들지 않는다.

4 세부 요구사항

4-1. 정렬 기준 상태 추가

`App.jsx`에 추천 결과 정렬 기준 상태를 추가한다.

```jsx
const [sortOption, setSortOption] = useState('distance')
```

정렬 옵션 값은 아래처럼 사용한다.

```text
distance: 가까운 순
price-desc: 높은 가격순
price-asc: 낮은 가격순
```

`ResultList`에 아래 props를 전달한다.

```jsx
sortOption={sortOption}
onSortOptionChange={setSortOption}
```

추천 조건 초기화 시에도 정렬 기준은 기본값으로 되돌린다.

```jsx
setSortOption('distance')
```

4-2. 추천 결과 정렬 로직 추가

`recommendService.js` 또는 별도 헬퍼 함수에서 추천 결과를 정렬할 수 있도록 수정한다.

정렬 기준은 `filters.sortOption` 또는 별도 인자로 전달해도 된다.
다만 구조가 너무 복잡해지지 않도록 현재 코드 스타일에 맞게 간단하게 작성한다.

추천 결과는 기존 필터링을 먼저 적용한 뒤 정렬한다.

```text
1. 조건에 맞는 식당 필터링
2. 추천 이유 추가
3. 정렬 기준에 따라 정렬
```

4-3. 가까운 순 정렬

`sortOption`이 `distance`일 때는 `distanceFromStation` 값이 작은 식당이 먼저 나오도록 정렬한다.

```text
distanceFromStation 오름차순
```

예시:

```text
120m → 180m → 340m
```

혹시 `distanceFromStation` 값이 없는 데이터가 있으면 가장 뒤로 보내도록 처리한다.

4-4. 가격 정렬 기준 정의

식당에는 여러 메뉴가 있으므로, 가격 정렬 기준은 **해당 식당의 메뉴 가격 중 최저가**로 한다.

예를 들어 아래 식당이 있다면,

```json
"menus": [
  {
    "name": "A 메뉴",
    "price": 8000
  },
  {
    "name": "B 메뉴",
    "price": 12000
  }
]
```

이 식당의 정렬 기준 가격은 `8000`이다.

헬퍼 함수로 분리하면 좋다.

```jsx
function getLowestMenuPrice(restaurant) {
  return Math.min(...restaurant.menus.map((menu) => menu.price))
}
```

4-5. 높은 가격순 정렬

`sortOption`이 `price-desc`일 때는 식당의 최저 메뉴 가격이 높은 식당이 먼저 나오도록 정렬한다.

```text
최저 메뉴 가격 기준 내림차순
```

예시:

```text
18000원 → 12000원 → 8000원
```

4-6. 낮은 가격순 정렬

`sortOption`이 `price-asc`일 때는 식당의 최저 메뉴 가격이 낮은 식당이 먼저 나오도록 정렬한다.

```text
최저 메뉴 가격 기준 오름차순
```

예시:

```text
8000원 → 12000원 → 18000원
```

4-7. ResultList에 정렬 UI 추가

`ResultList.jsx` 상단 영역에 정렬 선택 UI를 추가한다.

추천 결과 제목 근처에 배치하면 된다.

문구 예시:

```text
정렬 기준
```

select를 사용해서 아래 옵션을 제공한다.

```jsx
<select value={sortOption} onChange={(event) => onSortOptionChange(event.target.value)}>
  <option value="distance">가까운 순</option>
  <option value="price-desc">높은 가격순</option>
  <option value="price-asc">낮은 가격순</option>
</select>
```

디자인은 기존 결과 화면과 어색하지 않게 최소한으로 맞춘다.

4-8. 정렬 변경 시 동작

사용자가 정렬 기준을 바꾸면 현재 추천 결과 리스트가 즉시 바뀌어야 한다.

구현 방식은 둘 중 편한 방식으로 선택한다.

```text
방법 1. sortOption 상태가 바뀔 때 recommendRestaurants를 다시 실행한다.
방법 2. ResultList에서 전달받은 restaurants를 화면 출력 전에 정렬한다.
```

권장 방식은 **방법 1**이다.

이 경우 `sortOption`도 추천 조건에 포함해서 `recommendRestaurants`에 전달한다.

예시:

```jsx
runRecommendation({
  budget: budget === '' ? '' : Number(budget),
  categories,
  purpose,
  stations,
  sortOption,
})
```

정렬 기준이 변경되면 기존 제출된 필터를 유지한 상태로 정렬만 다시 적용한다.

4-9. 추천 이유는 유지

정렬 기능을 추가해도 기존 추천 이유는 사라지면 안 된다.

예를 들어 역 필터를 선택한 경우, 기존처럼 아래 추천 이유가 표시되어야 한다.

```text
선택한 역과 가깝습니다.
```

예산, 음식 종류, 식사 목적에 대한 추천 이유도 기존처럼 유지한다.

4-10. 작업 범위 제한

이번 작업에서는 아래 작업을 하지 않는다.

```text
- 새로운 추천 알고리즘 추가
- 점수 기반 랭킹 추가
- 거리 필터 추가
- 지도 기능 추가
- 데이터 파일 값 수정
- 카드 디자인 대규모 변경
- 불필요한 라이브러리 설치
```

이번 작업은 단순히 기존 추천 결과를 사용자가 선택한 기준으로 정렬하는 기능이다.

5. 검증 방법

수정 후 아래 명령어를 실행한다.

```bash
cd frontend
npm run lint
npm run build
```

브라우저에서 아래 동작을 확인한다.

```text
- 기본 정렬은 가까운 순으로 적용된다.
- 가까운 순 선택 시 distanceFromStation 값이 작은 식당부터 나온다.
- 높은 가격순 선택 시 최저 메뉴 가격이 높은 식당부터 나온다.
- 낮은 가격순 선택 시 최저 메뉴 가격이 낮은 식당부터 나온다.
- 정렬 기준을 바꿔도 추천 이유가 유지된다.
- 기존 예산, 음식 종류, 식사 목적, 가까운 역 필터가 깨지지 않는다.
- 조건 초기화 시 정렬 기준이 가까운 순으로 돌아간다.
```

6. 완료 후 보고 내용

작업이 끝나면 아래 내용만 간단히 정리해서 알려줘.

```text
- 수정한 파일 목록
- 추가한 정렬 옵션
- 가격 정렬 기준
- 가까운 순 정렬 기준
- npm run lint 결과
- npm run build 결과
```

## 역 추천 이유에 거리 정보 표시
1. 작업 지시: 역 추천 이유 문구에 선택 역과 거리 표시

2. 작업 목표

추천 결과 카드의 추천 이유 중 아래 문구를 변경한다.

현재 문구:

```text id="kdg0mn"
선택한 역과 가깝습니다.
```

변경할 문구:

```text id="o09i5q"
{역이름}역과 {거리} m 거리입니다.
```

예시:

```text id="yzwm7e"
홍대입구역과 167 m 거리입니다.
```

이번 작업은 **추천 이유 문구 수정만** 진행한다.

3. 현재 상황

이전 작업에서 가까운 역 필터가 추가되어 있다.

식당 데이터에는 아래 필드가 존재한다.

```json id="jzz0zm"
"nearStation": "홍대입구",
"distanceFromStation": 167
```

그리고 추천 이유에는 현재 아래 문구가 표시되고 있다.

```text id="xsqpmz"
선택한 역과 가깝습니다.
```

이 문구를 식당별 데이터 기반 문구로 바꿔야 한다.

4. 수정 대상

아래 파일을 우선 확인하고 수정한다.

```text id="k7wgyd"
frontend/src/specifications/StationSpecification.js
frontend/src/services/recommendService.js
```

만약 파일명이 다르거나 구조가 조금 다르면, 프로젝트 전체에서 아래 문구를 검색해서 해당 위치를 수정한다.

```text id="o4jlx9"
선택한 역과 가깝습니다.
```

5. 세부 요구사항

5-1. StationSpecification의 추천 이유를 동적으로 변경

기존에는 `getReason()`이 고정 문자열을 반환하고 있을 가능성이 높다.

예상 기존 코드:

```jsx id="vktk65"
getReason() {
  return '선택한 역과 가깝습니다.'
}
```

이를 식당 정보를 받아서 문구를 만들 수 있도록 수정한다.

변경 예시:

```jsx id="d9shx9"
getReason(restaurant) {
  if (
    restaurant.nearStation &&
    restaurant.distanceFromStation !== undefined &&
    restaurant.distanceFromStation !== null
  ) {
    return `${restaurant.nearStation}역과 ${restaurant.distanceFromStation} m 거리입니다.`
  }

  return '선택한 역과 가깝습니다.'
}
```

`distanceFromStation` 값이 없는 경우에는 기존 문구를 fallback으로 사용한다.

5-2. recommendService.js에서 getReason 호출 방식 수정

현재 `recommendService.js`의 `buildReasons` 함수가 아래처럼 되어 있을 수 있다.

```jsx id="8xpw1w"
function buildReasons(restaurant, activeSpecifications) {
  return activeSpecifications
    .filter((specification) => specification.isSatisfiedBy(restaurant))
    .map((specification) => specification.getReason())
}
```

이 경우 `getReason()`에 식당 정보가 전달되지 않아서 역 이름과 거리를 사용할 수 없다.

아래처럼 `restaurant`를 넘기도록 수정한다.

```jsx id="sx45ef"
function buildReasons(restaurant, activeSpecifications) {
  return activeSpecifications
    .filter((specification) => specification.isSatisfiedBy(restaurant))
    .map((specification) => specification.getReason(restaurant))
}
```

기존 BudgetSpecification, CategorySpecification, PurposeSpecification의 `getReason()`은 매개변수를 사용하지 않아도 정상 동작하므로 수정하지 않아도 된다.

5-3. 화면 표시 결과

추천 이유 영역에서 아래처럼 보여야 한다.

변경 전:

```text id="l9f4ze"
• 선택한 역과 가깝습니다.
```

변경 후:

```text id="sa4d3e"
• 홍대입구역과 167 m 거리입니다.
```

식당마다 `nearStation`, `distanceFromStation` 값에 맞게 다르게 표시되어야 한다.

5-4. 작업 범위 제한

이번 작업에서는 아래 작업을 하지 않는다.

```text id="kevn9v"
- 결과 카드 레이아웃 변경
- 태그 UI 변경
- 정렬 로직 변경
- 필터 로직 변경
- 데이터 값 수정
- distanceFromStation 값 새로 생성
- 새로운 추천 조건 추가
- 불필요한 파일 생성
```

이번 작업은 추천 이유 문구를 동적으로 바꾸는 것만 한다.

6. 검증 방법

수정 후 아래 명령어를 실행한다.

```bash id="bcn03z"
cd frontend
npm run lint
npm run build
```

브라우저에서 아래 동작을 확인한다.

```text id="sp9yex"
- 가까운 역 필터를 선택한 뒤 추천 결과를 확인한다.
- 추천 이유에 "선택한 역과 가깝습니다."가 아니라 "{역이름}역과 {거리} m 거리입니다." 형식으로 표시된다.
- 식당마다 nearStation과 distanceFromStation 값에 맞게 문구가 달라진다.
- 예산, 음식 종류, 식사 목적 추천 이유는 기존처럼 정상 표시된다.
- 추천 결과 카드 UI가 깨지지 않는다.
```

7. 완료 후 보고 내용

작업이 끝나면 아래 내용만 간단히 정리해서 알려줘.

```text id="nksvag"
- 수정한 파일 목록
- 변경한 추천 이유 문구 형식
- fallback 문구
- npm run lint 결과
- npm run build 결과
```



## 전체 FoodPick UI/추천 로직 개선
현재 FoodPick 서비스의 입력 화면과 추천 로직을 아래 요구사항에 맞게 수정해 주세요.

1. 예산 입력 UX 개선
	현재 문제
	예산 입력 시 숫자가 그대로 표시됩니다.
	예시:
	⁃	15000
	⁃	250000
	수정 사항
	•	입력 중 실시간으로 천 단위 콤마를 적용해 주세요.
	•	예시:
	⁃	15000 → 15,000
	⁃	250000 → 250,000
	•	추천 요청 시에는 콤마를 제거한 숫자 값으로 처리해 주세요.
	•	기존 KRW 표시는 유지해 주세요.

2. 추천 결과 정렬 로직 수정
	현재 문제
	추천 결과가 항상 가까운 순 정렬을 시도합니다.
	수정 사항
	•	가까운 순 정렬은 "가까운 역"이 선택된 경우에만 적용해 주세요.
	•	역이 선택되지 않은 경우:
	⁃	거리 기반 정렬을 수행하지 말 것
	⁃	기존 추천 점수 또는 기본 정렬 기준을 사용할 것
	•	거리 계산을 위해 역 정보가 필요한 경우, 역 미선택 상태에서는 거리 관련 로직을 실행하지 말 것

3. 음식 카테고리 구조 단순화

	3.1 카페 + 디저트 통합
	수정 사항
		기존
	⁃	카페
	⁃	디저트
		를
	⁃	카페/디저트
		하나로 통합해 주세요.
	데이터 수정
	식당 데이터 파일의 category 값도 함께 수정해 주세요.
		기존
		{
 			 "category": "카페"
		}	
		{
  			"category": "디저트"
		}
		수정 후
		{
  			"category": "카페/디저트"
		}

	3.2 아시안 카테고리 계층형 선택 UI 추가
	상위 카테고리
	⁃	🌏 아시안
	세부 카테고리
		아시안 버튼 클릭 시 토글 영역을 펼쳐 주세요.
		체크박스 형태:
	⁃	🇻🇳 베트남
	⁃	🇹🇭 태국
	⁃	🇮🇳 인도
	⁃	🇮🇩 인도네시아
	동작 규칙
	아시안만 선택
	⁃	베트남
	⁃	태국
	⁃	인도
	⁃	인도네시아
	전체를 포함하여 검색
	세부 국가 선택
	선택된 국가만 검색
	예시
	⁃	아시안만 선택→ 4개 국가 전체
	⁃	아시안 + 베트남→ 베트남만
	⁃	아시안 + 베트남 + 태국→ 베트남 + 태국

	3.3 기타 카테고리 계층형 선택 UI 추가
	상위 카테고리
	⁃	🌍 기타
	세부 카테고리
	기타 버튼 클릭 시 토글 영역 표시
	체크박스 형태:
	⁃	🇫🇷 프랑스
	⁃	🇲🇽 멕시칸
	⁃	🇪🇸 스페인
	⁃	🌱 비건
	동작 규칙
	기타만 선택
		전체 포함
	세부 선택
		선택된 항목만 검색
		예시
	⁃	기타만 선택→ 전체 포함
	⁃	기타 + 프랑스→ 프랑스만
	⁃	기타 + 프랑스 + 스페인→ 프랑스 + 스페인

4. 국기 아이콘 추가
시각적 이해를 돕기 위해 국가 카테고리 앞에 국기를 표시해 주세요.
아시안
	•	🇻🇳 베트남
	•	🇹🇭 태국
	•	🇮🇳 인도
	•	🇮🇩 인도네시아
기타
	•	🇫🇷 프랑스
	•	🇲🇽 멕시칸
	•	🇪🇸 스페인
비건
	•	🌱 비건


5. 선택 개수 표시
아시안 또는 기타의 세부 항목을 선택한 경우 선택 개수를 표시해 주세요.
예시
	•	🌏 아시안 (2)
	•	🌍 기타 (3)
선택 개수는 세부 체크박스 선택 수를 의미합니다.
세부 선택이 없으면 개수를 표시하지 않습니다.
예시
	•	🌏 아시안
	•	🌍 기타

6. 기존 기능 유지
	•	복수 카테고리 선택 기능 유지
	•	선택 해제 기능 유지
	•	추천 기능 정상 동작 유지
	•	조건 초기화 기능 유지
	•	기존 UI 스타일은 최대한 유지하면서 개선할 것
작업 완료 후 변경된 상태 관리 구조(filters state)와 추천 로직 변경 사항도 함께 설명해 주세요.

## 가격대 표시 로직 개선

현재 `RestaurantCard.jsx`에서 식당의 `priceRange` 필드를 그대로 표시하고 있습니다.
그런데 일부 데이터에서 `priceRange` 값이 실제 메뉴 가격과 일치하지 않는 문제가 있습니다.

수정 목표:
- 화면에 표시되는 가격대는 `restaurant.priceRange`를 그대로 쓰지 말고,
  `restaurant.menus`의 실제 메뉴 가격을 기준으로 계산해서 표시해 주세요.
- 메뉴 가격 중 최저가와 최고가를 구해서 `5,000원 ~ 11,000원` 형식으로 표시해 주세요.
- 최저가와 최고가가 같으면 `9,000원`처럼 하나만 표시해 주세요.
- 기존 추천 로직은 수정하지 마세요.
- 데이터 JSON은 이번 작업에서 수정하지 않아도 됩니다.

수정 대상:
- `frontend/src/components/RestaurantCard.jsx`

주의사항:
- 기존 메뉴 목록 표시 기능은 유지해 주세요.
- 기존 카드 레이아웃은 크게 바꾸지 마세요.
- `npm run lint`
- `npm run build`
결과를 확인해 주세요.

## 추천 로직 단위 테스트 추가

현재 프로젝트에는 `npm run test` 스크립트가 없습니다.
요구사항 문서에 추천 로직 함수 단위 테스트가 포함되어 있으므로,
추천 로직에 대한 간단한 단위 테스트를 추가해 주세요.

작업 목표:
- Vitest를 devDependencies에 추가
- `package.json`에 `"test": "vitest run"` 스크립트 추가
- `frontend/src/services/recommendService.test.js` 파일 추가
- `recommendRestaurants` 함수의 핵심 동작을 테스트

테스트 케이스:
1. 예산을 입력하면 해당 예산 이하 메뉴가 하나 이상 있는 식당만 반환된다.
2. 카테고리를 선택하면 선택한 카테고리에 해당하는 식당만 반환된다.
3. 식사 목적을 선택하면 해당 purposes 값을 포함한 식당만 반환된다.
4. 가까운 역을 선택하면 해당 nearStation 식당만 반환된다.
5. 낮은 가격순 정렬 시 최저 메뉴 가격 기준 오름차순으로 정렬된다.
6. 가까운 역을 선택하고 distance 정렬 시 distanceFromStation 오름차순으로 정렬된다.

주의사항:
- UI 컴포넌트 테스트는 하지 않아도 됩니다.
- 추천 로직 함수 단위 테스트만 추가해 주세요.
- 기존 추천 로직은 테스트가 깨지는 경우에만 최소 수정해 주세요.
- `npm run lint`
- `npm run build`
- `npm run test`
결과를 확인해 주세요.

## 최종 MVP 기준 설계 문서 정합성 수정

현재 구현된 FoodPick MVP 기준으로 `docs/design.md`와 `docs/requirements.md` 내용을 최신화해 주세요.

현재 실제 구현 기준:
- 예산 입력
- 음식 카테고리 복수 선택
- 아시안/기타 세부 카테고리 선택
- 가까운 역 복수 선택
- 식사 목적 단일 선택
- 조건 기반 추천 결과 표시
- 추천 이유 표시
- 결과 없음 화면
- 추천 결과 정렬

수정 대상:
- `docs/design.md`
- `docs/requirements.md`

수정 방향:
1. 유스케이스에서 현재 구현되지 않은 `메뉴명 입력` 표현은 제거하거나 `메뉴 가격 기준 추천`으로 수정해 주세요.
2. `지역`이라는 표현은 현재 구현 기준에 맞게 `가까운 역`으로 수정해 주세요.
3. 데이터 구조 예시에 `distanceFromStation`, `purposes` 필드를 추가해 주세요.
4. 기능 요구사항에 가까운 역 필터, 식사 목적 필터, 정렬 기능을 추가해 주세요.
5. 제외 기능은 기존처럼 지도 API, 로그인, 크롤링, DB, 실제 AI 모델 제외로 유지해 주세요.
6. 문서 톤은 담백하게 작성해 주세요.

주의사항:
- 코드는 수정하지 마세요.
- 현재 구현된 기능과 문서가 일치하도록 정리하는 것이 목적입니다.
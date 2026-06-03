export const FOOD_CATEGORIES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '패스트푸드',
  '치킨',
  '피자',
  '카페/디저트',
  '아시안',
  '기타',
]

export const CATEGORY_LABELS = {
  아시안: '🌏 아시안',
  기타: '🌍 기타',
}

export const CATEGORY_DETAIL_OPTIONS = {
  아시안: [
    { label: '🇻🇳 베트남', value: '베트남' },
    { label: '🇹🇭 태국', value: '태국' },
    { label: '🇮🇳 인도', value: '인도' },
    { label: '🇮🇩 인도네시아', value: '인도네시아' },
  ],
  기타: [
    { label: '🇫🇷 프랑스', value: '프랑스' },
    { label: '🇲🇽 멕시칸', value: '멕시칸' },
    { label: '🇪🇸 스페인', value: '스페인' },
    { label: '🌱 비건', value: '비건' },
  ],
}

export const CATEGORY_GROUPS = Object.fromEntries(
  Object.entries(CATEGORY_DETAIL_OPTIONS).map(([category, options]) => [
    category,
    options.map((option) => option.value),
  ]),
)

export const DEFAULT_CATEGORY_DETAILS = Object.fromEntries(
  Object.keys(CATEGORY_DETAIL_OPTIONS).map((category) => [category, []]),
)

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  areaSqM: number;
  imageUrl: string;
  imageAlt: string;
  label?: string;
  type: "SALE" | "RENT";
}

export const featuredCollections: Property[] = [
  {
    id: "f1",
    title: "The Glass Pavilion",
    location: "Beverly Hills, California",
    price: 5250000,
    currency: "$",
    beds: 5,
    baths: 4.5,
    areaSqM: 4200,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
    imageAlt: "Luxury modern villa exterior with pool",
    label: "Exclusive",
    type: "SALE"
  },
  {
    id: "f2",
    title: "Azure Heights Penthouse",
    location: "Downtown, Vancouver",
    price: 3800000,
    currency: "$",
    beds: 3,
    baths: 3,
    areaSqM: 2100,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
    imageAlt: "Modern interior living room with view",
    label: "New Arrival",
    type: "SALE"
  }
];

export const newInMarket: Property[] = [
  {
    id: "n1",
    title: "Modern Family Home",
    location: "123 Pine St, Seattle",
    price: 850000,
    currency: "$",
    beds: 3,
    baths: 2,
    areaSqM: 120,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
    imageAlt: "Modern white house facade",
    type: "SALE"
  },
  {
    id: "n2",
    title: "Urban Loft",
    location: "456 Elm Ave, Portland",
    price: 3200,
    currency: "$",
    beds: 1,
    baths: 1,
    areaSqM: 85,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4",
    imageAlt: "Stylish apartment living room",
    type: "RENT"
  },
  {
    id: "n3",
    title: "Highland Retreat",
    location: "789 Mountain Rd, Bend",
    price: 620000,
    currency: "$",
    beds: 2,
    baths: 2,
    areaSqM: 98,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
    imageAlt: "Cabin in the woods exterior",
    type: "SALE"
  },
  {
    id: "n4",
    title: "Sea View Penthouse",
    location: "321 Ocean Dr, Miami",
    price: 4500,
    currency: "$",
    beds: 3,
    baths: 3,
    areaSqM: 180,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
    imageAlt: "Bright bedroom with large window",
    type: "RENT"
  },
  {
    id: "n5",
    title: "Central Studio",
    location: "555 Main St, Chicago",
    price: 550000,
    currency: "$",
    beds: 1,
    baths: 1,
    areaSqM: 50,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
    imageAlt: "Cozy apartment interior",
    type: "SALE"
  },
  {
    id: "n6",
    title: "Garden Villa",
    location: "999 Oak Ln, Austin",
    price: 2800,
    currency: "$",
    beds: 2,
    baths: 2,
    areaSqM: 110,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8",
    imageAlt: "Modern minimalist home exterior",
    type: "RENT"
  },
  {
    id: "n7",
    title: "Eco-Friendly Cabin",
    location: "12 Nature Path, Aspen",
    price: 450000,
    currency: "$",
    beds: 2,
    baths: 1,
    areaSqM: 70,
    imageUrl: "https://picsum.photos/seed/cabin/800/600",
    imageAlt: "Cozy eco-friendly cabin in the woods",
    type: "SALE"
  },
  {
    id: "n8",
    title: "Luxury Beachfront Condo",
    location: "88 Sandy Shores, Malibu",
    price: 15000,
    currency: "$",
    beds: 3,
    baths: 2.5,
    areaSqM: 150,
    imageUrl: "https://picsum.photos/seed/beach/800/600",
    imageAlt: "Beachfront condominium with balcony",
    type: "RENT"
  },
  {
    id: "n9",
    title: "Historic Townhouse",
    location: "200 Old Quarter, Boston",
    price: 1200000,
    currency: "$",
    beds: 4,
    baths: 3,
    areaSqM: 220,
    imageUrl: "https://picsum.photos/seed/townhouse/800/600",
    imageAlt: "Classic brick townhouse exterior",
    type: "SALE"
  },
  {
    id: "n10",
    title: "Skyline View Apartment",
    location: "500 Highrise Blvd, New York",
    price: 6500,
    currency: "$",
    beds: 2,
    baths: 2,
    areaSqM: 95,
    imageUrl: "https://picsum.photos/seed/nyc/800/600",
    imageAlt: "Modern apartment interior with skyline view",
    type: "RENT"
  },
  {
    id: "n11",
    title: "Desert Oasis Estate",
    location: "77 Cactus Way, Scottsdale",
    price: 3500000,
    currency: "$",
    beds: 5,
    baths: 6,
    areaSqM: 500,
    imageUrl: "https://picsum.photos/seed/desert/800/600",
    imageAlt: "Luxury estate with desert landscaping",
    type: "SALE"
  },
  {
    id: "n12",
    title: "Minimalist City Studio",
    location: "101 Metro Loop, San Francisco",
    price: 2500,
    currency: "$",
    beds: 1,
    baths: 1,
    areaSqM: 45,
    imageUrl: "https://picsum.photos/seed/studio/800/600",
    imageAlt: "Bright minimalist studio apartment",
    type: "RENT"
  },
  {
    id: "n13",
    title: "Suburban Family Mansion",
    location: "300 Quiet Cul-de-sac, Atlanta",
    price: 1800000,
    currency: "$",
    beds: 6,
    baths: 5,
    areaSqM: 600,
    imageUrl: "https://picsum.photos/seed/mansion/800/600",
    imageAlt: "Large suburban mansion with driveaway",
    type: "SALE"
  },
  {
    id: "n14",
    title: "Rustic Farmhouse",
    location: "44 Country Road, Nashville",
    price: 950000,
    currency: "$",
    beds: 4,
    baths: 3,
    areaSqM: 300,
    imageUrl: "https://picsum.photos/seed/farm/800/600",
    imageAlt: "Rustic farmhouse with wraparound porch",
    type: "SALE"
  },
  {
    id: "n15",
    title: "Riverside Lodge",
    location: "88 River Bank, Denver",
    price: 4200,
    currency: "$",
    beds: 3,
    baths: 2,
    areaSqM: 140,
    imageUrl: "https://picsum.photos/seed/river/800/600",
    imageAlt: "Beautiful wooden lodge by the river",
    type: "RENT"
  },
  {
    id: "n16",
    title: "Contemporary Lakeside Villa",
    location: "150 Lake Crest, Lake Tahoe",
    price: 2200000,
    currency: "$",
    beds: 4,
    baths: 4.5,
    areaSqM: 350,
    imageUrl: "https://picsum.photos/seed/lake/800/600",
    imageAlt: "Contemporary villa with a pool overlooking the lake",
    type: "SALE"
  }
];

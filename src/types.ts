export interface User {
  id: string;
  name: string;
  studentId: string;
  points: number;
  level: string;
  xp: number;
  nextLevelXp: number;
  impact: {
    cupsSaved: number;
    plasticSavedKg: number;
    co2SavedKg: number;
  };
  avatar: string;
}

export interface Promo {
  id: string;
  name: string;
  offer: string;
  distance: string;
  logo: string;
  featured?: boolean;
  category: 'Food' | 'Drinks' | 'Retail';
}

export interface Reward {
  id: string;
  name: string;
  category: string;
  points: number;
  image: string;
  vendorType: 'CAFETERIA' | 'LOCAL_BUSINESS';
  rewardType: 'FREE' | 'PROMO' | 'DISCOUNT';
}

export interface Activity {
  id: string;
  type: 'return' | 'redeem';
  title: string;
  points: number;
  date: string;
  location: string;
  description?: string;
}

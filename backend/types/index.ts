// Product - Bhil Bazaar ke liye
export interface IProduct {
  _id?: string
  name: string
  category: string
  price: number
  artisan_name: string
  artisan_verified: boolean
  description?: string
  tags?: string[]
  images?: string[]
  district: string
  click_collect: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Stay - Vagad Stays ke liye
export interface IStay {
  _id?: string
  name: string
  location: string
  district: string
  distance_from_landmark?: string
  host_name: string
  paryatan_mitra_level?: number
  rips_certified: boolean
  price_per_night: number
  rating?: number
  review_count: number
  images?: string[]
  type: string
  amenities?: string[]
  createdAt?: Date
  updatedAt?: Date
}

// Destination - Places ke liye
export interface IDestination {
  _id?: string
  name: string
  district: string
  type: string
  description?: string
  images?: string[]
  latitude?: number
  longitude?: number
  entry_fee: number
  best_time_to_visit?: string
  tags?: string[]
  highlights?: string[]
  timing?: string
  icon?: string
  createdAt?: Date
  updatedAt?: Date
}

// Itinerary - AI Generated Travel Plan
export interface IItinerary {
  _id?: string
  user_id?: string
  title: string
  days: number
  trip_type: 'cultural' | 'nature' | 'spiritual' | 'adventure' | 'mixed'
  interests?: string[]
  generated_plan?: string
  destinations?: string[]
  is_public: boolean
  createdAt?: Date
  updatedAt?: Date
}

// User - Login/Signup
export interface IUser {
  _id?: string
  name: string
  email: string
  password?: string
  phone?: string
  avatar?: string
  role: 'tourist' | 'host' | 'artisan' | 'admin'
  district?: 'banswara' | 'dungarpur'
  is_verified: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Booking - Stay Booking
export interface IBooking {
  _id?: string
  user_id: string
  stay_id: string
  stay_name: string
  host_name: string
  check_in: Date
  check_out: Date
  guests: number
  total_nights: number
  price_per_night: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  special_requests?: string
  createdAt?: Date
  updatedAt?: Date
}

// Review - Ratings
export interface IReview {
  _id?: string
  user_id: string
  user_name: string
  user_avatar?: string
  reference_id: string
  reference_type: 'stay' | 'experience' | 'product' | 'destination'
  rating: number
  comment: string
  images?: string[]
  createdAt?: Date
  updatedAt?: Date
}

// Order - Bhil Bazaar Orders
export interface IOrderItem {
  product_id: string
  product_name: string
  artisan_name: string
  quantity: number
  price: number
  subtotal: number
}

export interface IOrder {
  _id?: string
  user_id: string
  items: IOrderItem[]
  total_amount: number
  status: 'pending' | 'confirmed' | 'ready' | 'collected' | 'cancelled'
  collect_date?: Date
  collect_location?: string
  buyer_name: string
  buyer_phone: string
  buyer_email?: string
  createdAt?: Date
  updatedAt?: Date
}

// API Response format
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  count?: number
}

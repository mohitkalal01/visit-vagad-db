import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Types (Importing to ensure they are available for models)

// Models
import Product from '../models/Product';
import Stay from '../models/Stay';
import Destination from '../models/Destination';
import Experience from '../models/Experience';
import Artisan from '../models/Artisan';
import ParyatanMitra from '../models/ParyatanMitra';
import Review from '../models/Review';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

const productsData = [
  { name: 'Bamboo Wind Chimes', category: 'bamboo_crafts', price: 850, artisan_name: 'Ramesh Bhil', artisan_verified: true, district: 'Banswara', description: 'Handcrafted bamboo wind chimes with natural dyes. Each piece is unique, made using traditional Bhil weaving techniques passed down over generations.', images: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop'] },
  { name: 'Warli Village Painting', category: 'warli', price: 2400, artisan_name: 'Sunita Gamit', artisan_verified: true, district: 'Dungarpur', description: 'An intricate Warli painting depicting a harvest festival scene. Painted on handmade khadi paper using traditional rice-paste pigments.', images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'] },
  { name: 'Terracotta Tribal Vase', category: 'terracotta', price: 1200, artisan_name: 'Mohanlal Vasave', artisan_verified: false, district: 'Banswara', description: 'Hand-thrown terracotta vase with tribal motifs etched into the clay. Fired in a traditional kiln using firewood.', images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop'] },
  { name: 'Sandstone Deity Carving', category: 'stone_carvings', price: 5500, artisan_name: 'Devji Katara', artisan_verified: true, district: 'Dungarpur', description: 'Exquisite sandstone carving of Goddess Tripura Sundari. Traditional Vagad stone-carving style from Dungarpur.', images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'] },
  { name: 'Tribal Textile Wrap', category: 'textiles', price: 1800, artisan_name: 'Kamla Bhil', artisan_verified: true, district: 'Banswara', description: 'Hand-woven textile with traditional Bhil geometric patterns in natural indigo and ochre dyes.', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'] },
  { name: 'Bamboo Tribal Lamp', category: 'bamboo_crafts', price: 650, artisan_name: 'Ramdas Bhil', artisan_verified: false, district: 'Dungarpur', description: 'Elegant bamboo lamp with cut-out tribal animal motifs casting beautiful shadow patterns.', images: ['https://images.unsplash.com/photo-1587116288022-1fa7e0e35b9a?w=600&h=400&fit=crop'] },
  { name: 'Warli Forest Scene', category: 'warli', price: 3200, artisan_name: 'Geeta Padvi', artisan_verified: true, district: 'Banswara', description: 'Large-format Warli painting on canvas showing tribal forest life with animals and dancers.', images: ['https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=400&fit=crop'] },
  { name: 'Stone Nandi Bull', category: 'stone_carvings', price: 7800, artisan_name: 'Bhura Katara', artisan_verified: true, district: 'Dungarpur', description: 'Premium hand-carved Nandi bull in local Dungarpur sandstone. Museum-quality artisan work.', images: ['https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=600&h=400&fit=crop'] }
];

const staysData = [
  { name: 'Mahi River Farm Cottage', location: 'Banswara', district: 'Banswara', host_name: 'Ramdev Patel', paryatan_mitra_level: 2, rips_certified: true, price_per_night: 2500, rating: 4.8, review_count: 42, type: 'farm_stay', distance_from_landmark: '3 km from Mahi Dam', images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop'] },
  { name: 'Juna Mahal Heritage Home', location: 'Dungarpur', district: 'Dungarpur', host_name: 'Saroj Mehta', paryatan_mitra_level: 3, rips_certified: true, price_per_night: 3800, rating: 4.9, review_count: 67, type: 'heritage_home', distance_from_landmark: '500m from Juna Mahal', images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop'] },
  { name: 'Tribal Eco Hut — Anandpuri', location: 'Anandpuri, Banswara', district: 'Banswara', host_name: 'Bhanwarlal Bhil', paryatan_mitra_level: 1, rips_certified: false, price_per_night: 1400, rating: 4.5, review_count: 28, type: 'eco_hut', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop'] },
  { name: 'Tripura Sundari View Cottage', location: 'Matagi, Banswara', district: 'Banswara', host_name: 'Gita Devi', paryatan_mitra_level: 2, rips_certified: true, price_per_night: 2200, rating: 4.7, review_count: 35, type: 'farm_stay', distance_from_landmark: '1 km from Tripura Sundari Temple', images: ['https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=600&h=400&fit=crop'] },
  { name: 'Kagdi Weir Riverside Home', location: 'Banswara City', district: 'Banswara', host_name: 'Lalit Trivedi', paryatan_mitra_level: 3, rips_certified: true, price_per_night: 3200, rating: 4.9, review_count: 89, type: 'heritage_home', distance_from_landmark: 'Adjacent to Kagdi Pick-Up Weir', images: ['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop'] },
  { name: 'Chacha Kota Hilltop Hut', location: 'Chacha Kota, Dungarpur', district: 'Dungarpur', host_name: 'Bhuri Bariya', paryatan_mitra_level: 1, rips_certified: false, price_per_night: 1100, rating: 4.3, review_count: 18, type: 'eco_hut', distance_from_landmark: 'Overlooking Chacha Kota Backwaters', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop'] }
];

const destinationsData = [
    {
        name: 'Tripura Sundari Temple',
        icon: '🛕',
        district: 'Banswara',
        type: 'Spiritual',
        description: 'One of 108 Shakti Peethas, this 1008 CE temple atop a hillock offers breathtaking views of Banswara city. Best visited at sunrise — the temple bells and misty landscape create an ethereal experience.',
        highlights: ['108 Shakti Peetha', 'Panoramic hilltop views', 'Ancient 1008 CE architecture', 'Sunrise photography'],
        timing: 'Open 5 AM – 8 PM | Best at Sunrise',
        images: ['https://images.unsplash.com/photo-1609766857003-00e9f2a2dc65?w=800&h=500&fit=crop'],
    },
    {
        name: 'Mahi Island Boating',
        icon: '🚣',
        district: 'Banswara',
        type: 'Nature',
        description: 'The Mahi Dam backwaters scatter 50+ islands across the reservoir. Boat rides weave through green jungle islands — it\'s earned Banswara the title "City of One Hundred Islands".',
        highlights: ['50+ jungle islands', 'Traditional boat rides', 'Sunset views', 'Local fishing experience'],
        timing: 'Boats available 7 AM – 6 PM | Best at Sunset',
        images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop'],
    },
    {
        name: 'Mangarh Dham',
        icon: '⚔️',
        district: 'Banswara',
        type: 'Heritage',
        description: 'A hilltop memorial to 1500 Bhil tribal freedom fighters massacred in 1913. This sacred site now stands as a symbol of tribal resistance against British colonial rule, surrounded by lush forests.',
        highlights: ['Historic tribal memorial', 'Forest trekking path', 'Panoramic Mahi valley views', 'Bhil heritage museum'],
        timing: 'Open daily | Best in morning',
        images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=500&fit=crop'],
    },
    {
        name: 'Juna Mahal',
        icon: '🏛️',
        district: 'Dungarpur',
        type: 'Heritage',
        description: 'A 13th-century multi-storied palace fortress covered in intricate stone carvings, mirror-work frescoes, and elaborate wall paintings. One of Rajasthan\'s finest medieval architectural gems.',
        highlights: ['700-year-old palace', 'Mirror-work frescoes', 'Stone & glass artwork', 'Royal family history tours'],
        timing: 'Open 9 AM – 5 PM | Closed Fridays',
        images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=500&fit=crop'],
    },
    {
        name: 'Chacha Kota Backwaters',
        icon: '🌊',
        district: 'Dungarpur',
        type: 'Nature',
        description: 'Hidden in the Aravalli hills, this serene backwater zone offers stunning landscapes with emerald-green water, forested hills, and complete solitude — perfect for kayaking and meditative walks.',
        highlights: ['Kayaking & boating', 'Aravalli hill trekking', 'Birding hotspot', 'Sunset photographer\'s paradise'],
        timing: 'Best October – March',
        images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop'],
    },
    {
        name: 'Tribal Craft Workshops',
        icon: '🎨',
        district: 'Both',
        type: 'Culture',
        description: 'Learn directly from Govt. Verified Master Artisans — Warli painting on traditional khadi paper, bamboo basket weaving, terracotta pottery on a kick wheel, and tribal textile dyeing.',
        highlights: ['Warli painting class', 'Bamboo craft session', 'Terracotta pottery', 'Take your creation home'],
        timing: 'Sessions 9 AM & 3 PM | Book 24h ahead',
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop'],
    },
    {
        name: 'Kagdi Pick-Up Weir',
        icon: '🌉',
        district: 'Banswara',
        type: 'Nature',
        description: 'A beautiful stepped stone weir on the Kagdi River within Banswara city. Local families gather here at dusk for picnics, and the cascading water over sandstone steps creates a mesmerizing sight.',
        highlights: ['Picnic by the weir', 'Sunset photography', 'Local street food stalls', 'Walking distance from city'],
        timing: 'Open 24 hours | Best at Dusk',
        images: ['https://images.unsplash.com/photo-1574508258028-dc47f0e25ddb?w=800&h=500&fit=crop'],
    },
    {
        name: 'Beneshwar Dham',
        icon: '🙏',
        district: 'Both',
        type: 'Spiritual',
        description: 'The "Kashi of Tribals" — a sacred Triveni ghats where three rivers (Mahi, Som, Jakham) meet. Hosts a massive annual tribal fair (Magh Purnima) drawing 500,000+ pilgrims each year.',
        highlights: ['Sacred Triveni confluence', 'Annual tribal Mela', 'Ancient Shiva temple', 'Tribal cultural performances'],
        timing: 'Fair: Feb. | Temple: Daily 5 AM – 8 PM',
        images: ['https://images.unsplash.com/photo-1599030959804-f58a0e8f52a0?w=800&h=500&fit=crop'],
    },
];

const experiencesData = [
  { name: 'Mahi Island Kayaking', type: 'kayaking', location: 'Banswara', district: 'Banswara', price_per_person: 800, duration_hours: 3, difficulty: 'easy', guide_required: true },
  { name: 'Bamboo Craft Workshop', type: 'tribal_craft', location: 'Ghatol', district: 'Banswara', price_per_person: 500, duration_hours: 2, difficulty: 'easy', guide_required: false },
  { name: 'Juna Mahal Heritage Walk', type: 'heritage_walk', location: 'Dungarpur', district: 'Dungarpur', price_per_person: 300, duration_hours: 1.5, difficulty: 'easy', guide_required: true },
  { name: 'Chacha Kota Backwater Tour', type: 'boating', location: 'Banswara', district: 'Banswara', price_per_person: 600, duration_hours: 2, difficulty: 'easy', guide_required: true },
];

const artisansData = [
  { name: 'Kalpana Devi', craft_type: 'bamboo_crafts', village: 'Ghatol village', district: 'Banswara', govt_verified: true },
  { name: 'Rajesh Kumar', craft_type: 'terracotta', village: 'Dungarpur City', district: 'Dungarpur', govt_verified: true },
  { name: 'Meena Tribe Collective', craft_type: 'textiles', village: 'Kushalgarh', district: 'Banswara', govt_verified: true },
  { name: 'Shankar Lal', craft_type: 'stone_carvings', village: 'Dungarpur', district: 'Dungarpur', govt_verified: true },
];

const paryatanMitrasData = [
  { name: 'Suresh Bhi', district: 'Banswara', languages: ['Hindi', 'English', 'Gujarati'], certification_level: 2, price_per_day: 1500, experience_years: 5, phone: '1234567890', is_available: true },
  { name: 'Ramesh Meena', district: 'Dungarpur', languages: ['Hindi', 'English'], certification_level: 3, price_per_day: 2000, experience_years: 8, phone: '0987654321', is_available: true },
  { name: 'Anjali Devi', district: 'Banswara', languages: ['Hindi', 'Wagdi'], certification_level: 1, price_per_day: 1000, experience_years: 2, phone: '1122334455', is_available: true },
];

const reviewsData = [
  { user_id: 'guest_1', user_name: 'Priya Sharma', reference_id: 'global', reference_type: 'destination', rating: 5, comment: 'The Warli painting workshop was life-changing! Our host Ramdev was incredible. Vagad is truly a hidden gem.' },
  { user_id: 'guest_2', user_name: 'Ankit Mehta', reference_id: 'global', reference_type: 'destination', rating: 5, comment: 'Mahi Island boating at sunrise — absolutely magical. The homestay food was authentic Rajasthani tribal cuisine. Loved every bit!' },
  { user_id: 'guest_3', user_name: 'Sneha Gupta', reference_id: 'global', reference_type: 'destination', rating: 5, comment: 'The AI planner gave us the perfect 3-day itinerary. Tripura Sundari temple visit at dawn was spiritual and stunning.' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Product.deleteMany();
    await Stay.deleteMany();
    await Destination.deleteMany();
    await Experience.deleteMany();
    await Artisan.deleteMany();
    await ParyatanMitra.deleteMany();
    await Review.deleteMany();

    // Insert new data
    const products = await Product.insertMany(productsData);
    console.log(`✅ ${products.length} Products added`);

    const stays = await Stay.insertMany(staysData);
    console.log(`✅ ${stays.length} Stays added`);

    const destinations = await Destination.insertMany(destinationsData);
    console.log(`✅ ${destinations.length} Destinations added`);

    const experiences = await Experience.insertMany(experiencesData);
    console.log(`✅ ${experiences.length} Experiences added`);

    const artisans = await Artisan.insertMany(artisansData);
    console.log(`✅ ${artisans.length} Artisans added`);

    const paryatanMitras = await ParyatanMitra.insertMany(paryatanMitrasData);
    console.log(`✅ ${paryatanMitras.length} Paryatan Mitras added`);

    const reviews = await Review.insertMany(reviewsData);
    console.log(`✅ ${reviews.length} Reviews added`);

    console.log('🎉 Database ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

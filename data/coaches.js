import coachCategories from './coachCategories';

// Cities for filtering
export const cities = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Denver, CO",
  "Phoenix, AZ"
];

const coaches = [
  // RUNNING COACHES (Category ID: 1)
  {
    id: 1,
    name: "Sarah Johnson",
    slug: "sarah-johnson",
    categoryId: 1, // Running
    tagline: "Transform your running with science-backed techniques",
    location: "New York, NY",
    contact: {
      email: "sarah@fitfreaks.com",
      phone: "+1 (555) 123-4567",
      social: {
        instagram: "@sarahruncoach"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Former Olympic runner with 15+ years of coaching experience.",
    services: [
      { id: 1, name: "1-on-1 Running Assessment", price: "$75/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Central Park Group Run", 
        date: "2023-08-15", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Join our weekly group run through scenic Central Park. All paces welcome!"
      },
      { 
        id: 2, 
        name: "Marathon Training Workshop", 
        date: "2023-09-10", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive workshop covering training plans, nutrition, and race day strategy for marathon runners."
      },
      { 
        id: 3, 
        name: "Running Form Clinic", 
        date: "2023-07-22", 
        type: "past",
        image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Learn proper running mechanics and techniques to improve efficiency and prevent injuries."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Michael R.", 
        rating: 5, 
        text: "Sarah helped me improve my marathon time by over 20 minutes! Her knowledge of running mechanics is incredible." 
      },
      { 
        id: 2, 
        name: "Jennifer L.", 
        rating: 5, 
        text: "After struggling with recurring injuries, Sarah's coaching completely transformed my running technique. I'm now running pain-free for the first time in years." 
      },
      { 
        id: 3, 
        name: "David K.", 
        rating: 4, 
        text: "The group training sessions are both challenging and fun. Sarah creates a supportive community that keeps me motivated and accountable." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Running Form Analysis E-Book",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        name: "Marathon Training Plan",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        name: "Runner's Recovery Guide",
        price: "$14.99",
        image: "https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        name: "Running Nutrition Masterclass",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 5,
        name: "Speed Training Drills Video Series",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 2,
    name: "Marcus Reynolds",
    slug: "marcus-reynolds",
    categoryId: 1, // Running
    tagline: "From couch to marathon - everyone can run",
    location: "Chicago, IL",
    contact: {
      email: "marcus@fitfreaks.com",
      phone: "+1 (555) 222-3333",
      social: {
        instagram: "@marcusruns"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    description: "Passionate about helping beginners discover the joy of running.",
    services: [
      { id: 1, name: "Beginner Running Program", price: "$99/8 weeks" }
    ],
    events: [
      { 
        id: 1, 
        name: "Beginner Running Group", 
        date: "2023-08-12", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Weekly meetup designed specifically for new runners. Walk-run intervals in a supportive environment."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Karen W.", 
        rating: 5, 
        text: "At 52, I never thought I could be a runner. Marcus's couch-to-5K program changed my life. Highly recommend!" 
      }
    ],
    products: [
      {
        id: 1,
        name: "Beginner Runner's Toolkit",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  
  // SWIMMING COACHES (Category ID: 2)
  {
    id: 3,
    name: "Michael Chen",
    slug: "michael-chen",
    categoryId: 2, // Swimming
    tagline: "Master swimming technique and efficiency",
    location: "Los Angeles, CA",
    contact: {
      email: "michael@fitfreaks.com",
      phone: "+1 (555) 987-6543",
      social: {
        instagram: "@michaelswimcoach"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/42.jpg",
    description: "Former collegiate swimmer specializing in technique refinement.",
    services: [
      { id: 1, name: "Stroke Analysis Session", price: "$85/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Adult Beginner Swim Clinic", 
        date: "2023-08-18", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Learn the fundamentals of swimming in a supportive, small-group environment."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Melissa T.", 
        rating: 5, 
        text: "Michael's technique analysis completely transformed my swimming. In just three sessions, my stroke efficiency improved dramatically." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Swimming Technique Analysis Video Course",
        price: "$45.99",
        image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 4,
    name: "Sophia Williams",
    slug: "sophia-williams",
    categoryId: 2, // Swimming
    tagline: "Swim technique specialist and injury prevention",
    location: "New York, NY",
    contact: {
      email: "sophia@fitfreaks.com",
      phone: "+1 (555) 444-3333",
      social: {
        instagram: "@sophiaswims"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1530137229476-a4bd4a0e0b9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
    description: "Swimming technique specialist with a background in physical therapy.",
    services: [
      { id: 1, name: "Swim Injury Prevention Assessment", price: "$90/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Triathlon Swim Preparation", 
        date: "2023-08-20", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1530137229476-a4bd4a0e0b9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Prepare for the swim portion of your next triathlon with specific technique training."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Thomas R.", 
        rating: 5, 
        text: "Sophia's combination of swimming and physical therapy knowledge helped me recover from a shoulder injury while improving my technique." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Swimmer's Shoulder Prevention Guide",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1530137229476-a4bd4a0e0b9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  
  // CYCLING COACHES (Category ID: 3)
  {
    id: 5,
    name: "Emma Rodriguez",
    slug: "emma-rodriguez",
    categoryId: 3, // Cycling
    tagline: "Elevate your cycling performance with pro techniques",
    location: "Seattle, WA",
    contact: {
      email: "emma@fitfreaks.com",
      phone: "+1 (555) 765-4321",
      social: {
        instagram: "@emmacycles"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    description: "Former professional cyclist with expertise in road cycling.",
    services: [
      { id: 1, name: "Cycling Performance Analysis", price: "$95/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Road Cycling Group Ride", 
        date: "2023-08-19", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Weekly intermediate-advanced group ride through scenic routes around Seattle."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Andrew M.", 
        rating: 5, 
        text: "Emma's coaching took me from a recreational cyclist to competing in my first race. Her technical knowledge and training plans are excellent." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Road Cycling Training Plan",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 6,
    name: "James Taylor",
    slug: "james-taylor",
    categoryId: 3, // Cycling
    tagline: "Mountain biking and trail riding specialist",
    location: "Denver, CO",
    contact: {
      email: "james@fitfreaks.com",
      phone: "+1 (555) 789-1234",
      social: {
        instagram: "@jamesmtb"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
    description: "Professional mountain biker and certified cycling coach.",
    services: [
      { id: 1, name: "Mountain Biking Skills Clinic", price: "$110/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Trail Riding Adventure", 
        date: "2023-08-26", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Guided mountain bike excursion on intermediate trails with skills instruction."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Laura K.", 
        rating: 5, 
        text: "James is an incredible teacher who makes technical mountain biking skills approachable. I'm now riding trails I never thought possible!" 
      }
    ],
    products: [
      {
        id: 1,
        name: "Mountain Biking Essentials Guide",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  
  // YOGA COACHES (Category ID: 4)
  {
    id: 7,
    name: "Maya Patel",
    slug: "maya-patel",
    categoryId: 4, // Yoga
    tagline: "Find balance and strength through mindful yoga",
    location: "Los Angeles, CA",
    contact: {
      email: "maya@fitfreaks.com",
      phone: "+1 (555) 222-1111",
      social: {
        instagram: "@mayapateyoga"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/79.jpg",
    description: "Experienced yoga instructor specializing in vinyasa and power yoga.",
    services: [
      { id: 1, name: "Private Yoga Session", price: "$70/hour" }
    ],
    events: [
      { 
        id: 1, 
        name: "Sunrise Beach Yoga", 
        date: "2023-08-22", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Start your day with an energizing yoga practice on the beach as the sun rises."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Jessica F.", 
        rating: 5, 
        text: "Maya's classes are the perfect balance of challenging and nurturing. Her cues are clear and her adjustments have helped me refine poses I've struggled with for years." 
      }
    ],
    products: [
      {
        id: 1,
        name: "30-Day Yoga Challenge Video Series",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 8,
    name: "David Kim",
    slug: "david-kim",
    categoryId: 4, // Yoga
    tagline: "Yoga for athletes - improve performance and prevent injury",
    location: "Chicago, IL",
    contact: {
      email: "david@fitfreaks.com",
      phone: "+1 (555) 333-4444",
      social: {
        instagram: "@davidyoga"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/56.jpg",
    description: "Specializing in yoga for athletes and sports recovery.",
    services: [
      { id: 1, name: "Sport-Specific Yoga Program", price: "$95/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Yoga for Runners Workshop", 
        date: "2023-08-15", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Targeted yoga practice to address common imbalances in runners."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Chris T.", 
        rating: 5, 
        text: "As a CrossFit athlete, David's yoga sessions have dramatically improved my mobility and recovery time. His knowledge of athletic movement patterns is impressive." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Yoga for Athletes Complete Program",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  
  // GYM COACHES (Category ID: 5)
  {
    id: 9,
    name: "Alex Johnson",
    slug: "alex-johnson",
    categoryId: 5, // Gym
    tagline: "Strength training expert for all fitness levels",
    location: "Seattle, WA",
    contact: {
      email: "alex@fitfreaks.com",
      phone: "+1 (555) 777-8888",
      social: {
        instagram: "@alexlifts"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Certified strength and conditioning specialist with 10+ years experience.",
    services: [
      { id: 1, name: "1-on-1 Personal Training", price: "$85/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Deadlift Workshop", 
        date: "2023-08-20", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Master proper deadlift form and technique for safety and strength gains."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Mark L.", 
        rating: 5, 
        text: "Alex's coaching has completely transformed my approach to strength training. I've made more progress in 6 months than I did in years on my own." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Home Strength Training Guide",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 10,
    name: "Jennifer Lee",
    slug: "jennifer-lee",
    categoryId: 5, // Gym
    tagline: "Women's strength and fitness coach",
    location: "Phoenix, AZ",
    contact: {
      email: "jennifer@fitfreaks.com",
      phone: "+1 (555) 444-5555",
      social: {
        instagram: "@jenniferleefitness"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/63.jpg",
    description: "Empowering women through strength training and fitness.",
    services: [
      { id: 1, name: "Women's Strength Coaching", price: "$75/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Women's Lifting Fundamentals", 
        date: "2023-08-18", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Learn proper form and technique for essential strength training movements."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Emily J.", 
        rating: 5, 
        text: "Jennifer has completely changed my relationship with fitness. I've never felt stronger or more confident in my body." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Women's Strength Training Fundamentals",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  
  // DIETICIAN COACHES (Category ID: 6)
  {
    id: 11,
    name: "Daniel Patel",
    slug: "daniel-patel",
    categoryId: 6, // Dietician
    tagline: "Sports nutrition for optimal performance",
    location: "Chicago, IL",
    contact: {
      email: "daniel@fitfreaks.com",
      phone: "+1 (555) 888-7777",
      social: {
        instagram: "@danielnutrition"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/men/36.jpg",
    description: "Registered dietitian specializing in sports nutrition.",
    services: [
      { id: 1, name: "Sports Nutrition Assessment", price: "$120/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Race Day Nutrition Strategy Workshop", 
        date: "2023-08-22", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1551060429-e9a98a310b91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Learn how to fuel optimally before, during, and after competitions."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Ryan P.", 
        rating: 5, 
        text: "Daniel's nutrition advice completely changed my training. Better energy, faster recovery, and PR'd my last marathon!" 
      }
    ],
    products: [
      {
        id: 1,
        name: "Sports Nutrition Fundamentals Guide",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 12,
    name: "Maria Sanchez",
    slug: "maria-sanchez",
    categoryId: 6, // Dietician
    tagline: "Holistic nutrition and wellness coach",
    location: "Phoenix, AZ",
    contact: {
      email: "maria@fitfreaks.com",
      phone: "+1 (555) 333-2222",
      social: {
        instagram: "@marianutrition"
      }
    },
    heroImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    profileImage: "https://randomuser.me/api/portraits/women/15.jpg",
    description: "Holistic nutritionist focusing on whole-food approaches to wellness.",
    services: [
      { id: 1, name: "Nutrition and Lifestyle Assessment", price: "$95/session" }
    ],
    events: [
      { 
        id: 1, 
        name: "Meal Prep for Health Workshop", 
        date: "2023-08-19", 
        type: "upcoming",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Learn practical meal preparation strategies for healthy eating all week."
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Sophia T.", 
        rating: 5, 
        text: "Maria's holistic approach to nutrition helped me address digestive issues I've had for years. I have more energy and feel better than ever." 
      }
    ],
    products: [
      {
        id: 1,
        name: "Whole Food Nutrition Guide",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export default coaches;

// Helper function to get coaches by category
export const getCoachesByCategory = (categorySlug) => {
  const categoryId = coachCategories.find(cat => cat.slug === categorySlug)?.id;
  if (!categoryId) return [];
  return coaches.filter(coach => coach.categoryId === categoryId);
};

// Helper function to get a coach by slug
export const getCoachBySlug = (slug) => {
  return coaches.find(coach => coach.slug === slug);
};

// Helper function to get coaches by city
export const getCoachesByCity = (city) => {
  if (!city) return coaches;
  return coaches.filter(coach => coach.location === city);
};

// Helper function to get all cities from coaches
export const getAllCities = () => {
  const citiesSet = new Set(coaches.map(coach => coach.location));
  return Array.from(citiesSet).sort();
};

// Helper function to get paginated coaches
export const getPaginatedCoaches = (coaches, page = 1, limit = 5) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedCoaches = coaches.slice(startIndex, endIndex);
  
  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(coaches.length / limit),
    totalCoaches: coaches.length,
    hasNextPage: endIndex < coaches.length,
    hasPrevPage: startIndex > 0
  };
  
  return { coaches: paginatedCoaches, pagination };
}; 
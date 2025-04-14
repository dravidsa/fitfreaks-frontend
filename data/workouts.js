export const workoutData = [
  {
    id: 1,
    name: "Sinhagad Ride",
    type: "CYCLING",
    coachId: 1,
    duration: "2h 30m",
    distance: "40km",
    difficulty: "INTERMEDIATE",
    description: "A challenging ride to Sinhagad fort with stunning views. Includes steep climbs and technical descents.",
    route: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=800&auto=format&fit=crop&q=60",
    routeMap: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=60",
    elevation: "800m",
    terrain: "Mountain",
    tags: ["hill-climbing", "scenic", "endurance"],
    checkpoints: [
      "Khadakwasla Dam",
      "Donje Village",
      "Sinhagad Base",
      "Fort Top"
    ]
  },
  {
    id: 2,
    name: "Bopdev Ghat Run",
    type: "RUNNING",
    coachId: 1,
    duration: "1h 45m",
    distance: "15km",
    difficulty: "ADVANCED",
    description: "Trail running route through Bopdev ghat. Mix of road and trail running with challenging elevation.",
    route: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=60",
    routeMap: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60",
    elevation: "500m",
    terrain: "Trail/Road",
    tags: ["trail-running", "hills", "technical"],
    checkpoints: [
      "Ghat Start",
      "Midway Point",
      "Temple",
      "Summit"
    ]
  },
  {
    id: 3,
    name: "90 min Swim",
    type: "SWIMMING",
    coachId: 2,
    duration: "1h 30m",
    distance: "3km",
    difficulty: "INTERMEDIATE",
    description: "Structured pool session focusing on endurance and technique. Includes drills and main set.",
    route: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800&auto=format&fit=crop&q=60",
    location: "PYC Hindu Gymkhana",
    tags: ["endurance", "technique", "drills"],
    sets: [
      {
        name: "Warm Up",
        description: "400m easy freestyle, 200m kick, 200m pull"
      },
      {
        name: "Main Set",
        description: "6 x 400m freestyle with 30s rest"
      },
      {
        name: "Cool Down",
        description: "200m easy choice"
      }
    ]
  },
  {
    id: 4,
    name: "Upper Body Strength",
    type: "STRENGTH",
    coachId: 1,
    duration: "1h",
    difficulty: "BEGINNER",
    description: "Comprehensive upper body workout focusing on chest, back, shoulders, and arms.",
    route: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60",
    equipment: ["Dumbbells", "Resistance Bands", "Pull-up Bar"],
    tags: ["strength", "upper-body", "core"],
    exercises: [
      {
        name: "Push-ups",
        sets: 3,
        reps: "12-15",
        rest: "60s"
      },
      {
        name: "Dumbbell Rows",
        sets: 3,
        reps: "12 each side",
        rest: "60s"
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "12",
        rest: "60s"
      },
      {
        name: "Pull-ups/Assisted Pull-ups",
        sets: 3,
        reps: "8-10",
        rest: "90s"
      }
    ]
  },
  {
    id: 5,
    name: "Recovery Yoga Flow",
    type: "RECOVERY",
    coachId: 2,
    duration: "45m",
    difficulty: "BEGINNER",
    description: "Gentle yoga flow focusing on stretching and recovery. Perfect for rest days or post-workout.",
    route: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60",
    equipment: ["Yoga Mat", "Blocks (optional)"],
    tags: ["recovery", "flexibility", "mobility"],
    sequences: [
      {
        name: "Sun Salutation",
        duration: "10m"
      },
      {
        name: "Standing Poses",
        duration: "15m"
      },
      {
        name: "Floor Work",
        duration: "15m"
      },
      {
        name: "Savasana",
        duration: "5m"
      }
    ]
  }
];

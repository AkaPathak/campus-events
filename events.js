// Fictional campus events for a fixed fictional week (Mon Nov 2 – Sun Nov 8).
// Sunday is intentionally empty so the "no events" message is reachable.
// Every name, place, and club here is made up.

const EVENTS = [
  // Monday
  { id: "e01", name: "Sunrise Run Club", day: "Mon", date: "Mon, Nov 2", block: "Morning", time: "7:00 AM",
    location: "Lakeside Track", description: "An easy 5K loop around the lake. All paces welcome; the group waits at every turn.",
    tags: ["Sports", "Social"] },
  { id: "e02", name: "Founder Office Hours", day: "Mon", date: "Mon, Nov 2", block: "Afternoon", time: "2:00 PM",
    location: "Maple Hall, Room 210", description: "Drop in with a startup idea and get 15 minutes of feedback from student founders.",
    tags: ["Entrepreneurship"] },
  { id: "e03", name: "Open Mic Night", day: "Mon", date: "Mon, Nov 2", block: "Evening", time: "8:00 PM",
    location: "The Lantern Café", description: "Sign up at the door to play, sing, or read. Or just come listen with a hot drink.",
    tags: ["Music", "Social"] },

  // Tuesday
  { id: "e04", name: "Pitch Practice Breakfast", day: "Tue", date: "Tue, Nov 3", block: "Morning", time: "8:30 AM",
    location: "Innovation Lab", description: "Practice a 90-second pitch in a friendly room. Bagels provided.",
    tags: ["Entrepreneurship", "Social"] },
  { id: "e05", name: "Intramural Volleyball", day: "Tue", date: "Tue, Nov 3", block: "Afternoon", time: "4:00 PM",
    location: "North Gym, Court 2", description: "Pickup games, teams formed on the spot. No experience needed.",
    tags: ["Sports"] },
  { id: "e06", name: "Jazz Ensemble Rehearsal (Open)", day: "Tue", date: "Tue, Nov 3", block: "Evening", time: "7:00 PM",
    location: "Harmon Music Building", description: "Sit in on the student jazz ensemble's open rehearsal and meet the players after.",
    tags: ["Music"] },

  // Wednesday
  { id: "e07", name: "Yoga on the Quad", day: "Wed", date: "Wed, Nov 4", block: "Morning", time: "9:00 AM",
    location: "Central Quad", description: "A gentle 45-minute flow outdoors. Bring a mat or borrow one of ours.",
    tags: ["Sports"] },
  { id: "e08", name: "Club Fair Mixer", day: "Wed", date: "Wed, Nov 4", block: "Afternoon", time: "12:30 PM",
    location: "Student Union Atrium", description: "Meet a dozen student clubs over free snacks and find one that fits.",
    tags: ["Social"] },
  { id: "e09", name: "Startup Story Night", day: "Wed", date: "Wed, Nov 4", block: "Evening", time: "6:30 PM",
    location: "Maple Hall Auditorium", description: "Three alumni founders share what went wrong first, and what they did next.",
    tags: ["Entrepreneurship"] },
  { id: "e10", name: "Acoustic Sing-Along", day: "Wed", date: "Wed, Nov 4", block: "Evening", time: "9:00 PM",
    location: "Willow House Lounge", description: "Guitars, lyric sheets, and a room full of people who can't quite hit the high notes.",
    tags: ["Music", "Social"] },

  // Thursday
  { id: "e11", name: "Climbing Wall Intro", day: "Thu", date: "Thu, Nov 5", block: "Morning", time: "10:00 AM",
    location: "Rec Center Climbing Wall", description: "Staff show you the basics, harnesses and shoes included.",
    tags: ["Sports"] },
  { id: "e12", name: "Side-Project Show & Tell", day: "Thu", date: "Thu, Nov 5", block: "Afternoon", time: "3:30 PM",
    location: "Innovation Lab", description: "Students demo apps, zines, and small businesses they're building. Questions encouraged.",
    tags: ["Entrepreneurship", "Social"] },
  { id: "e13", name: "Campus Band Showcase", day: "Thu", date: "Thu, Nov 5", block: "Evening", time: "7:30 PM",
    location: "Ridgeway Amphitheater", description: "Four student bands, one stage, forty minutes each.",
    tags: ["Music", "Social"] },

  // Friday
  { id: "e14", name: "Coffee & Co-founders", day: "Fri", date: "Fri, Nov 6", block: "Morning", time: "9:30 AM",
    location: "The Lantern Café", description: "A casual meetup for students looking for someone to build with.",
    tags: ["Entrepreneurship", "Social"] },
  { id: "e15", name: "Ultimate Frisbee Pickup", day: "Fri", date: "Fri, Nov 6", block: "Afternoon", time: "3:00 PM",
    location: "South Field", description: "Friendly pickup game. Wear light and dark shirts so we can split teams.",
    tags: ["Sports", "Social"] },
  { id: "e16", name: "Friday Night Trivia", day: "Fri", date: "Fri, Nov 6", block: "Evening", time: "8:00 PM",
    location: "Student Union Game Room", description: "Teams of up to five. Prizes for first place and best team name.",
    tags: ["Social"] },
  { id: "e17", name: "Orchestra Fall Concert", day: "Fri", date: "Fri, Nov 6", block: "Evening", time: "7:00 PM",
    location: "Harmon Concert Hall", description: "The student orchestra plays its fall program. Free with student ID.",
    tags: ["Music"] },

  // Saturday
  { id: "e18", name: "Home Soccer Match", day: "Sat", date: "Sat, Nov 7", block: "Afternoon", time: "1:00 PM",
    location: "Founders Stadium", description: "Cheer on the fictional Fighting Herons against their crosstown rivals.",
    tags: ["Sports", "Social"] },
  { id: "e19", name: "Weekend Market Pop-Up", day: "Sat", date: "Sat, Nov 7", block: "Morning", time: "11:00 AM",
    location: "Central Quad", description: "Student makers sell prints, baked goods, and thrifted finds.",
    tags: ["Entrepreneurship", "Social"] },
  { id: "e20", name: "Battle of the Bands", day: "Sat", date: "Sat, Nov 7", block: "Evening", time: "8:30 PM",
    location: "Ridgeway Amphitheater", description: "Student bands compete for a recording session. The audience votes.",
    tags: ["Music", "Social"] },
];

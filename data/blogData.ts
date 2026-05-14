export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Car Rental in Cameroon",
    excerpt: "Discover everything you need to know about renting a car in Cameroon, from choosing the right vehicle to understanding local driving regulations.",
    content: "Renting a car in Cameroon offers the ultimate freedom and flexibility for travelers. Our comprehensive guide covers all aspects of the rental experience, from selecting the perfect vehicle for your journey to navigating local driving conditions and regulations. Learn about fuel options, insurance coverage, and how to make the most of your rental experience.",
    author: "Drivana Team",
    date: "2026-05-10",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: "Electric Vehicles: The Future of Urban Transportation",
    excerpt: "Explore the benefits of electric vehicles and how they're revolutionizing urban transportation. Learn about charging infrastructure and sustainability.",
    content: "Electric vehicles are transforming the way we think about transportation. With zero emissions and lower operating costs, EVs represent the future of urban mobility. Discover the latest EV models available for rental, charging infrastructure developments, and how switching to electric can contribute to a sustainable future.",
    author: "John Kwame",
    date: "2026-05-08",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    readTime: 6,
    featured: true,
  },
  {
    id: 3,
    title: "Fuel Efficiency Tips: Maximize Your Car Rental Experience",
    excerpt: "Practical advice on how to optimize fuel consumption and reduce your rental costs while maintaining vehicle performance.",
    content: "Getting the best fuel efficiency from your rental car is both economical and environmentally friendly. This article provides actionable tips including optimal driving techniques, vehicle maintenance during rental, tire pressure management, and route planning strategies that can significantly reduce fuel consumption.",
    author: "Marie Efobé",
    date: "2026-05-05",
    category: "Cost Saving",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    readTime: 5,
  },
  {
    id: 4,
    title: "Road Trip Essentials: What to Pack When Renting a Car",
    excerpt: "A complete checklist of essential items and gadgets to make your road trip safe, comfortable, and enjoyable.",
    content: "Planning a road trip? We've compiled the ultimate packing list for car rentals. From safety equipment and emergency kits to comfort items and entertainment options, discover everything you need to ensure a smooth and enjoyable journey through Cameroon's diverse landscapes.",
    author: "Drivana Team",
    date: "2026-04-28",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&q=80",
    readTime: 7,
    featured: true,
  },
  {
    id: 5,
    title: "Understanding Car Insurance: A Renter's Guide",
    excerpt: "Navigate the complexities of car rental insurance with our detailed guide covering coverage options, benefits, and what to expect.",
    content: "Car rental insurance can be confusing, but understanding your options is crucial. Learn about basic liability coverage, collision damage waivers, comprehensive coverage, and optional add-ons. This guide helps you make informed decisions about insurance and understand what protection you're getting with your rental.",
    author: "Samuel Obi",
    date: "2026-04-25",
    category: "Insurance",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    readTime: 6,
  },
  {
    id: 6,
    title: "Luxury SUVs: Comfort Meets Adventure",
    excerpt: "Explore our collection of luxury SUVs perfect for those seeking comfort, style, and off-road capability.",
    content: "Luxury SUVs offer the perfect blend of comfort, style, and capability. Whether you're planning a business trip or adventure vacation, discover our premium SUV fleet featuring spacious interiors, advanced technology, and impressive performance. Learn what to look for when choosing a luxury SUV for your specific needs.",
    author: "Drivana Team",
    date: "2026-04-20",
    category: "Vehicle Reviews",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    readTime: 5,
  },
  {
    id: 7,
    title: "Seasonal Car Rental: Summer, Winter & Everything In Between",
    excerpt: "Discover how seasonal changes affect car rental selection and get expert recommendations for each season.",
    content: "Different seasons present unique challenges and opportunities for car rental. Learn how to select the right vehicle for summer vacations, manage winter driving conditions, navigate rainy seasons, and prepare for harmattan winds. Our seasonal guide ensures you're always prepared for Cameroon's diverse climate.",
    author: "Nicole Koné",
    date: "2026-04-15",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    readTime: 7,
  },
  {
    id: 8,
    title: "Business Travel: Rent the Right Car for Professional Success",
    excerpt: "Expert tips for selecting vehicles for business trips, from sedans to executive SUVs.",
    content: "Business travel requires a vehicle that balances professionalism with reliability. Discover how to choose the right rental car for corporate events, client meetings, and professional conferences. Learn about fuel-efficient sedans, executive SUVs, and premium vehicles that make the right impression.",
    author: "Drivana Team",
    date: "2026-04-10",
    category: "Business",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    readTime: 5,
  },
  {
    id: 9,
    title: "Cameroon's Best Scenic Routes: A Driver's Paradise",
    excerpt: "Explore the most breathtaking scenic drives across Cameroon, from coastal highways to mountain passes.",
    content: "Cameroon offers some of Africa's most diverse and stunning landscapes. Discover the best scenic routes including the coastal roads of Limbé, the mountain passes of the Western Highlands, and the savanna drives of the north. Our guide includes tips on the best times to travel, road conditions, and must-see stops along the way.",
    author: "Emmanuel Nkodo",
    date: "2026-04-05",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    readTime: 8,
    featured: true,
  },
];

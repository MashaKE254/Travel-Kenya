import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import heroBackground from './hero-background.jpg';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import countryCodes from './countryCodes';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import safariImage from './images/safari.jpg';
import beachImage from './images/beach.jpg';
import cultureImage from './images/culture.jpg';
import landscapeImage from './images/landscape.jpg';

const PaymentModal = lazy(() => import('./PaymentModal'));
const BlogModal = lazy(() => import('./BlogModal'));

const destinations = [
  { id: 1, name: 'Maasai Mara', price: 200 },
  { id: 2, name: 'Nairobi National Park', price: 100 },
  { id: 3, name: 'Diani Beach', price: 150 },
  { id: 4, name: 'Mount Kenya', price: 180 },
];

const activities = [
  { id: 1, name: 'Safari Game Drive', price: 100 },
  { id: 2, name: 'Cultural Village Visit', price: 50 },
  { id: 3, name: 'Hot Air Balloon Ride', price: 300 },
  { id: 4, name: 'Hiking', price: 80 },
];

const preMadePlans = [
  { id: 1, name: 'Kenyan Wildlife Adventure', destinations: ['Maasai Mara', 'Nairobi National Park'], activities: ['Safari Game Drive', 'Cultural Village Visit'], duration: '5 days', price: 1200 },
  { id: 2, name: 'Coastal Relaxation', destinations: ['Diani Beach'], activities: ['Snorkeling', 'Beach Yoga'], duration: '4 days', price: 800 },
  { id: 3, name: 'Mountain Explorer', destinations: ['Mount Kenya'], activities: ['Hiking', 'Wildlife Spotting'], duration: '6 days', price: 1500 },
];

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Safari Destinations in Kenya",
    excerpt: "Discover the best places to spot the Big Five and experience the wild beauty of Kenya's national parks.",
    content: "Kenya is renowned for its incredible wildlife and breathtaking landscapes, making it a top destination for safari enthusiasts. In this post, we'll explore the top 5 safari destinations in Kenya that offer unforgettable experiences:\n\n1. Maasai Mara National Reserve: Famous for the Great Migration, this reserve offers year-round wildlife viewing and cultural experiences with the Maasai people.\n\n2. Amboseli National Park: Known for its large elephant herds and stunning views of Mount Kilimanjaro, Amboseli is a photographer's paradise.\n\n3. Tsavo East and West National Parks: These vast parks offer diverse landscapes and excellent opportunities to spot lions, elephants, and rare species like the fringe-eared oryx.\n\n4. Samburu National Reserve: Home to unique species like the Grevy's zebra and reticulated giraffe, Samburu offers a more off-the-beaten-path safari experience.\n\n5. Lake Nakuru National Reserve: Famous for its flamingos and rhino sanctuary, this park also offers beautiful landscapes and a variety of wildlife.\n\nEach of these destinations offers a unique perspective on Kenya's incredible biodiversity and natural beauty. Whether you're a first-time safari-goer or a seasoned wildlife enthusiast, these parks are sure to leave you in awe of Kenya's natural wonders."
  },
  {
    id: 2,
    title: "A Taste of Kenya: Must-Try Traditional Dishes",
    excerpt: "Explore the rich flavors and culinary traditions of Kenya with these authentic local dishes.",
    content: "Kenyan cuisine is a delightful mix of flavors, influenced by various cultures and locally available ingredients. Here are some must-try traditional Kenyan dishes:\n\n1. Ugali: A staple food made from maize flour, often served with stews or vegetables.\n\n2. Nyama Choma: Swahili for 'roasted meat', usually goat or beef, this is a popular dish often enjoyed during social gatherings.\n\n3. Sukuma Wiki: A nutritious dish made from collard greens, often cooked with onions and spices.\n\n4. Githeri: A hearty mix of maize and beans, sometimes enhanced with potatoes or pumpkin.\n\n5. Mandazi: A sweet, fried dough similar to a doughnut, often enjoyed for breakfast or as a snack.\n\n6. Irio: A dish from central Kenya made with mashed potatoes, peas, and corn.\n\n7. Pilau: A fragrant rice dish cooked with spices and meat, showing the coastal Swahili influence.\n\n8. Mutura: A traditional Kenyan sausage made from ground meat, blood, and spices.\n\nTrying these dishes will not only satisfy your taste buds but also give you a deeper appreciation of Kenyan culture and traditions. Don't forget to pair your meal with a cup of Kenyan chai (tea) for the full experience!"
  },
  {
    id: 3,
    title: "Kenya's Hidden Beaches: Coastal Paradises",
    excerpt: "Uncover the pristine beaches along Kenya's coastline, from bustling tourist spots to secluded hideaways.",
    content: "While Kenya is famous for its safaris, its coastline boasts some of the most beautiful beaches in Africa. Here are some of Kenya's hidden coastal paradises:\n\n1. Diani Beach: Often considered one of the best beaches in Africa, Diani offers powder-white sand, crystal-clear waters, and excellent water sports opportunities.\n\n2. Watamu Beach: Known for its marine national park, Watamu is perfect for snorkeling, diving, and spotting sea turtles.\n\n3. Lamu Island: Step back in time on this car-free island with its pristine beaches, traditional Swahili architecture, and laid-back atmosphere.\n\n4. Kilifi Creek: A hidden gem offering tranquil waters, mangrove forests, and a chance to experience local coastal life.\n\n5. Chale Island: This private island near Diani offers exclusivity and seclusion, with a unique mix of tidal beaches and coral gardens.\n\n6. Manda Bay: Located in the Lamu Archipelago, this secluded beach offers pristine sands and excellent opportunities for water sports and relaxation.\n\n7. Gazi Beach: A quiet, off-the-beaten-path beach south of Diani, perfect for those seeking solitude and unspoiled natural beauty.\n\nWhether you're looking for water sports, relaxation, or cultural experiences, Kenya's coast has something for everyone. These beaches offer the perfect complement to a wildlife safari, allowing you to experience the diverse beauty of Kenya."
  },
  {
    id: 4,
    title: "Trekking Mount Kenya: A Guide for Adventure Seekers",
    excerpt: "Everything you need to know about climbing Africa's second-highest peak, from preparation to summit day.",
    content: "Mount Kenya, Africa's second-highest peak, offers a challenging and rewarding trekking experience. Here's a comprehensive guide for those looking to conquer this majestic mountain:\n\n1. Choosing Your Route:\n   - Naro Moru: The most popular and quickest route\n   - Sirimon: Scenic and less crowded\n   - Chogoria: The most beautiful but challenging route\n\n2. Best Time to Trek: January-February and July-October are the driest months.\n\n3. Altitude Considerations:\n   - Point Lenana (4,985m) is the highest trekking peak\n   - Batian (5,199m) and Nelion (5,188m) require technical climbing skills\n\n4. Preparation:\n   - Physical fitness: Regular cardio and strength training\n   - Gear: Warm, waterproof clothing, good boots, and sleeping bag\n   - Acclimatization: Spend time at altitude before the trek\n\n5. What to Expect:\n   - 3-5 days for most routes\n   - Varied landscapes: forests, moorlands, and glaciers\n   - Wildlife sightings possible in lower elevations\n\n6. Guides and Porters:\n   - Mandatory for safety and navigation\n   - Support local communities by hiring certified guides\n\n7. Summit Day:\n   - Usually starts very early (around midnight)\n   - Challenging but rewarding with spectacular sunrise views\n\n8. After the Trek:\n   - Celebrate your achievement\n   - Consider a relaxing stay at nearby lodges or hot springs\n\nTrekking Mount Kenya is a bucket-list adventure that combines physical challenge with breathtaking natural beauty. With proper preparation and respect for the mountain, it's an experience you'll never forget."
  },
  {
    id: 5,
    title: "Kenya's Cultural Heritage: A Journey Through Time",
    excerpt: "Explore the rich tapestry of Kenya's diverse cultures, from ancient traditions to modern expressions.",
    content: "Kenya's cultural heritage is as diverse as its landscapes, with over 40 ethnic groups contributing to a rich tapestry of traditions, art, and ways of life. Let's take a journey through Kenya's cultural heritage:\n\n1. The Maasai:\n   - Known for their distinctive dress and jumping dance\n   - Traditional pastoralist lifestyle\n   - Efforts to preserve culture while adapting to modern times\n\n2. The Swahili Coast:\n   - Blend of African, Arab, and Persian influences\n   - Historic towns like Lamu and Mombasa\n   - Rich architectural heritage and cuisine\n\n3. The Kikuyu:\n   - Kenya's largest ethnic group\n   - Strong agricultural traditions\n   - Important role in Kenya's independence movement\n\n4. The Samburu:\n   - Close relatives of the Maasai\n   - Known for their intricate beadwork\n   - Semi-nomadic pastoralist lifestyle\n\n5. Ancient Heritage:\n   - Gedi Ruins: Mysterious abandoned Swahili town\n   - Thimlich Ohinga: Stone-built settlement from 16th century\n   - Koobi Fora: Important paleoanthropological site\n\n6. Modern Cultural Expressions:\n   - Vibrant music scene blending traditional and contemporary styles\n   - Growing contemporary art scene in Nairobi\n   - Annual cultural festivals celebrating diversity\n\n7. Traditional Crafts:\n   - Kisii soapstone carvings\n   - Kamba wood carvings\n   - Kikoy textiles\n\n8. Cultural Museums:\n   - Nairobi National Museum\n   - Bomas of Kenya for traditional dances\n   - Kitale Museum for agricultural heritage\n\nExploring Kenya's cultural heritage offers insights into the country's history, values, and the way different communities have adapted to their environments. It's a journey that adds depth and understanding to any visit to Kenya, complementing the country's natural wonders with rich human stories and traditions."
  },
  {
    id: 6,
    title: "Sustainable Tourism in Kenya: How to Travel Responsibly",
    excerpt: "Learn how to minimize your environmental impact and support local communities while exploring Kenya.",
    content: "As tourism continues to grow in Kenya, it's crucial to consider the impact of our travels on the environment and local communities. This guide will help you travel responsibly and sustainably in Kenya:\n\n1. Choose Eco-Friendly Accommodations:\n   - Look for lodges and hotels with green certifications\n   - Support places that use renewable energy and practice water conservation\n\n2. Respect Wildlife and Natural Habitats:\n   - Observe animals from a safe distance and never feed them\n   - Stay on designated trails when hiking\n   - Choose tour operators that prioritize animal welfare\n\n3. Support Local Communities:\n   - Buy souvenirs directly from local artisans\n   - Eat at locally-owned restaurants\n   - Consider homestays or community-based tourism initiatives\n\n4. Reduce Plastic Waste:\n   - Bring a reusable water bottle and shopping bag\n   - Avoid single-use plastics whenever possible\n\n5. Conserve Water and Energy:\n   - Take shorter showers and reuse towels\n   - Turn off lights and air conditioning when leaving your room\n\n6. Learn and Respect Local Customs:\n   - Research local traditions and dress codes\n   - Ask permission before taking photos of people\n\n7. Choose Sustainable Tour Operators:\n   - Look for companies with responsible tourism policies\n   - Support operators that give back to local communities\n\n8. Offset Your Carbon Footprint:\n   - Consider donating to local conservation projects\n   - Use carbon offset programs for your flights\n\n9. Volunteer Responsibly:\n   - Choose reputable organizations for volunteer work\n   - Ensure your skills match the needs of the community\n\n10. Spread Awareness:\n    - Share your sustainable travel experiences with others\n    - Encourage friends and family to travel responsibly\n\nBy following these guidelines, you can help ensure that Kenya's natural beauty and rich cultural heritage are preserved for future generations. Sustainable tourism not only minimizes negative impacts but also maximizes the benefits for local communities and ecosystems. Remember, every small action counts towards creating a more sustainable and responsible travel industry in Kenya."
  }
];

function App() {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
    message: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    const navbar = document.querySelector('.navbar');
    const changeNavbar = () => {
      if (window.scrollY >= 80) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', changeNavbar);

    const destinationsCost = selectedDestinations.reduce((sum, id) => sum + destinations.find(d => d.id === id).price, 0);
    const activitiesCost = selectedActivities.reduce((sum, id) => sum + activities.find(a => a.id === id).price, 0);
    setTotalPrice(destinationsCost + activitiesCost);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  }, [selectedDestinations, selectedActivities]);

  const handleDestinationChange = (id) => {
    setSelectedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleActivityChange = (id) => {
    setSelectedActivities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleBooking = (planName, price) => {
    setSelectedPlan({ name: planName, price: price });
    setIsPaymentModalOpen(true);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    setContactForm({ name: '', email: '', country: '', phone: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="home" smooth={true} duration={500} onClick={(e) => { e.preventDefault(); scroll.scrollToTop(); }}>
            <span>Travel Kenya</span>
          </Link>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="home" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="discover" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Discover Kenya</Link></li>
            <li><Link to="booking" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Book Now</Link></li>
            <li><Link to="blog" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            <li><Link to="contact" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
          <div className="navbar-actions">
            <button className="search-icon" onClick={toggleSearch}><FaSearch /></button>
            <Link to="booking" smooth={true} duration={500} className="cta-button" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <Element name="home">
        <header id="home" className="hero" style={{backgroundImage: `url(${heroBackground})`}}>
          <div className="hero-content">
            <h1>Explore the Heart of Africa</h1>
            <p>Unforgettable adventures await in Kenya's breathtaking landscapes</p>
            <Link to="discover" smooth={true} duration={500} className="hero-cta-button">Start Your Journey</Link>
          </div>
        </header>
      </Element>

      <main>
        <section id="discover" className="discover-section">
          <h2>Discover Kenya</h2>
          <div className="discover-grid">
            <div className="discover-item">
              <div className="discover-item-inner">
                <div className="discover-item-front">
                  <img src={safariImage} alt="Kenyan Wildlife" />
                  <h3>Wildlife Safaris</h3>
                </div>
                <div className="discover-item-back">
                  <p>Experience the thrill of seeing Africa's Big Five in their natural habitat.</p>
                  <a href="#" className="discover-more-btn">Learn More</a>
                </div>
              </div>
            </div>
            <div className="discover-item">
              <div className="discover-item-inner">
                <div className="discover-item-front">
                  <img src={beachImage} alt="Kenyan Beaches" />
                  <h3>Pristine Beaches</h3>
                </div>
                <div className="discover-item-back">
                  <p>Relax on the white sands of Kenya's beautiful Indian Ocean coastline.</p>
                  <a href="#" className="discover-more-btn">Learn More</a>
                </div>
              </div>
            </div>
            <div className="discover-item">
              <div className="discover-item-inner">
                <div className="discover-item-front">
                  <img src={cultureImage} alt="Kenyan Culture" />
                  <h3>Rich Culture</h3>
                </div>
                <div className="discover-item-back">
                  <p>Immerse yourself in the vibrant traditions of Kenya's diverse ethnic groups.</p>
                  <a href="#" className="discover-more-btn">Learn More</a>
                </div>
              </div>
            </div>
            <div className="discover-item">
              <div className="discover-item-inner">
                <div className="discover-item-front">
                  <img src={landscapeImage} alt="Kenyan Landscapes" />
                  <h3>Breathtaking Landscapes</h3>
                </div>
                <div className="discover-item-back">
                  <p>From mountains to savannas, explore Kenya's diverse natural beauty.</p>
                  <a href="#" className="discover-more-btn">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="booking-section">
          <h2>Book Your Kenyan Adventure</h2>
          <div className="booking-container">
            <div className="custom-plan">
              <h3>Create Your Custom Plan</h3>
              <div className="selection-area">
                <div className="destinations">
                  <h4>Select Destinations:</h4>
                  {destinations.map(dest => (
                    <label key={dest.id}>
                      <input 
                        type="checkbox" 
                        checked={selectedDestinations.includes(dest.id)}
                        onChange={() => handleDestinationChange(dest.id)}
                      />
                      <span className="checkmark"></span>
                      <span>{dest.name} (${dest.price})</span>
                    </label>
                  ))}
                </div>
                <div className="activities">
                  <h4>Select Activities:</h4>
                  {activities.map(act => (
                    <label key={act.id}>
                      <input 
                        type="checkbox" 
                        checked={selectedActivities.includes(act.id)}
                        onChange={() => handleActivityChange(act.id)}
                      />
                      <span className="checkmark"></span>
                      <span>{act.name} (${act.price})</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="total-price">
                <h4>Total Price: ${totalPrice}</h4>
                <button className="book-button" onClick={() => handleBooking('Custom Plan', totalPrice)}>Book Custom Plan</button>
              </div>
            </div>
            <div className="pre-made-plans">
              <h3>Pre-made Plans</h3>
              {preMadePlans.map(plan => (
                <div key={plan.id} className="plan-card">
                  <h4>{plan.name}</h4>
                  <p>Destinations: {plan.destinations.join(', ')}</p>
                  <p>Activities: {plan.activities.join(', ')}</p>
                  <p>Duration: {plan.duration}</p>
                  <p>Price: ${plan.price}</p>
                  <button className="book-button" onClick={() => handleBooking(plan.name, plan.price)}>Book This Plan</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="blog-section">
          <h2>Our Blog</h2>
          <div className="blog-grid">
            {blogPosts.map(blog => (
              <div key={blog.id} className="blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <button onClick={() => handleBlogClick(blog)} className="read-more-btn">Read More</button>
              </div>
            ))}
          </div>
        </section>

        <Element name="contact">
          <section id="contact" className="contact-section">
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <select
                  id="country"
                  name="country"
                  value={contactForm.country}
                  onChange={handleContactChange}
                  required
                >
                  <option value="">Select a country</option>
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name} (+{country.dialCode})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </section>
        </Element>
      </main>

      <Suspense fallback={<div>Loading...</div>}>
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          totalPrice={selectedPlan ? selectedPlan.price : 0}
          planName={selectedPlan ? selectedPlan.name : ''}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      </Suspense>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Travel Kenya is your gateway to unforgettable adventures in the heart of Africa. We're passionate about showcasing Kenya's natural beauty and rich culture.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
              <li><Link to="discover" smooth={true} duration={500}>Discover Kenya</Link></li>
              <li><Link to="booking" smooth={true} duration={500}>Book Now</Link></li>
              <li><Link to="blog" smooth={true} duration={500}>Blog</Link></li>
              <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@travelkenya.com</p>
            <p>Phone: +254 123 456 789</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">YT</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Travel Kenya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
